angular.module("sc-auth", [])
.service('authService', function(scAuth) {

    var USER_LOGIN = "roman.pass@tum.de";
    var USER_PASSWORD = "8r19ada";

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