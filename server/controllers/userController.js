const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const {Basket, User} = require('../models/models')


function generateJwt(id, email, role) {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, role, password} = req.body
        try {
            if (!password || !email) {
                return next(ApiError.badRequest("email and password must be"))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('user with this email is exists'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            const basket = await Basket.create({userId: user.id})
            const token = generateJwt(user.id, user.email, user.role)
            return res.status(200).json({token})
        } catch (e) {
          return  next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {

        //const token = req.header.authorization.split(' ')[1]
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('user not found'))
            }
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('password not walid'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.status(200).json({token})

        } catch (e) {
           return  next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const {id, email, role} = req.body
        const token = generateJwt(id, email, role)
        return res.json(token)
    }
}

module.exports = new UserController()
