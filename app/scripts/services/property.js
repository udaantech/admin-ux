'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Property
 * @description
 * # Property
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Property', ['$http', 'endpoint', function($http, endpoint) {
    return {
        getPropertyList: function() {
            return $http.get(endpoint+'property/index');
        }
    };
  }]);
