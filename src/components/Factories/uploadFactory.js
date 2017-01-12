angular.module("sc-upload", [])
.factory('uploadFactory', function(scData, scUtil, Upload) {
  var data = [];


 /* var config = {
                template:'<label class="drop-zone">'+
                         '<input type="file" multiple accept="jpg" />'+
                         '<div ng-transclude></div>'+       // <= transcluded stuff
                         '</label>',
                transclude:true,
                replace: true,
                require: '?ngModel',
                link: function(scope, element, attributes, ngModel){
                    var upload = element[0].querySelector('input');    
                        upload.addEventListener('dragover', uploadDragOver, false);
                        upload.addEventListener('drop', uploadFactory.uploadFileSelect, false);
                        upload.addEventListener('change', uploadFileSelect, false);                
                        config.scope = scope;                
                        config.model = ngModel; 
                }
            }


  var putFile = function(daten) {
    data = daten;
  }

  var getData = function() {
    return data;
  }
  
  var uploadFileSelect = function uploadFileSelect(e) {
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
                            //alert(JSON.stringify(data));
      
                            putFile(data);
                            
                            /*$scope.$apply(function(){ 
                                config.model.$viewValue.push(data)
                            })*



                        }
                    })(file);
                    reader.readAsDataURL(file);
                }
  }
  return {
    putFile: putFile,
    getData: getData,
    uploadFileSelect: uploadFileSelect
  };*/
var getFileTypeByName = function(name) {
    var type = name.split(".")[1].toLowerCase();
    var typeValue = null;
    switch (type) {
            case 'txt':
                typeValue = 1;
                break;
            case 'pdf':
                typeValue = 2;
                break;
            case 'xls':
                typeValue = 3;
                break;
            case 'xlsm':
                typeValue = 3;
                break;
            case 'docx':
                typeValue = 4;
                break;
            case 'doc':
                typeValue = 4;
                break;
            case 'pptx':
                typeValue = 5;
                break;
            default:
                typeValue = 0;
        }
    return typeValue;
}

    var getFileType = function(file) {
        alert(file.type);
    }

    var getFileAttributes = function(file) {
        //getFileType(file);
        getFileTypeByName(file.name);
        //alert(file.name + ", " + JSON.stringify(file));
    }

    var fileUploadSuccess = function(a) {
        alert("success");
    }

    var fileUploadError = function(a) {
        alert("fileUploadError");
    }
    // Upload a file via the API
    var uploadFile = function(files, callback) {//, callback) {
        angular.forEach(files, function(file) {
        file.attributes = [];
        file.attributes.fileType = 2
        //getFileAttributes(file);
        //alert(JSON.stringify(file));
        scData.File
            .save({
                file: file,
                name: file.name,
                readers: "testReader",
                summary: "Eine Zusammenfassung",
                sourceURL: "abc",
                entity: {
                    id: "1p2u7e7yyml5h",
                },
                attributeDefinitions: { 
                    fileType: 1, 
                    sourceURL: "abc", 
                    Author: "Thats me"
                },
                fileType: 2
            })
            .$promise.then(function (createdFile) {
                
                    file.upload = Upload.upload({
                    url: scUtil.getFullUrl(scUtil.paths.files +"/" +  createdFile.id + '/content'),
                    data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * 
                                                evt.loaded / evt.total));
                        progress = file.progress;

                    });
                


            })

        })
    }
    var progress = 0;
    var getProgress = function() {
        return progress;
    }
    return {
    uploadFile: uploadFile,
    getProgress: getProgress
  };
}); 