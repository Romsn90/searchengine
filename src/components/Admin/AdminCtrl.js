angular.module('searchEngine')

.controller('AdminCtrl', function($scope, $http) {
$scope.URL = "https://competicortex.sterotec.de/";

$scope.list = null;

	$scope.getRSSlist = function() {

		$http({
            method: 'GET',
            url: $scope.URL + "rsslinks.php",
			  "crossDomain": true,
			  "async": true
		  }).then(function successCallback(response) {
        		$scope.list = response.data;
		    }, function errorCallback(response) {
          
          swal("Error", JSON.stringify(response), "error");         
	      });
	}
	
	$scope.deleteItem = function(idx) {
		$scope.deleteFromRSSlist(idx);
        
    }
	
	$scope.deleteFromRSSlist = function(idx) {
		$http({
            method: 'DELETE',
            url: $scope.URL + "rsslinks.php?name=" + $scope.list[idx].name
			//headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     
		  }).then(function successCallback(response) {
			  $scope.list.splice(idx,1);
				alert("success");
		    }, function errorCallback(response) {
          
          swal("Error", "error", "error");         
	      });
		  

	}
	
	
  


});