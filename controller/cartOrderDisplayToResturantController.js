const cart = require('./../model/cart')
const {promisify} = require('util')
const jsonwebtoken = require('jsonwebtoken')
const signUp = require('./../model/authModel')
const errorSending = require('./../util/errorSending')
const verfyingTheToken = async (token)=>{
    return await promisify(jsonwebtoken.verify)(token, process.env.STRING)
}

exports.cartDisplay = async (req, res, next)=>{
    /******************** when you display the cart items in the frontend display the user id as well but with opacity bacause in orrder accept by vendor we are using user id to find user from list */
    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to take items in cart", 404)

    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)

    const allCartItem = await cart.find({user : userfind._id})
    const shops = await cart.find({user : userfind._id})

    const placedOrders = allCartItem.find(el=> el.placing_status === 'placed' && String(el.shopid) == String(shops[0].shopid))
    res.status(200).json({
        status : "ok",
        data : {
            data : placedOrders
        }
    })
    next()
}

exports.acceptingOrderByVendor = async (req, res, next)=>{
    const {user} = req.body;
    errorSending.scopeOfError(res, !user, "sorry, something went wrong we are solving please wait", 404)
    
    const orderfinding = await cart.find({user : user})
    console.log(orderfinding)
    orderfinding[0].accept_order = 'accept'
    await orderfinding[0].save()
    res.status(200).json({
        status : "ok",
        data : {
            data : orderfinding
        }
    })
    next()
}

exports.orderIsReadyAndFinished = async (req, res, next)=>{
    const {user} = req.body;
    errorSending.scopeOfError(res, !user, "sorry, something went wrong we are solving please wait", 404)

    console.log(user)
    const orderfinding = await cart.find({user : user})
    console.log(orderfinding)
    orderfinding[0].accept_order = 'finish'
    await orderfinding[0].save()
    res.status(200).json({
        status : "ok",
        data : {
            data : orderfinding
        }
    })
    next()
}