'use strict';

var app = angular.module('searchEngine', ['ngAnimate', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'src/components/Search/search.html', controller: 'SearchCtrl' })
      .when('/results', { templateUrl: 'src/components/Result/results.html', controller: 'ResultCtrl' })
      .when('/admin', { template: 'Admin Area' })
      .otherwise({ redirectTo: '/'});
  })
 /* config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config ($stateProvider, $urlRouterProvider){

        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('search', {
                url: '/',
                component: 'viewSearch',
                resolve: {
                    items: resolveItems
                }
            })

    }*/




//export default config;