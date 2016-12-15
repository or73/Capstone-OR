angular
  .module('meanhotel')
  .controller('HotelsController',
              HotelsController);

function HotelsController(hotelDataFactory)
{
  var vm = this;
  vm.title = 'MEAN Hotel Application';

  hotelDataFactory
    .hotelList()
    .then(function(response)
          {
            vm.hotels = response.data;
          });
}
