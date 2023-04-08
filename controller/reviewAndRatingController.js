const signUp = require('./../model/authModel')
const reviews = require('./../model/reviewAndRatingModel')
const {promisify} = require('util')
const jsonwebtoken = require('jsonwebtoken')
const errorSending = require('./../util/errorSending')
const verfyingTheToken = async (token)=>{
    return await promisify(jsonwebtoken.verify)(token, process.env.STRING)
}


exports.reviewAdding = async(req, res, next)=>{
    /***when you display all history orders to your customers then display shop id from cart finish orders as well */
    const {shopname, shopid, review, rating} = req.body;
    errorSending.scopeOfError(res, (shopname===undefined || shopid===undefined || review===undefined || rating===undefined), "please provide all the information correctly", 404)
    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to add menu items", 401)

    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    errorSending.scopeOfError(res, !userfind, "the credentials are not found invalid credentials, 404 not found" , 404)

    const reviewAdd = await reviews.create({user: userfind._id,shopname, shopid, review, rating})

    res.status(200).json({
        status : "ok",
        data : {
            data : reviewAdd
        }
    })
}

exports.allReviews = async(req, res, next)=>{
    const queryObj = {...req.query}
    const excludeFields = ["sort", "page", "fields", "limit"]
    excludeFields.forEach(el=> delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\bgte|gt|lt|lte\b/g, match=> `$${match}`)
    
    let query = reviews.find(JSON.parse(queryStr))

    if(req.query.sort){
        query = query.sort(req.query.sort)
    }
    else{
        query = query.sort('rating')
    }
    
    const reviewsAll = await query;
    errorSending.scopeOfError(res, reviewsAll.length==0, "sorry, we does not have your selected filter product", 404)
    
    res.status(200).json({
        status : "ok",
        data : {
            data : reviewsAll
        }
    })
}