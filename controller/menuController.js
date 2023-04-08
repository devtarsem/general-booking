const menu = require('./../model/menuModel')
const shop = require('./../model/shopRegisterationModel')
const signUp = require('./../model/authModel')
const {promisify} = require('util')
const jsonwebtoken = require('jsonwebtoken')
const errorSending = require('./../util/errorSending')

const verfyingTheToken = async (token)=>{
    return await promisify(jsonwebtoken.verify)(token, process.env.STRING)
}

// const errorSending = (res,condition, message)=>{
//     if(condition){
//         res.status(404).json({
//             status : 'not found',
//             data : {
//                 data : message
//             }
//         })
//         res.status(404).send({
//             data : {
//                 data : message
//             }
//         })
//         return
//     }
// }


exports.menuAdding = async (req, res, next)=>{
    // taking menu credentials from the user
    const {item_name, item_des, item_price, stock} = req.body;
    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to add menu items", 404)
    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    errorSending.scopeOfError(res, !userfind, "the credentials are not found invalid credentials, 404 not found",404)

    // finding shop from token id via shop schema
    const shops = await shop.find({user : userfind._id})
    errorSending.scopeOfError(res, shops.length==0, "your shop is not registered yet please registered your shop first", 403)

    // asigning the user and shop id to the menu schema
    req.body.user = userfind._id
    req.body.shop = shops[0]._id
    // making a identification number
    const identifier = Math.trunc(Math.random()*100000000000000000000)
    req.body.identifier = identifier
    
    // creating the menu in the db
    const menuAddition = await menu.create(req.body)
    res.status(200).json({
        status : "ok",
        token : token,
        data : {
            data : menuAddition
        }
    })
}

exports.allMenuList = async(req, res, next)=>{

    let queryObj = {...req.query}
    const excludeFields = ["sort", "page", "fields", "limit"]
    excludeFields.forEach(el=> delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\bgte|gt|lt|lte\b/g, match=> `$${match}`)
    
    let query = menu.find(JSON.parse(queryStr))
    // .populate('user').populate('shop') with doing population fields don't work because we are hiding the user and shop credentials from user

    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        console.log(fields)
        query = query.select(fields)
    }
    else{
        query = query.select('-shop')
    }

    if(req.query.sort){
        console.log(req.query.sort)
        const sorting = req.query.sort.split(',').join(' ')
        query = query.sort(sorting)
    }

    let menuList = await query
    errorSending.scopeOfError(res, menuList.length==0, "sorry, we does not have your selected filter product", 404)

    // filteration is pending menas here we are displaying all the menu's list but we want that say user is able to see and list by like price etc like sorting etc...
    
    res.status(200).json({
        status : "ok",
        data : {
            data : menuList
        }
    })
}


exports.deleteMenu = async (req, res, next)=>{
    const {item_name, item_des} = req.body
    errorSending.scopeOfError(res, (item_name===undefined || item_des === undefined), "sorry, something went worng we are fixing it please wait", 404)

    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to add menu items",404)

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    errorSending.scopeOfError(res, !userfind, "the credentials are not found invalid credentials, 404 not found",404)

    // finding shop  y userfind
    const shops = await shop.find({user : userfind._id})
    errorSending.scopeOfError(res, shops.length==0, "your shop is not registered yet please registered your shop first", 404)

    const menuselected = await menu.find({user : userfind._id,shop : shops[0]._id, item_name, item_des})
    errorSending.scopeOfError(res, menuselected.length==0, "your menu is not registered yet please registered your menu first",404)

    const deleteMenu = await menu.findByIdAndDelete(menuselected[0]._id)
    res.status(200).json({
        status : "ok",
        data : {
            data : "menu item deleted sucessfully"
        }
    })
    next()
}

exports.updateMenuItems = async(req, res, next)=>{
    const {identifier} = req.body
    // taking token from cookies
    const token = req.cookies.sign
    errorSending.scopeOfError(res, !token, "please login or signup first to add menu items", 401)

    // fetching id from the cookies token
    const idFromToken = await verfyingTheToken(token)
    // finding user from token id from signup model
    const userfind = await signUp.findById(idFromToken.id)
    errorSending.scopeOfError(res, !userfind, "the credentials are not found invalid credentials, 404 not found" , 404)

    // finding shop  y userfind
    const shops = await shop.find({user : userfind._id})
    errorSending.scopeOfError(res, shops.length==0, "your shop is not registered yet please registered your shop first", 401)

    const menuselected = await menu.find({user : userfind._id,shop : shops[0]._id, identifier})
    const updateItem = await menu.findByIdAndUpdate(menuselected[0]._id, req.body)

    res.status(200).json({
        status : "ok",
        data : {
            data : updateItem
        }
    })
    next()
}