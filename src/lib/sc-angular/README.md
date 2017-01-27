# sc-angular
TODO

### Usage
Download either `/dist/sc-angular.js` or `/dist/sc-angular.min.js` from this repository and link it in your `index.html`. You can also manage it with bower (`bower install sc-angular`).
After that, add the `sc-angular` module as a dependency to your application module:

```javascript
angular.module('myApp', ['sociocortex']);
```

The module exposes angular services: `scData`, `scModel`, `scMxl`, `scAuth`, `scUtil`.

(...)

#### Authentication
    
    scAuth.login("your username", "your password")

##### Examples

    scData.Workspace.query()
     .then(function (workspaces) {...]);

    scData.Entity.queryByEntityType({id: 'id of a type'})
     .then(function (entities) {...});
    
    scMxl
    .query({expression: "find Customer"})
    .then(function (result) {...});

### Build
    npm install
    npm install -g bower
    bower install
    npm install -g grunt
    npm install -g grunt-cli
    grunt

### Contributing
TODO
