angular.module('searchEngine')

.controller('TimelineCtrl', function($scope, searchFactory, $rootScope) {
	
	 $scope.timeline = null;
   $scope.items = null;
   
   
   $scope.getItems = function() {
     var results = searchFactory.getResults();
     var items = [];
     for(var i = 0; i < results.length; i++) {
        var createdAt=new Date(results[i].createdAt);
        createdAt = createdAt.getFullYear() + "-" + ('0' + (createdAt.getMonth() + 1)).slice(-2) + "-" + ('0' + (createdAt.getDate())).slice(-2);
       items.push({id: results[i].id, content: results[i].name, start: createdAt});
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
    $scope.items.clear();
    var items = $scope.getItems();
    $scope.items.update(items);
  })
  
  


  
});