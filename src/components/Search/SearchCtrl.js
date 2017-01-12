angular.module('searchEngine')

.value('$strapConfig', {
  datepicker: {
    language: 'fr',
    format: 'M d, yyyy'
  }
})

.controller('SearchCtrl', function($scope, $http, $location, $rootScope, searchFactory) {
  $scope.settings = {
       on : false,
       newsfeeds: false,
       //patents: false,
       socialNetworks: false,
       documents:false
     };

  $scope.getResults = function() {
      $http({
            method: 'GET',
            url: 'src/res/search.php'
		  }).then(function successCallback(response) {
        
        document.searchFactory.setResults(response.data['Labels']);
        $location.path( "/results");
		    }, function errorCallback(response) {
          
          swal("Error", JSON.stringify(response), "error");         
	      });
  }
	


    $scope.clickSearch = function(settings, keywords) {
      if(keywords) {
          searchFactory.search(keywords, settings);

          //searchFactory.setKeyWords(keywords);

          //searchFactory.authentication();
          
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

