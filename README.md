# searchengine
TODO

### Attention
`/dist/sc-angular.js` was changed: 'scUtil' and 'scSearch' added! 


The module exposes angular services: `scData`, `scModel`, `scMxl`, `scAuth`, `scUtil`.


#### Authentication
    Set your SocioCortex-User-Data for the function authentication() in the searchService.js
   
    
#### Search Functions
    
    The services scSearch.hints() or scData.Entity.getFiles() can be used
    
    ```javascript
    scSearch.hints(searchFilter, searchService.searchSuccessful, searchService.searchError);
      //scData.Entity.getFiles({id: entityID}, searchService.getFilesSuccessful, searchService.getFilesError);
    ```
