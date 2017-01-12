'use strict';

angular.module('searchEngine', ['ngAnimate', 'ngRoute', 'sociocortex', 'sc-search', 'sc-filter', 'sc-upload', 'dropZone', 'ngFileUpload'/*, 'app.controller.app', 'app.directive.dropzone'*/])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'src/components/Search/search.html', controller: 'SearchCtrl' })
      .when('/results', { templateUrl: 'src/components/Result/results.html', controller: 'ResultCtrl' })
      .when('/admin', { templateUrl: 'src/components/Admin/admin.html' })
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
    templateUrl: '/src/components/Search/Settings.html',
    controller: 'SearchCtrl'
  };
})

/*.directive('dropZone', function () {
    return {
        scope: {
            action: "@",
            autoProcess: "=?",
            callBack: "&?",
            dataMax: "=?",
            mimetypes: "=?",
            message: "@?",
        },
        link: function (scope, element, attrs) {
            console.log("Creating dropzone");

            // Autoprocess the form
            if (scope.autoProcess != null && scope.autoProcess == "false") {
                scope.autoProcess = false;
            } else {
                scope.autoProcess = true;
            }

            // Max file size
            if (scope.dataMax == null) {
                scope.dataMax = Dropzone.prototype.defaultOptions.maxFilesize;
            } else {
                scope.dataMax = parseInt(scope.dataMax);
            }

            // Message for the uploading
            if (scope.message == null) {
                scope.message = Dropzone.prototype.defaultOptions.dictDefaultMessage;
            }

            element.dropzone({
                url: scope.action,
                maxFilesize: scope.dataMax,
                paramName: "file",
                acceptedFiles: scope.mimetypes,
                maxThumbnailFilesize: scope.dataMax,
                dictDefaultMessage: scope.message,
                autoProcessQueue: scope.autoProcess,
                success: function (file, response) {
                    if (scope.callBack != null) {
                        scope.callBack({response: response});
                    }
                }
            });
        }
    }
})*/
      