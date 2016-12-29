angular.module('searchEngine')


.controller('SearchCtrl', function($scope, $http, $location, $rootScope, scAuth, scData, scSearch) {
  $scope.settings = {
       on : false,
       newsfeeds: false,
       patents: false,
       socialNetworks: false,
       documents:false
     };


  $scope.getResults = function() {
      $http({
            method: 'GET',
            url: 'src/res/search.php'
		  }).then(function successCallback(response) {
        
        document.searchService.setResults(response.data['Labels']);
        $location.path( "/results");
		    }, function errorCallback(response) {
          
          swal("Error", JSON.stringify(response), "error");         
	      });
  }
	


    $scope.clickSearch =function(settings, keywords) {
      if(keywords) {
          document.searchService.initSearchService(scAuth, scData, scSearch, $location);
          document.searchService.setKeyWords(keywords);
          //$scope.getResults();
          document.searchService.authentication();
          
          /*if(settings.on) {
            alert("newsfeeds: " + settings.newsfeeds + "patents");
          } else {
            alert("o");
          }*/
      } else {
        swal("Error", "No Keywords entered!", "error");
      }
      
     
    }
    
    $scope.changeStateTo = function(state) {
      $location.path( "#!/results" );
    }
  
});


