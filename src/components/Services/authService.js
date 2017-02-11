angular.module("sc-auth", [])
.service('authService', function(scAuth) {

    var USER_LOGIN = "";
    var USER_PASSWORD = "";

    var authentication = function(scCallback) {
        scAuth.login(USER_LOGIN, USER_PASSWORD, scCallback, scError);
    }

    var scError = function(err) {
        swal("Fehler", "authentication error", "error");  
    }
  
    return {
        authentication: authentication
    };

}); 
