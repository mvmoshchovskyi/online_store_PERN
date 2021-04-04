const {Router} = require('express')
const {geyAll,create,} =require('../controllers/typeController')
const checkRole = require('../middleware/checkRole')
const router = Router()

router.post('/',checkRole('ADMIN'),create)
router.get('/',geyAll)


module.exports =router
