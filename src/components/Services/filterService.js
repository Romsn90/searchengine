angular.module("sc-filter", [])
.service('filterService', function() {

/*
$scope.settings = {
       on : false,
       newsfeeds: false,
       //patents: false,
       socialNetworks: false,
       documents:false
     };
*/ 

  //Filter Variables for Search.html
  var informationSource = {
    INTERNAL_DOCUMENT: 0,
    RSS: 1,
    SOCIAL_NETWORK: 2,
    PATENT: 3
  }

  //Filter Variables for Results.html
  var fileType = {
      DEFAULT: 0,
      TXT: 1,
      PDF: 2,
      EXCEL: 3,
      WORD: 4,
      POWERPOINT: 5
  }
  


  
  //Filter
  var searchFilter = function(items, filterVal) {
    if(filterVal.on == false) {
      return items;
    } else {
      alert("filter might not work! " + JSON.stringify(filterVal));
      var filter = [];
        for(var res = 0; res < items.length; res++) {
          if(items.documents && items[res]["Information Source"] == informationSource.INTERNAL_DOCUMENT) {
            filter.push(items[res]);
          } else if(items.newsfeeds && items[res]["Information Source"] == informationSource.RSS){
            filter.push(items[res]);
          } else if(items.socialNetworks && items[res]["Information Source"] == informationSource.SOCIAL_NETWORK) {
            filter.push(items[res]);
          } else if(items.patents && items[res]["Information Source"] == informationSource.PATENT) {
            filter.push(items[res]);
          } 
        }
          
          return filter;
    }
  }



  var filterResults = function(items, filterVal) {
    //return items;
    if(filterVal == "all") {
      alert("FILTER");
      return items;
    } else {
      var filter = [];
        for(var res = 0; res < items.length; res++) {
              if(items[res].fileType == filterVal) {
                  filter.push(items[res]);
              }
          }
          
          return filter;
    }
  }
  
  return {
    searchFilter: searchFilter,
    filterResults: filterResults
  };

}); 