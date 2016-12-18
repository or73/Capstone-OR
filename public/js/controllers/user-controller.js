angular
  .module('meanhotel')
  .controller('UserController',
              UserController);

function UserController(hotelDataFactory)
{
  var vm = this;

  console.log("UserController - username: ", vm.username);
  console.log("UserController - vm: ", vm);

  hotelDataFactory
    .userProfileData()
    .then(function(response)
          {
            console.log('user-controller: ', response);
            var data = response.data[0];
            
            vm.username = data.username;

            if (data.name == null)
            {
              vm.name = 'NONE';
            } else {
              vm.name = data.name;
            }

            console.log('user-controller - username: ', vm.username);
            console.log('user-controller - name: ', vm.name);
          });
}
