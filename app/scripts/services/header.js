'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Header
 * @description
 * # Header
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Header', ['$http', 'endpoint', function($http, endpoint) {
    return {
        logoutUser: function(userData) {
            return $http.post(endpoint+'users/logout/', userData);
        }
    };
  }]);
