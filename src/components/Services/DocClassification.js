angular.module("DocClassification", [])
.service('DocClassification', function($http) {

  var pipelineName = "CompetiCortex";
  var DocClassificationURL = "http://localhost:9000/"
  var moveToCorrectLabel = function(fileId) {
    var postData = {
      "pipelineName": pipelineName,
      "fileId": fileId
    }
    $http({
        method: 'POST',
        url: DocClassificationURL + "pipeline/predictAndClassify",
        data: postData,
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        
        swal("Error", "doc yes", "error");      
     
		    }, function errorCallback(response) {
          
          swal("Error", JSON.stringify(response), "error");         
	      });
  }
  
  
  
        
  return {
    moveToCorrectLabel: moveToCorrectLabel
  };

}); 