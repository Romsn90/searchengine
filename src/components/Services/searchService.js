(function() {
    
    
    var searchService = {};
    
    var USER_LOGIN = "";
    var USER_PASSWORD = "";
    
    
    searchService.searchResults = [];
	searchService.keyWords = null;
	
    var scAuth = null;
    var scData = null;
    var scSearch = null;
    var $location = null;
    
    searchService.initSearchService = function(Auth, Data, Search, loc) {
		scData = Data
		scAuth = Auth;
        scSearch = Search;
        $location = loc;
	}
    
	searchService.setResults = function(results) {
		
		searchService.searchResults = results;
	}	
	
	searchService.getResults = function() {
		
		return searchService.searchResults;
	}
	
	searchService.setKeyWords = function(keyWords) {
		
		searchService.keyWords = keyWords;
	}	
	
	searchService.getKeyWords = function() {
		
		return searchService.keyWords;
	}

	searchService.authentication = function() {
      scAuth.login(USER_LOGIN, USER_PASSWORD, searchService.scCallback, searchService.scError);
      //$scope.scCallback("a");
    }
    
    searchService.getFilesSuccessful = function(res) {
      alert("File-Results: " + JSON.stringify(res));
      searchService.setResults(res);
        $location.path( "/results");
    }
    
    searchService.getFilesError = function(err) {
      alert(JSON.stringify(err));
    }
    
    searchService.searchSuccessful = function(res) {
      alert("Search-Results: " + JSON.stringify(res));
      searchService.setResults(res.hints);
        $location.path( "/results");
    }
    
    searchService.searchError = function(err) {
      alert(JSON.stringify(err));
    }
    

    searchService.workSpaceSuccessful = function(result) {
      var entityID = result.rootEntity["id"];

      var workspaceID = "zykxgbvtdql4";
      var searchText = document.searchService.getKeyWords();
      var searchFilter = {"text": searchText, disambiguation: "BMW CA", workspace: workspaceID, entityType: entityID, resourceType: "entityTypes"};

      scSearch.hints(searchFilter, searchService.searchSuccessful, searchService.searchError);
      //scData.Entity.getFiles({id: entityID}, searchService.getFilesSuccessful, searchService.getFilesError);
    }
    
    searchService.workSpaceError = function(err) {
      alert(JSON.stringify(err));
    }
    
    
    
    searchService.scCallback = function(res) {
      var userMe = scAuth.getUser("me");
      console.log(userMe);
      var workspaceID = "zykxgbvtdql4";   //BMW CA
      //var workspaceID = "107yhdgc7q9u6";   //Northwind
      scData.Workspace.get({id: workspaceID}, searchService.workSpaceSuccessful, searchService.workSpaceError);  
    }
    
    searchService.scError = function(err) {
      alert("no");
    }

    document.searchService = searchService;
	
})();