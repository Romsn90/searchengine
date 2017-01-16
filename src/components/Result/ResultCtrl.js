angular.module('searchEngine')

.controller('ResultCtrl', function($scope, $http, $rootScope, searchFactory) {

//will be shown in Modal
$scope.selectedResult = {
       id : null,
       name: null,
       source: null,
       sourceURL: null,
       creationDate: null,
       downloadLink: null
};
  
  $scope.$on('timelineModal', function (event, id) { 
    for(var i = 0; i < $scope.allResults.length; i++) {
      if($scope.allResults[i].id == id) {
        $scope.selectResult($scope.allResults[i]);
        $scope.$apply();
        $('#resultModal').modal('show');
        break;
      }
    }
    
  });

  
  $scope.keyWords = null;
  $scope.allResults = null;
  $scope.shownResults = null;
  
  $scope.clickSearch = function(keywords) {
      if(keywords) {
          var filterVal = {
              on: false
            }
          searchFactory.search(keywords,filterVal,  $scope.getAll);
      } else {
        swal("Error", "No Keywords entered!", "error");
      }
      
     
    }
  
  $scope.getKeyWords = function() {
      $scope.keyWords = searchFactory.getKeyWords(); 
  }
  
  $scope.getResults = function() {
      $scope.allResults = searchFactory.getResults(); 
      $scope.shownResults = $scope.allResults;
  }
  
  
  

  $scope.getAll = function() {
    $scope.getResults();
    $scope.getKeyWords();
    //$scope.updateTimeline();
 
        $rootScope.$broadcast('updateTimeline', null);
      
  }
  
  $scope.getAll();
  
  //select Result for Modal
  $scope.selectResult = function(result) {
      $scope.selectedResult = result;
      $scope.selectedResult.downloadLink = "https://server.sociocortex.com/file/" + $scope.selectedResult.id;
  }

  //Filter
  $scope.filter = function(filterVal) {
      if(filterVal == "all") {
          $scope.shownResults = $scope.allResults;
      } else {
            var filter = [];
            for(var res = 0; res < $scope.allResults['labels'].length; res++) {
                if($scope.allResults['labels'][res].source == filterVal) {
                    filter.push($scope.allResults['labels'][res]);
                }
            }
            
            $scope.shownResults = {'labels': filter};
      }
      $scope.$apply();      
  }

  $('.filterBtn').on('click', function(){
      var filterVal = $(this).find('input').attr('filter');
      $scope.filter(filterVal);
  });


});