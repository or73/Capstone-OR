angular
  .module('meanhotel')
  .directive('mhNavigation',
              mhNavigation);

function mhNavigation()
{
  return {
          restrict: 'E',
          templateUrl: 'views/navigation-directive.html'
        };
}
