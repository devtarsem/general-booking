const express = require('express')
const router = express.Router()
const reviewAndRatingController = require('./../controller/reviewAndRatingController')

router.route('/review').post(reviewAndRatingController.reviewAdding)
router.route('/all-review').get(reviewAndRatingController.allReviews)



module.exports = router