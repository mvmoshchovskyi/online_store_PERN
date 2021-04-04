const {Router} = require('express')
const {geyAll,create,} =require('../controllers/brandController')

const router = Router()

router.get('/',geyAll)
router.post('/',create)


module.exports =router
