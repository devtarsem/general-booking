const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating : {
        type : Number,
        trim : true
    }
    ,
    review : {
        type : String,
        trim : true
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
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signUp' 
    }
})

const review = new mongoose.model('review', reviewSchema)

module.exports = review