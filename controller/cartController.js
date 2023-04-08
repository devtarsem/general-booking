const cart = require('./../model/cart')
const {promisify} = require('util')
const jsonwebtoken = require('jsonwebtoken')
const signUp = require('./../model/authModel')
const errorSending = require('./../util/errorSending')
const verfyingTheToken = async (token)=>{
    return await promisify(jsonwebtoken.verify)(token, process.env.STRING)
}



exports.addingItemInCart = async (req, res, next)=>{
    /*******display shop id that is in menu schema while displaying all the menu items for the user */
    const cartItem = req.body
    console.log(cartItem)

    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to take items in cart", 404)
    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    errorSending.scopeOfError(res, !userfind, "please login or signup first to take items in cart or you are providing wrong credentials", 404)

    let cartItemAddition;

    if((await cart.find({user : userfind._id})).length!=0){
        cartItemAddition = await cart.find({user : userfind._id})
        console.log(cartItemAddition)
        cartItemAddition[0].cartList.push(cartItem)
        cartItemAddition[0].shopname = cartItem[0].shopname
        cartItemAddition[0].shopid = cartItem[0].shopid

        await cartItemAddition[0].save()
    }
    else{
        cartItemAddition = await cart.create({user : userfind._id})
        cartItemAddition.cartList.push(cartItem)
        cartItemAddition.shopname = cartItem[0].shopname
        cartItemAddition.shopid = cartItem[0].shopid

        await cartItemAddition.save()
    }

    res.status(200).json({
        status : "ok",
        data : {
            data : cartItemAddition
        }
    })
}

// cartQuantity is pending/////////


exports.cartQuantity = async (req, res, next)=>{
    const {item_name, item_des, item_price, quantity, subTotal} = req.body
    errorSending.scopeOfError(res, (item_name===undefined || item_des===undefined || item_price === undefined || quantity === undefined), "please provide all the credentials properly", 404)

    // taking token from cookies
    const token = req.cookies.sign
    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    const user = userfind._id
    let cartOfUser = await cart.find({user})
    
    // const cartElements = [...cartOfUser[0].cartList]
    const cartUpdation = cartOfUser[0].cartList.find(el=> el[0].item_name === item_name && el[0].item_price === item_price)
    cartUpdation[0].quantity = quantity
    cartUpdation[0].subTotal = quantity * cartUpdation[0].item_price
    console.log(cartOfUser[0].cartList)

    const updatingCart = await cart.findByIdAndUpdate(cartOfUser[0]._id, {cartList : cartOfUser[0].cartList})


    res.status(200).json({
        status : "ok",
        data : {
            data : updatingCart
        }
    })
}

exports.orderPlacing = async (req, res, next)=>{
    const token = req.cookies.sign
    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    const user = userfind._id
    const cartOfUser = await cart.find({user})
    cartOfUser[0].placing_status = 'placed'
    await cartOfUser[0].save()
    res.status(200).json({
        status : "ok",
        data : {
            data : cartOfUser
        }
    })
    next()
}


exports.cancelOrder = async(req, res, next)=>{
    const token = req.cookies.sign
    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    const user = userfind._id
    const cartOfUser = await cart.find({user})
    const orderDelete = await cart.findByIdAndDelete(cartOfUser[0]._id) 

    res.status(200).json({
        status : "ok",
        data : {
            data : "order cancelled sucessfully your refund in reach in your account in 3-5 working days"
        }
    })
    next()
}


exports.deleteItemFromCart = async (req, res, next)=>{
    const {item_name, item_price} = req.body
    const token = req.cookies.sign
    // errorSending(res, !token, "please login or signup first to add menu items")

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    const user = userfind._id
    const cartOfUSer = await cart.find({user})
    const deletecart = cartOfUSer[0].cartList.find(el=> el[0].item_name === item_name && el[0].item_price === item_price)
    console.log(deletecart)
    cartOfUSer[0].cartList.pop(deletecart)
    await cartOfUSer[0].save()
    res.status(200).json({
        status : "ok",
        data : {
            data : "Item remmoved sucessfully"
        }
    })
}