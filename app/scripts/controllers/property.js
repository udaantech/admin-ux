'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:PropertyCtrl
 * @description
 * # PropertyCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('PropertyCtrl', ['Property', 'SessionService', '$location', '$scope', '$rootScope', '$routeParams', 'SweetAlert', function(Property, SessionService, $location, $scope, $rootScope, $routeParams, SweetAlert) {
        if(SessionService.isAuthenticated() == false) {
            $location.path('/');
        }

        $scope.PropertyList = function() {
            Property.getPropertyList().then(
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
