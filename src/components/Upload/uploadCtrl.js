/*angular.module('app.controller.app',[])
    .controller('AppController',["uploadFactory",
        function(uploadFactory){
            var ctrl = this;
            ctrl.data = { upload:[] }  // <= upload data get pushed here 
            //ctrl.data = uploadFactory.getData();
        }
    ])



angular.module('app.directive.dropzone',[])
    .directive('dropZone',['uploadFactory',
        function(uploadFactory){
    
            
            var config = {
                template:'<label class="drop-zone">'+
                         '<input type="file" multiple accept="txt" />'+
                         '<div ng-transclude></div>'+       // <= transcluded stuff
                         '</label>',
                transclude:true,
                replace: true,
                require: '?ngModel',
                link: function(scope, element, attributes, ngModel){
                    var upload = element[0].querySelector('input');    
                        upload.addEventListener('dragover', uploadDragOver, false);
                        upload.addEventListener('drop', uploadFileSelect, false);
                        upload.addEventListener('change', uploadFileSelect, false);                
                        config.scope = scope;                
                        config.model = ngModel; 
                        config.model.$setViewValue([]);
                }
            }
            return config;


            // Helper functions
            function uploadDragOver(e) { e.stopPropagation(); e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }
            function uploadFileSelect(e) {
                console.log(this)
                e.stopPropagation();
                e.preventDefault();
                var files = e.dataTransfer ? e.dataTransfer.files: e.target.files;
                for (var i = 0, file; file = files[i]; ++i) {
                    console.log(file);
                    var reader = new FileReader();
                    reader.onload = (function(file) {
                        return function(e) { 
                            
                            // Data handling (just a basic example):
                            // [object File] produces an empty object on the model
                            // why we copy the properties to an object containing
                            // the Filereader base64 data from e.target.result
                            var data={
                                data:e.target.result,
                                dataSize: e.target.result.length
                            };
                            for(var p in file){ data[p] = file[p] }
                            alert(JSON.stringify(data));
      
                            uploadFactory.putFile(data);
                            config.scope.$apply(function(){ 
                                //ngModel.$viewValue.push(data);
                                config.model.$viewValue.push(data);
                            })



                        }
                    })(file);
                    reader.readAsDataURL(file);
                }
            }
        }
    ])*/






//http://www.bootply.com/9ScrFwGIzz

$.getScript('/src/lib/dropzone/dropzone.min.js',function(){

  angular.module('dropZone', [])
  .controller('dropZoneCtrl',[
        function(scope){
            var ctrl = this;
            ctrl.data = { upload:[] }  // <= upload data get pushed here 
           // ctrl.data = getData();
           ctrl.test = function() {
               alert("test");
           }
        }
    ])
  .directive('dropZone', function(uploadFactory, scUtil, scData) {
    
    
    return function(scope, element, attrs) {
      scope.files = [];
      scope.createdId = 0;
      element.dropzone({ 
        //url: "/upload",
        url: scUtil.getFullUrl('files/' + scope.createdId + '/content'),
        //url: "https://server.sociocortex.com/api/v1/workspaces/1xsvp2v898lai?file",
        method: "POST",
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 5,
        //headers: 'Origin, X-Requested-With, Content-Type',
        init: function() {

          //scope.files.push({file: 'added'}); // here works
          this.on('success', function(file, json) {
              alert("success");
          });

          this.on('error', function(fail) {
              //alert("fail: " + JSON.stringify(fail));
          });
          
          this.on('addedfile', function(file) {
            scope.$apply(function(){
              scope.files.push({file: 'added'});
            });
          });
          
          this.on('drop', function(file) {
              uploadFactory.uploadFile(file.dataTransfer.files, this.test);
          });
         this.test = function() {
             alert("hi callback");
         }  
        }
        
      });
     
      
     
      
      
    }
  });
  
    
});

$(document).ready(function() {});