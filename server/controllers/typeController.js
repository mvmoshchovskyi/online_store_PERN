const {Type} = require('../models/models')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.status(201).json(type)
    }

    async geyAll(req, res) {
        const types = await Type.findAll()
        return res.status(200).json(types)

    }
}

module.exports = new TypeController()
