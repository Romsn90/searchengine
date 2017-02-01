angular.module('searchEngine')

.controller('AdminCtrl', function($scope, $http, $cacheFactory) {
$scope.URL = "https://competicortex.sterotec.de/";

$scope.list = null;

$scope.getRSSlist = function() {
	$http({
    	method: 'GET',
        url: $scope.URL + "rsslinks.php"
	}).then(function successCallback(response) {
    	$scope.list = response.data;
	}, function errorCallback(response) {      
    	swal("Error", JSON.stringify(response), "error");         
	});
}
	
	$scope.deleteItem = function(idx) {

		swal({
			title:  $scope.list[idx].name + " wirklich entfernen?",
			//text: $scope.list[idx].name + " entfernen?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#777',
			cancelButtonColor: '#FF5252',
			confirmButtonText: 'ja, Löschen!'
			}).then(function () {
				//If sure, then delete from database
				$scope.deleteFromRSSlist(idx);
			})

        
    }
	
	$scope.deleteFromRSSlist = function(idx) {
		$http({
            method: 'DELETE',
            url: $scope.URL + "rsslinks.php?name=" + $scope.list[idx].name
     
		  }).then(function successCallback(response) {
			  $scope.list.splice(idx,1);
				swal(
				'Entfernt!',
				'Link erfolgreich gelöscht.',
				'success'
			)
		}, function errorCallback(response) {
          swal("Fehler", "Link wurde nicht entfernt", "error");         
      });
		  

	}

	$scope.addNewRss = function() {
		swal({
			title: 'Neue RSS-Quelle',
			type: 'info',
			html:
				'<div class="form-group">'+
				'<label for="rssName" style="float: left;">Name:</label>'+
			'<input type="text" class="form-control" id="rssName">'+
			'</div>'+
			'<div class="form-group">'+
			'<label for="rssLink" style="float: left;">Link:</label>'+
			'<input type="text" class="form-control" id="rssLink">'+
			'</div>',
			//showCloseButton: true,
			showCancelButton: true,
			confirmButtonColor: '#777',
			cancelButtonColor: '#FF5252',
		}).then(function () {
				//If sure, then delete from database
				var name = document.getElementById('rssName').value;
				var link = document.getElementById('rssLink').value;
				$scope.addToRSSlist(name, link);
			}, function() {

            })

	}
	$scope.addToRSSlist = function(name, link) {
		$http({
            method: 'POST',
            url: $scope.URL + "rsslinks.php?name=" + name + "&link=" + link
     
		  }).then(function successCallback(response) {
			  //$scope.list.splice(idx,1);
			  $scope.list.splice(0, 0, {"name": name, "rsslink": link});
				swal(
				'Hinzugefügt!',
				'Link erfolgreich hinzugefügt.',
				'success'
			)
		}, function errorCallback(response) {
          swal("Fehler", "Link wurde nicht hinzugefügt", "error");         
      });
	}
	
	
  


});
