const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signUp'
    }
    ,
    cartList : {
        type : [Object],
    }
    ,
    shopname : {
        type : String,
        trim : true
    }
    ,
    shopid : {
        type : mongoose.Schema.ObjectId,
        ref : 'shop'
    }
    ,
    placing_status : {
        type : String,
        enum : ['placed', 'not placed'],
        default : 'not placed'
    }
    ,
    accept_order : {
        type : String,
        enum : ['accept', 'reject', 'wait', 'finish'],
        default : 'wait'
    }
    
})

const cart = new mongoose.model('cart', cartSchema)

module.exports = cart