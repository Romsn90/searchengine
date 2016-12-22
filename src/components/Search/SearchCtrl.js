angular.module('searchEngine')


.controller('SearchCtrl', function($scope, $http, $location, $rootScope) {
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
        
        document.searchService.setResults(response.data);
        $location.path( "/results");
		    }, function errorCallback(response) {
          
          swal("Error", JSON.stringify(response), "error");         
	      });
  }
	


    $scope.clickSearch =function(settings, keywords) {
      if(keywords) {
          document.searchService.setKeyWords(keywords);
          $scope.getResults();
          
          
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