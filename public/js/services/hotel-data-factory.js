angular
  .module('meanhotel')
  .factory('hotelDataFactory',
            hotelDataFactory);

function hotelDataFactory($http)
{
  return {
            hotelList: hotelList,
            hotelDisplay: hotelDisplay,
            postReview: postReview,
            userProfileData: userProfileData
          };

  function hotelList()
  {
    return $http
            .get('/app/hotels?count=10')
            .then(complete).catch(failed);
  }

  function hotelDisplay(id)
  {
    return $http
            .get('/app/hotels/' + id)
            .then(complete).catch(failed);
  }

  function postReview(id, review)
  {
    return $http
            .post('/app/hotels/' + id + '/reviews', review)
            .then(complete).catch(failed);
  }

  function userProfileData()
  {
    console.log('* * * - userProfileData');
    return $http
            .get('app/profile')
            .then(complete).catch(failed);
  }

  function complete(response)
  {
    console.log("response: ", response);
    return response;
  }

  function failed(error)
  {
    console.log('hotel-data-factory(error): ', error.statusText);
  }
}
