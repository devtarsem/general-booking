const express = require('express')

const router = express.Router()
const vendorFinishOrderController = require('./../controller/vendorOrderFinishController')

router.route('/finish-orders').get(vendorFinishOrderController.allFinishOrderForVendors)

module.exports = router
