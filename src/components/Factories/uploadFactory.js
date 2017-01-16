angular.module("sc-upload", [])
.factory('uploadFactory', function(scData, scUtil, Upload) {
  var data = [];

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
            case 'xlsx':
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
    
    var getFileTypeIconByName = function(name) {
        var type = getFileTypeByName(name);
        var pathToIcons ="/src/res/images/icons/";
        switch (type) {
            case 0: return pathToIcons + "txt.png"; break;
            case 1: return pathToIcons + "txt.png"; break;
            case 2: return pathToIcons + "pdf.png"; break;
            case 3: return pathToIcons + "xlsx.png"; break;
            case 4: return pathToIcons + "doc.png"; break;
            case 5: return pathToIcons + "pptx.png"; break;
        }
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
    var uploadFile = function(file, callback, errorCallback, progressCallback) {
        //angular.forEach(files, function(file) {
        file.attributes = [];
        file.attributes.fileType = 2

        scData.File
            .save({
                //file: file,
                name: file.name,
                summary: "Eine Zusammenfassung",
                sourceURL: "abc",
                entity: {
                    id: "1p2u7e7yyml5h",
                    attributes: { 
                        fileType: 1, 
                    sourceURL: "abc", 
                    Author: "Thats me"
                    }
                },
                attributes: { 
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
                        errorCallback(file);
                        errorCallback(file, "response.status: " + response.status + ": response.data: " + response.data);
                        /*if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                            errorCallback(file);*/
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                        if(file.progress == 100) {
                            callback(file, file.progress);
                        } else {
                            progressCallback(file, file.progress, evt.loaded);
                        }
                            

                    });
                


            }, function(reason) {
                var errorMessage = "Eine Datei mit dieser Bezeichnung existiert bereits!"
                errorCallback(file, errorMessage);
            })
    }
 


    return {
    uploadFile: uploadFile,
    getFileTypeIconByName: getFileTypeIconByName
  };
}); 