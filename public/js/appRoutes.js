angular
  .module('meanhotel',
          ['ngRoute',
            'angular-jwt'])
  .config(config)
  .run(run);

function config($httpProvider, $routeProvider)
{
  $httpProvider
    .interceptors
    .push('AuthInterceptor');

  $routeProvider
    .when('/',
          {
            templateUrl: 'views/main.html',
            access: {
                      restricted: false
                    }
          })
    .when('/hotels',
          {
            templateUrl: 'views/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm',
            access: {
                      restricted: false
                    }
          })
    .when('/hotel/:id',
          {
            templateUrl: 'views/hotel.html',
            controller: HotelController,
            controllerAs: 'vm',
            access: {
                      restricted: false
                    }
          })
    .when('/register',
          {
            templateUrl: 'views/register.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                      restricted: false
                    }
          })
    .when('/profile',
          {
            templateUrl: 'views/profile.html',
            controller: UserController,
            controllerAs: 'vm',
            access: {
                      restricted: true
                    }
          })
    .otherwise({
                redirectTo: '/'
              });
}

function run($rootScope, $location, $window, AuthFactory)
{
  $rootScope
    .$on('$routeChangeStart',
          function(event, nextRoute, currentRoute)
          {
            if (nextRoute.access != undefined &&
                nextRoute.access.restricted &&
                !$window.sessionStorage.token &&
                !AuthFactory.isLoggedIn)
            {
              event
                .preventDefault();

              $location
                .path('/');
            }
          });
}
