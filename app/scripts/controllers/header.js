'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
  .controller('HeaderCtrl', ['Header', 'SessionService', '$location', '$scope', '$rootScope', '$timeout', 'SweetAlert', function(Header, SessionService, $location, $scope, $rootScope, $timeout, SweetAlert) {
    $rootScope.currentUser = SessionService.getSessionUser().result;
    if(SessionService.isAuthenticated() == true) {
        $rootScope.currentUser = SessionService.getSessionUser().result;
        
        $scope.logout = function(user) {
            SessionService.destroySession();
            SweetAlert.swal({ title: "Success!", text: "Logout Successfully", type: "success" }, function() {
                                $location.path('/');
                            });
            // Header.logoutUser(user).then(
            //      function(response) {
            //             if(response.data.status == "success") {
            //                  $scope.message = response.data.message;
            //                  //$location.path('/');
            //             }
            //      }, function(err) {
            //             $scope.message = err.data.message;
            //             //$location.path('/');
            //      });    
        }

        } else {
            $location.path('/');
        }
  }]);


