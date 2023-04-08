const signUp = require('./../model/authModel')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const errorSending = require('./../util/errorSending')
const assigntoken = (id)=>{
    return jsonwebtoken.sign({id : id}, process.env.STRING)
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



exports.signingTheUser = async (req, res, next)=>{
    // taking data from the user
    const {username, password, email, image} = req.body;
    // sinding error to the json and frontend if username or password or email not defined
    errorSending.scopeOfError(res, (email==undefined || password==undefined || username==undefined || image==undefined), "please provide proper email or password or uername",401)

    // saving the user in the authentication
    const signTheUSer = await signUp.create(req.body);
    // assigning the token to the user
    const token = assigntoken(signTheUSer._id)
    // sending the token to the cookies of the web
    const cookiesOptions = {}
    res.cookie('sign', token, cookiesOptions)

    // sending the data to the page
    res.status(200).json({
        status : "ok",
        token : token,
        data : {
            data : signTheUSer
        }
    })
    next()
}


exports.login = async (req, res, next)=>{
    // getting the credentials from the user
    const {email, password} = req.body;
    // sending error to json and frontend if email and password is not defined
    errorSending.scopeOfError(res,(email==undefined || password==undefined), "please provide proper email or password",401)

    // finding the user using email provided
    const user = await signUp.find({email});
    // sending error to json and frontend if user is not defined
    errorSending.scopeOfError(res, user.length==0, "The user not found please check your email or password", 404)

    // checking the password
    const passwordCheck = await bcrypt.compare(password, user[0].password)
    // sending error to json and frontend if password is not matched
    errorSending.scopeOfError(res, !passwordCheck, "The user not found please check your email or password", 401)

    // assigning the user token 
    const token = assigntoken(user[0]._id)
    
    res.status(200).json({
        status : 'ok',
        token : token,
        data : {
            data : user
        }
    })
    next()
}


exports.AllUsers = async (req, res, next)=>{
    const allUsers = await signUp.find()
    res.status(200).json({
        status : 'ok',
        data : {
            data : allUsers
        }
    })
    next()
}

