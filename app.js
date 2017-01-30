'use strict';

angular.module('searchEngine', ['ngAnimate', 'ngRoute', 'sociocortex', 'sc-search', 'sc-filter', 'sc-upload', 'dropZone', 'ngFileUpload', '720kb.datepicker', 'DocClassification'])
  .config(function($routeProvider) {
   
    $routeProvider
      .when('/', { templateUrl: 'src/components/Search/search.html', controller: 'SearchCtrl' })
      .when('/results', { templateUrl: 'src/components/Result/results.html'/*, controller: 'ResultCtrl'/*, controllerAs: 'resCtrl'*/ })
      .when('/admin', { templateUrl: 'src/components/Admin/admin.html', controller: 'AdminCtrl' })
      .when('/upload', { templateUrl: 'src/components/Upload/upload.html', controller: 'dropZoneCtrl'})
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

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
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
    templateUrl: '/src/components/Result/ResultModal.html'
    /*controller: 'resCtrl'*/
  };
})

.directive( 'datemodal', function() {
  return {
    templateUrl: '/src/components/Search/SearchModal.html',
    controller: 'SearchCtrl'
  };
})

.directive( 'pagination', function() {
  return {
    templateUrl: '/src/components/Result/pagination.html'/*,
    controller: 'resCtrl'*/
  };
})

.directive( 'settings', function() {
  return {
    templateUrl: '/src/components/Search/Settings.html',
    controller: 'SearchCtrl'
  };
})

.directive( 'timeline', function() {
  return {
    templateUrl: '/src/components/Result/timeline.html',
    controller: 'TimelineCtrl'
  };
})
