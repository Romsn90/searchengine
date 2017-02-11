# searchengine
COMPETI&bull;CORTEX is a searchengine, which was developed as a part of a master thesis.

With this engine it's possible to search for documents in a SocioCortex-Workspace.
Furthermore it's possible to drop files to SocioCortex.

Example: https://competicortex.sterotec.de


### SocioCortex
To run this application, first of all you have to sign in to SocioCortex and get access to a workspace:
https://server.sociocortex.com


###Work with COMPETI&bull;CORTEX
TODO


### Attention
`/src/lib/dist/sc-angular.js` was changed: 'scUtil' and 'scSearch' added! 
   
The module exposes angular services: `scData`, `scModel`, `scMxl`, `scAuth`, `scUtil`.


#### Authentication
    Set your SocioCortex-User-Data for authentication in the authService.js
   
    
#### Search Functions
Set `WORKSPACE_NAME` to get the results from your workspace only.
    
The services scSearch.hints() gets all hints for the searched keywords.
The hints-results don't contain metainformation. To get metainformation, 
the results are forwarded to `scData.File.get()`
    
    
    ```javascript
    scSearch.hints(searchFilter, searchService.searchSuccessful, searchService.searchError);
    
    ...
    
    scData.File.get({id: hints[i].id}, getFilesSuccessful, getFilesError);
    ```
