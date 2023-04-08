const express = require('express')
const router = express.Router()
const menuController = require('./../controller/menuController')

router.route('/menu-addition').post(menuController.menuAdding)
router.route('/menu-list').get(menuController.allMenuList)
router.route('/menu-delete').post(menuController.deleteMenu)
router.route('/menu-update').post(menuController.updateMenuItems)




module.exports = router