const cart = require('./../model/cart')
const errorSending = require('./../util/errorSending')
exports.allFinishOrderForVendors = async(req, res, next)=>{
    console.log(req.query)
    const queryObj = {...req.query}
    const excludeFields = ["page", "sort", "limit", "field"]
    excludeFields.forEach(el=> delete queryObj[el])

    let query = cart.find(queryObj)

    const allFinishOrders = await query
    errorSending.scopeOfError(res, allFinishOrders.length==0, "sorry, but no finished orders are there for your resturant", 404)
    res.status(200).json({
        status : "ok",
        data : {
            data : allFinishOrders
        }
    })
    next()
}