const {A} = require('../error/ApiError')

module.exports = function (err, req, res, next){
    if(err instanceof ApiError){
       return err.status(err.status).json({message:err.message})
    }
    return res.status(500).json({message:'unknown error'})
}
