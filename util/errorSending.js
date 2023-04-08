class errorSending{
    constructor(res, condition, message, code){
        this.res = res,
        this.condition = condition,
        this.message = message
    }
    scopeOfError(res, condition, message, code){
        if(condition){
            res.status(code).json({
                status : 'not found',
                data : {
                    data : message
                }
            })
            res.status(code).send({
                data : {
                    data : message
                }
            })
            return
        }


    }
}
const error = new errorSending();
module.exports = error