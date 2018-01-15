'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:DepartmentCtrl
 * @description
 * # DepartmentCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('DepartmentCtrl', ['Department', 'SessionService', '$location', '$scope', '$rootScope', '$routeParams', 'SweetAlert', function(Department, SessionService, $location, $scope, $rootScope, $routeParams, SweetAlert) {
        if(SessionService.isAuthenticated() == false) {
            $location.path('/');
        }

        $scope.DepartmentList = function() {
            Department.getDepartmentList().then(
                function(response) {
                    if(response.data.status == "success") {
                        $scope.propertieslist = response.data.result;
                    }
                },
                function(err) {
                    //console.log('error', err);
                });
        }

        
    }]);
