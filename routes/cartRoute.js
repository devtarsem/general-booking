const express = require('express')

const router = express.Router()
const cartController = require('./../controller/cartController')
router.route('/cart').post(cartController.addingItemInCart)
router.route('/cart/quantity-update').post(cartController.cartQuantity)
router.route('/cart/place-order').get(cartController.orderPlacing)
router.route('/cart/cancel-order').delete(cartController.cancelOrder)
router.route('/cart/remove-item').post(cartController.deleteItemFromCart)





module.exports = router