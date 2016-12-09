/*
										- - -   HOTELS   - - -
	Method		URL										Action

	GET				/api/hotels						Get all/multiple hotels
	POST			/api/hotels						Create a new hotel
	GET				/api/hotels/1234567		Get a specific hotel
	PUT				/api/hotels/1234567		Update a specific hotel
	DELETE		/api/hotels/1234567		Delete a specific hotel

										- - -   REVIEWS   - - -
	Method		URL										Action
	GET				/api/hotels/1234567/reviews						Get all reviews for a specific hotel
	POST			/api/hotels/1234567/reviews						Add review for a specific hotel
	GET				/api/hotels/1234567/reviews/1234567		Get a specific review for a hotel
	PUT				/api/hotels/1234567/reviews/1234567		Update a specific review for a specific hotel
	DELETE		/api/hotels/1234567/reviews/1234567		Delete a specific review
*/

var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

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
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;