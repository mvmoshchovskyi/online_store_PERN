class ApiError extends Error {
    constructor(status, messsage) {
        super()
        this.status = status
        this.message = messsage
    }
    static badRequest(message){
        return ApiError(404, message)
    }
    static internal(message){
        return ApiError(500, message)
    }
    static forbidden(message){
        return ApiError(403, message)
    }
}

module.exports = new ApiError()
