const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const signSchema = mongoose.Schema({
    username : {
        type : String,
        trim : true
    }
    ,
    email : {
        type : String,
        trim : true
    }
    ,
    password : {
        type : String,
        trim : true
    }
    ,
    control : {
        type : String,
        enum : ['user', 'admin', 'vendor'],
        trim : true,
        default : 'user'
    }
    ,
    image : {
        type : String,
        trim : true,
        default : "image.jpg"
    }
})

signSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    next()
})


const signUp = new mongoose.model('signUp', signSchema)

module.exports = signUp