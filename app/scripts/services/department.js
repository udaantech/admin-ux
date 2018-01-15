'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Department
 * @description
 * # Department
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Department', ['$http', 'endpoint', function($http, endpoint) {
    return {
        getDepartmentList: function() {
            return $http.get(endpoint+'department/index');
        }
    };
  }]);
