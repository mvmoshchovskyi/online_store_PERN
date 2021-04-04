const {Brand} = require('../models/models')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.status(201).json(brand )
    }

    async geyAll(req, res) {
        const brands = await Brand.findAll()
        return res.status(200).json(brands)

    }
}

module.exports = new BrandController()
