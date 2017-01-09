angular.module("sc-search", [])
.factory('searchFactory', function(scAuth, scSearch, scData, $location) {

   
   var searchResults = [];
   var keyWords = null;
   var filter = null;
   var USER_LOGIN = "roman.pass@tum.de";
   var USER_PASSWORD = "13xmypvzxt4uy";
   var WORKSPACE_NAME = "BMC CA Copy"
   var finalCallbackFunction = null;
    var search = function(keywords, filter, callback) {
        setKeyWords(keywords);
        setSearchFilter(filter);
        if(callback) {
          finalCallbackFunction = callback;
        }
        authentication();
    }
    
    var setSearchFilter = function(fil) {
		filter = fil;
	}
    
    var setResults = function(results) {
		searchResults = results;
	}	
	
	var getResults = function() {
		return searchResults;
	}
	
	var setKeyWords = function(keyW) {
		keyWords = keyW;
	}	
	
	var getKeyWords = function() {
		return keyWords;
	}

	var authentication = function() {
      scAuth.login(USER_LOGIN, USER_PASSWORD, scCallback, scError);
      //$scope.scCallback("a");
    }
    
    var getFilesSuccessful = function(res) {
      alert("File-Results: " + JSON.stringify(res));
      setResults(res);
        $location.path( "/results");
       
    }
    
    var getFilesError = function(err) {
      alert(JSON.stringify(err));
    }
    
    var searchSuccessful = function(res) {
      alert("Search-Results: " + JSON.stringify(res));
      setResults(res.hints);
        $location.path( "/results");
        finalCallbackFunction();
    }
    
    var searchError = function(err) {
      alert(JSON.stringify(err));
    }
    

    var workSpaceSuccessful = function(result) {
      alert(JSON.stringify(result));
      var entityID = result.rootEntity["id"];
      alert("result.id: " + result.id + " & entityID: " +entityID);
      var workspaceID = result.id;
      var searchText = getKeyWords(); //disambiguation: "BMW CA Copy"
      var searchFilter = {text: searchText, /*workspace: workspaceID,*/ /*hasAttributeValues:{ 'disambiguation': WORKSPACE_NAME },*/ /*n:1,*/ /*entityType: entityID,*/ resourceType: "files"};

      scSearch.hints(searchFilter, searchSuccessful, searchError);
      //scData.Entity.getFiles(searchFilter, getFilesSuccessful, getFilesError);
      //scSearch.results(searchFilter, searchSuccessful, searchError);
    }
    
    var workSpaceError = function(err) {
      alert(JSON.stringify(err));
    }
    
    var getWorkSpaceId = function(res) {
        
        for(var i = 0; i < res.length; i++) {
            if (res[i].name == WORKSPACE_NAME) {
                return res[i].id;
            }
        }
        return null;
    }
    
    var allWorkspaceSuccess = function(res){
        var workspaceID = getWorkSpaceId(res);
        alert(workspaceID);
        scData.Workspace.get({id: workspaceID}, workSpaceSuccessful, workSpaceError);   
    }
    
    var allWorkspaceFail = function(res){
        alert(JSON.stringify(res));
    }
    
    var scCallback = function(res) {
      scData.Workspace.query(allWorkspaceSuccess, allWorkspaceFail);
      //var userMe = scAuth.getUser("me");
      //console.log(userMe);
      //var workspaceID = "zykxgbvtdql4";   //BMW CA
      //var workspaceID = "1xsvp2v898lai";   //BMW CA Copy
      //var workspaceID = "107yhdgc7q9u6";   //Northwind
      //scData.Workspace.get({id: workspaceID}, workSpaceSuccessful, workSpaceError);  
    }
    
    var scError = function(err) {
      alert("no");
    }
   
   return {
      search: search,
      getKeyWords: getKeyWords,
      getResults: getResults
    };

}); 