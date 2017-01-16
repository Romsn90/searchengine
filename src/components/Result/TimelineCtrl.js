angular.module('searchEngine')

.controller('TimelineCtrl', function($scope, searchFactory, $rootScope) {
	
	 $scope.timeline = null;
   $scope.items = null;
   
   
   $scope.getItems = function() {
     var results = searchFactory.getResults();
     var items = [];
     for(var i = 0; i < results.length; i++) {
       items.push({id: results[i].id, content: results[i].name, start: '2017-01-01'});//results[i].creationDate})
     }
     
     return items;
   }
   
   
  $scope.loadTimeChart = function() {
      // DOM element where the Timeline will be attached
      $scope.container = document.getElementById('visualization');
      var items = $scope.getItems();
      // Create a DataSet (allows two way data-binding)
      $scope.items = new vis.DataSet(items);
    
      // Configuration for the Timeline
      $scope.options = {
        min: '2013-03-14',
        max:'2017-02-15',
        clickToUse: true
        /*height: '50px',
        autoResize: false*/
      };
    
      // Create a Timeline
      $scope.timeline = new vis.Timeline($scope.container, $scope.items, $scope.options);
      
      $scope.timeline.on('click', function (properties) {
        $rootScope.$broadcast('timelineModal', properties.item);
      });
      
  }
  
  $scope.$on('updateTimeline', function (event, id) {
    var items = $scope.getItems();
    $scope.items.clear();
    $scope.items.update(items);
  })
  
  


  
});