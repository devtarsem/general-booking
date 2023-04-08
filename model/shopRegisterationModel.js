const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signUp'
    }
    ,
    shopname : {
        type : String,
        trim : true
    }
    ,
    description : {
        type : String,
        trim : true 
    }
    ,
    opening : {
        type : String,
        trim : true
    }
    ,
    closing : {
        type : String,
        trim : true
    }
    ,
    openStatus : {
        type : String,
        trim : true,
        default : 'OPEN FOR ORDERS'
    }
    ,
    speciality : {
        type : String,
        trim : true
    }
    ,
    ownername : {
        type : String,
        trim : true
    }
    ,
    ownerNumber : {
        type : Number,
        trim : true
    }
    ,
    rating : {
        type : Number,
        trim : true,
        min : 0,
        max : 5,
        default : 5
    }
    ,
    review : {
        type : String,
        trim : true
    }
    ,
    menu : {
        type : Array
    }
    
})

const shop = new mongoose.model('shop', shopSchema)

module.exports = shop;
