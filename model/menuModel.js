const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    item_name : {
        type : String,
        trim : true
    }
    ,
    item_des : {
        type : String,
        trim : true
    }
    ,
    item_price : {
        type : Number,
        trim : true
    }
    ,
    stock : {
       type : Number,
       trim : true 
    }
    ,
    shop : {
        type : mongoose.Schema.ObjectId,
        ref : 'shop'
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signUp' 
    }
    ,
    identifier : {
        type : Number,
        trim : true
    }
})

const menu = new mongoose.model('menu', menuSchema)

module.exports = menu