const {Router} = require('express')
const {geyAll,create,geyOne} =require('../controllers/deviceController')
const router = Router()

router.get('/',geyAll)
router.get('/:id',geyOne)
router.post('/',create)

module.exports =router
