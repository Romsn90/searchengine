$.getScript('/src/lib/dropzone/dropzone.min.js',function(){

  angular.module('dropZone', [])
  .controller('dropZoneCtrl',[
        function(scope){
            var ctrl = this;
            ctrl.data = { upload:[] }  // <= upload data get pushed here 
        }
    ])
    
  .directive('dropZone', function(uploadFactory, scUtil, scData) {
    
    
    return function(scope, element, attrs) {
      scope.files = [];
      scope.createdId = 0;
      element.dropzone({ 
        //url: "/upload",
        uploadMultiple: true,
        autoProcessQueue : false,
        //addRemoveLinks : true,
        init: function() {

    
            var myDropzone = this;
            
            myDropzone.on("addedfile", function(file) {
                uploadFactory.uploadFile(file, myDropzone.uploadSuccess, myDropzone.uploadFail, myDropzone.setProgress);
                file.previewElement.children[1].style.opacity = "100"; 
                var icon = uploadFactory.getFileTypeIconByName(file.name);
                myDropzone.emit("thumbnail", file, icon);
                /*if (!file.type.match(/image.* /)) {
                    if(file.type.match(/application.zip/)){
                        myDropzone.emit("thumbnail", file, "/src/res/images/icons/pdf.png");
                    } else {
                        myDropzone.emit("thumbnail", file, "/src/res/images/icons/pdf.png");
                    }
                }*/
            });
  
            
            myDropzone.uploadSuccess = function(file, progress) {
                myDropzone.emit("complete", file);
            }  
            
            myDropzone.uploadFail = function(file, errorMessage) {
                file.previewElement.children[1].style["display"] = "inline";
                file.previewElement.children[1].style["background-color"] = "#ee1e2d";
                myDropzone.emit("error", file, errorMessage, null);
            }  
            
            myDropzone.on('success', function(file, json) {
                myDropzone.emit("processing", file);
                //file.previewElement.children[1].style.opacity = "100"; 
                file.previewElement.children[1].style["background-color"] = "#8cc657";
                myDropzone.emit("totaluploadprogress", 100, file.size, file.size);
            });
            
            myDropzone.setProgress = function(file, progress, bytesSent) {
                myDropzone.emit("uploadprogress", file, progress, bytesSent);
            }
            myDropzone.on("complete", function(file) {
                var json = [];
                myDropzone.emit("success", file, json);
                //myDropzone.removeFile(file);
                
            });
        }
        
      });
     
      
     
      
      
    }
  });
  
    
});

$(document).ready(function() {});


