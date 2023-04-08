const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path : "./config.env"})

const mongoose = require('mongoose')

const connect = mongoose.connect(process.env.CONNECTION).then(el=>{console.log("db coneection established")})

const server = app.listen(8600, ()=>{
    console.log("server is running at 8600")
})