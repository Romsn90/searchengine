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
    FACEBOOK: 2,
    TWITTER: 3
  }

  //Filter Variables for Results.html
  var fileType = {
      "DEFAULT": 0,
      "TXT": 1,
      "PDF": 2,
      "EXCEL": 3,
      "WORD": 4,
      "POWERPOINT": 5
  }

  



  var searchFilter = function(item, filterVal) {
    if(filterVal.on == false) {
      return item;
    } else {
     
      var filter = [];
        //for(var res = 0; res < item.length; res++) {
          var infoSource = getAttributeValue("Information Source", item);
          if(filterVal.documents && infoSource == informationSource.INTERNAL_DOCUMENT) {
            return item;
          } else if(filterVal.newsfeeds && infoSource == informationSource.RSS){
            return item;
          } else if(filterVal.socialNetworks && infoSource == informationSource.SOCIAL_NETWORK) {
            return item;
          } else if(filterVal.patents && infoSource == informationSource.PATENT) {
            return item;
          } else if(filterVal.creationDate) {
            var ItemcreatedAt = new Date(item.createdAt);
            var filterDate = filterVal.creationDate.split(".");
            filterDate = filterDate[2] + "-" + filterDate[1] + "-" + filterDate[0] + "T00:00:00";
            var filterCreationDate = new Date(filterDate);
            if(ItemcreatedAt > filterCreationDate) {
              return item;
            }
          } 

        //}
          
          return ;
    }
  }

  var getAttributeValue = function(name, item) {
      var attr = item.attributes;
      for(var i = 0; i < attr.length; i++) {
          if(attr[i].name == name) {
              return attr[i].values[0];
          }
      }
      return null;
  }



  var filterResults = function(items, filterVal) {
    if(filterVal == "all") {
      
      return items;
    } else if(filterVal == "pdf" || filterVal == "word"|| filterVal == "excel" || filterVal == "txt"){

      var filter = [];
        for(var res = 0; res < items.length; res++) {
          var type = getAttributeValue("fileType", items[res]); 
            if(type == fileType[filterVal.toUpperCase()]) {
              filter.push(items[res]);
            }
          }
          
          return filter;
    } else if(filterVal == "rss" || filterVal == "facebook"|| filterVal == "twitter"){

      var filter = [];
        for(var res = 0; res < items.length; res++) {
          var informationSourceVal = getAttributeValue("Information Source", items[res]); 
          var a = informationSource[filterVal.toUpperCase()];
            if(informationSourceVal == informationSource[filterVal.toUpperCase()]) {
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