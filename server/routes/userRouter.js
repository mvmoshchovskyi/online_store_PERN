const {Router} = require('express')
const router = Router()
const {check,registration,login,} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', registration)
router.post('/login',login)
router.get('/auth',authMiddleware, check)

module.exports =router
