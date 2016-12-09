angular
  .module('meanhotel')
  .controller('HotelsController',
              HotelsController);

function HotelsController(hotelDataFactory)
{
  var vm = this;
  vm.title = 'MEAN Hotel app';

  //$http
  //  .get('/api/hotels?count=10')
  hotelDataFactory
    .hotelList()
    .then(function(response)
          {
            //console.log(response);
            vm.hotels = response.data;
          });
}
