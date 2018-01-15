'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
  .controller('DashboardCtrl', ['Dashboard', 'SessionService', '$location', '$scope','SweetAlert', function(Dashboard, SessionService, $location, $scope, SweetAlert) {
    if(SessionService.isAuthenticated() == true) {
        $scope.currentUser = SessionService.getSessionUser();
    
    }
  }]);
