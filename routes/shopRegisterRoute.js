const express = require('express');
const router = express.Router()
const shopRegisterationController = require('./../controller/shopRegisterationController')
router.route('/register-your-shop').post(shopRegisterationController.registerShop)
router.route('/all-register-shops').get(shopRegisterationController.gettingAllShops)
router.route('/update-shop').patch(shopRegisterationController.updatedTheShopRegsiterationCredentials)
router.route('/delete-shop').delete(shopRegisterationController.deleteVendorShop)




module.exports = router;
