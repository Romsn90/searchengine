(function() {

    var searchService = {};
    searchService.searchResults = [];
	searchService.keyWords = null;
	
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

    document.searchService = searchService;
	
})();