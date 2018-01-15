'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Dashboard
 * @description
 * # Dashboard
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Dashboard', ['$http', 'endpoint', function($http, endpoint) {
    return {
        logoutUser: function(userData) {
            return $http.post(endpoint+'users/logout/', userData);
        }
    };
  }]);
