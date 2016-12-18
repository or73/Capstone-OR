/*
										- - -   HOTELS   - - -
	Method		URL										Action

	GET				/app/hotels						Get all/multiple hotels
	POST			/app/hotels						Create a new hotel
	GET				/app/hotels/1234567		Get a specific hotel
	PUT				/app/hotels/1234567		Update a specific hotel
	DELETE		/app/hotels/1234567		Delete a specific hotel

										- - -   REVIEWS   - - -
	Method		URL										Action
	GET				/app/hotels/1234567/reviews						Get all reviews for a specific hotel
	POST			/app/hotels/1234567/reviews						Add review for a specific hotel
	GET				/app/hotels/1234567/reviews/1234567		Get a specific review for a hotel
	PUT				/app/hotels/1234567/reviews/1234567		Update a specific review for a specific hotel
	DELETE		/app/hotels/1234567/reviews/1234567		Delete a specific review
*/

var express = require('express');
var router = express.Router();

var ctrlHotels = require('../public/js/controllers/hotels.controllers.js');
var ctrlReviews = require('../public/js/controllers/reviews.controllers.js');
var ctrlUsers = require('../public/js/controllers/users.controllers.js');

// Hotel routes
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

// Profile routes
router
  .route('/profile')
  .get(ctrlUsers.userProfileData);

// Authentication routes
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

module.exports = router;
