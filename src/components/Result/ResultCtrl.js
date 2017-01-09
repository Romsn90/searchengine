angular.module('searchEngine')

.controller('ResultCtrl', function($scope, $http, $rootScope, searchFactory) {

//will be shown in Modal
$scope.selectedResult = {
       id : null,
       name: null,
       source: null,
       sourceURL: null,
       creationDate:null
};
  
 /*$rootScope.$on("CallParentMethod", function(){
           $scope.getResults();
           $scope.getKeyWords();
  });*/
  
  $scope.keyWords = null;
  $scope.allResults = null;
  $scope.shownResults = null;
  
  $scope.clickSearch = function(keywords) {
      if(keywords) {
          searchFactory.search(keywords,null,  $scope.getAll);
          //$scope.getAll();
      } else {
        swal("Error", "No Keywords entered!", "error");
      }
      
     
    }
  
  
  $scope.getKeyWords = function() {
      $scope.keyWords = searchFactory.getKeyWords(); 
  }
  
  $scope.getResults = function() {
      $scope.allResults = searchFactory.getResults(); 
      //alert(JSON.stringify( $scope.allResults));
      $scope.shownResults = $scope.allResults;
  }
  
  
  

  $scope.getAll = function() {
    $scope.getResults();
    $scope.getKeyWords();
  }
  
  $scope.getAll();
  
  //select Result for Modal
  $scope.selectResult = function(result) {
      $scope.selectedResult = result;
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