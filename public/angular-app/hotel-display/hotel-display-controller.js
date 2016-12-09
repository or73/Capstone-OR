angular
  .module('meanhotel')
  .controller('HotelController',
              HotelController);

function HotelController($route, $routeParams, hotelDataFactory)
{
  var vm = this;
  var id = $routeParams.id;
  //console.log("id: ", id);

  //$http
  //  .get('/api/hotels/' + id)
  vm.isSubmitted = false;

  hotelDataFactory
    .hotelDisplay(id)
    .then(function(response)
          {
            //console.log("response: ", response);
            //console.log("response.data: ", response.data);
            vm.hotel = response.data;
            vm.stars = _getStarRating(response.data.stars);
          });

  function _getStarRating(stars)
  {
    return new Array(stars);
  }

  vm.addReview =  function()
                  {
                    var postData = {
                                      name: vm.name,
                                      rating: vm.rating,
                                      review: vm.review
                                    };
                    if (vm.reviewForm.$valid)
                    {
                      hotelDataFactory
                        .postReview(id,
                                    postData)
                        .then(function(response)
                              {
                                if (response.status === 200)
                                {
                                  $route.reload();
                                  vm.review = '';
                                }
                              })
                        .catch(function(error)
                                {
                                  console.log(error);
                                });
                    } else
                    {
                      vm.isSubmitted = true;
                    }
                  };
}
