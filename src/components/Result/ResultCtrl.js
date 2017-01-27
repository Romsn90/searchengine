angular.module('searchEngine')

.controller('ResultCtrl', function($scope, $http, $rootScope, searchFactory, filterService) {

//will be shown in Modal
$scope.selectedResult = {
       id : null,
       name: null,
       source: null,
       sourceURL: null,
       createdAt: null,
       lastModified: null,
       downloadLink: null,
       summary: null,
       entity: null
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
      $scope.shownResults = null;
      $scope.allResults = searchFactory.getResults(); 
      if($scope.allResults != null) {
          $scope.shownResults = $scope.allResults;
      } 
      
      //alert("File-Results: " + JSON.stringify($scope.allResults));
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
      $scope.selectedResult.sourceURL = $scope.getAttributeValue("sourceURL", result);
      $scope.selectedResult.informationSource = $scope.getIformationSourceText($scope.getAttributeValue("Information Source", result));
      $scope.selectedResult.downloadLink = "https://server.sociocortex.com/file/" + $scope.selectedResult.id;
  }

  $scope.getAttributeValue = function(name, result) {
      var attr = result.attributes;
      for(var i = 0; i < attr.length; i++) {
          if(attr[i].name == name) {
              return attr[i].values[0];
          }
      }
      return null;
  }

  $scope.getIformationSourceText = function(sourceId) {
      var sourcetext = null;
      switch(sourceId) {
          case 0: sourcetext = "Internes Dokument"; break;
          case 1: sourcetext = "RSS - Newsfeed"; break;
          case 2: sourcetext = "Facebook"; break;
          case 3: sourcetext = "Twitter"; break;
      }
      return sourcetext;
  }
  

  $('.filterBtn').on('click', function(){
      var filterVal = $(this).find('input').attr('filter');
      $scope.shownResults = filterService.filterResults($scope.allResults, filterVal);
      $scope.$apply();
  });
  


});