const express = require('express')

const router = express.Router()
const cartOderDisplayToResturantController = require('./../controller/cartOrderDisplayToResturantController')

router.route('/all-orders').get(cartOderDisplayToResturantController.cartDisplay)
router.route('/order-accept').post(cartOderDisplayToResturantController.acceptingOrderByVendor)
router.route('/order-finish').post(cartOderDisplayToResturantController.orderIsReadyAndFinished)



module.exports = router

