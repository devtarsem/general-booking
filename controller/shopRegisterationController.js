const shop = require('./../model/shopRegisterationModel')
const jsonwebtoken = require('jsonwebtoken')
const signUp = require('./../model/authModel')
const {promisify} = require('util')
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


exports.registerShop = async (req, res, next)=>{
    // getting data from the user
    const {shopname, description, opening, closing, openStatus, speciality, ownername, ownerNumber} = req.body;
    errorSending.scopeOfError(res, (shopname===undefined || description===undefined || opening===undefined || closing === undefined || openStatus===undefined || speciality === undefined || ownername===undefined || ownerNumber===undefined), "please provide all the necessary imformation", 403)
    // taking cookies fom the web
    const token = req.cookies.sign;
    errorSending.scopeOfError(res, !token, "please login or sign up first to proceed", 403)
    // sending error to the frontend if token not comes

    // verfying the token and taking the stored id
    const verification = await verfyingTheToken(token)
    // sending error to the frontend if token is not verified
    errorSending.scopeOfError(res, !verification, "invalid signature please login again", 403)

    // finding the user bt the token id
    const userFind = await signUp.findById(verification.id)
    // sending error to the frontend if user not founded
    errorSending.scopeOfError(res,!userFind, "the credential you are inappropriate please put valid credentials, 404 user not found", 404)

    // changing the control from user to vendor
    userFind.control = 'vendor'
    // saving the signup document
    await userFind.save()
    // assigning the user in the body object
    req.body.user =  userFind.id
    // creating the shop for the vendor
    const createShop = await shop.create(req.body);
    res.status(200).json({
        status : "ok",
        token : token,
        data : {
            data : createShop
        }
    })
    next()
}

exports.gettingAllShops = async (req, res, next)=>{
    const allShops = await shop.find().populate('user')
    res.status(200).json({
        status : "ok",
        data : {
            data : allShops
        }
    })
    next()
}

exports.updatedTheShopRegsiterationCredentials = async(req, res, next)=>{
    // taking cookies fom the web
    const token = req.cookies.sign;

    // sending error to the frontend if token not comes
    errorSending.scopeOfError(res, !token, "please signUp first or Login to the account to open the store", 403)

    // verfying the token and taking the stored id
    const verification = await verfyingTheToken(token)
    // sending error to the frontend if token is not verified
    errorSending.scopeOfError(res, !verification, "invalid", 403)

    // finding the user bt the token id
    const userFind = await signUp.findById(verification.id)
    // sending error to the frontend if user not founded
    errorSending.scopeOfError(res,!userFind, "the credential you are inappropriate please put valid credentials, 404 user not found", 404)

    // finding the shop via user id from userfind
    const shops = await shop.find({user : userFind._id})
    errorSending.scopeOfError(res, !shops, "you are not registred for a shop , 404 shop not found", 404)
    // finding shop and updating the credentials
    const userFindAndUpdate = await shop.findByIdAndUpdate(shops[0]._id, req.body)
    
    res.status(200).json({
        status : "ok",
        data : {
            data : userFindAndUpdate
        }
    })
    next()
}

exports.deleteVendorShop = async (req, res, next)=>{
    // taking cookies fom the web
    const token = req.cookies.sign;
    // sending error to the frontend if token not comes
    errorSending.scopeOfError(res, !token, "please signUp first or Login to the account to open the store", 401)

    // verfying the token and taking the stored id
    const verification = await verfyingTheToken(token)
    // sending error to the frontend if token is not verified
    errorSending.scopeOfError(res, !verification, "invalid signature", 401)

    // finding the user bt the token id
    const userFind = await signUp.findById(verification.id)
    // sending error to the frontend if user not founded
    errorSending.scopeOfError(res,!userFind, "the credential you are inappropriate please put valid credentials, 404 user not found", 404)

    // finding the shop via user id from userfind
    const shops = await shop.find({user : userFind._id})


    const deleteVendorShop = await shop.findByIdAndDelete(shops[0]._id)
    res.status(200).json({
        status : "ok",
        data : {
            data : "vendor deleted sucessfully"
        }
    })
    next()

}