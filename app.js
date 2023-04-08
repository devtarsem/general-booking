const express = require('express')
const app = express()
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const authRoute = require('./routes/authRoute')
const shopRegisterRoute = require('./routes/shopRegisterRoute')
const menuRoute = require('./routes/menuRoute')
const cartRoute = require('./routes/cartRoute')
const orderAcceptRoute = require('./routes/orderAcceptRoute')
const reviewRoute = require('./routes/reviewRoute')
const vendorfinishOrderRoute = require('./routes/vendorFinishOrderRouter')

app.use('/api/v1', authRoute)
app.use('/api/v1/vendor', shopRegisterRoute)
app.use('/api/v1/vendor/menu', menuRoute)
app.use('/api/v1/resturant', cartRoute)
app.use('/api/v1/order', orderAcceptRoute)
app.use('/api/v1/feedback', reviewRoute)
app.use('/api/v1/vendor/order', vendorfinishOrderRoute)



module.exports = app