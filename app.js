'use strict';

angular.module('searchEngine', ['ngAnimate', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'src/components/Search/search.html', controller: 'SearchCtrl' })
      .when('/results', { templateUrl: 'src/components/Result/results.html', controller: 'ResultCtrl' })
      .when('/admin', { templateUrl: 'src/components/Admin/admin.html' })
      .otherwise({ redirectTo: '/'});
  })

.directive('navigation', function (routeNavigation) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "src/components/imports/navbar.html",
    controller: function ($scope) {
      $scope.routes = routeNavigation.routes;
      $scope.activeRoute = routeNavigation.activeRoute;
    }
  };
})

.factory('routeNavigation', function($route, $location) {
  var routes = [];
  angular.forEach($route.routes, function (route, path) {
    if (route.name) {
      routes.push({
        path: path,
        name: route.name
      });
    }
  });
  return {
    routes: routes,
    activeRoute: function (route) {
      return route.path === $location.path();
    }
  };
})


.directive( 'filterbtns', function () {
  return {
    templateUrl: '/src/components/Result/resultRadioBtns.html',
    controller: 'ResultCtrl'
  };
})

.directive( 'resultmodal', function() {
  return {
    templateUrl: '/src/components/Result/ResultModal.html',
    controller: 'ResultCtrl'
  };
})

.directive( 'pagination', function() {
  return {
    templateUrl: '/src/components/Result/pagination.html',
    controller: 'ResultCtrl'
  };
})

.directive( 'settings', function() {
  return {
    templateUrl: '/src/components/Search/settings.html',
    controller: 'SearchCtrl'
  };
})
