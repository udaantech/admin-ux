'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Roles
 * @description
 * # Roles
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Roles', ['$http', 'endpoint', function($http, endpoint) {
    return {
        getRolesList: function() {
            return $http.get(endpoint+'roles/index');
        },
        createRole: function(roleData) {
            return $http.post(endpoint+'roles/create', roleData);
        },
        viewRoleById: function(roleId) {
            return $http.get(endpoint+'roles/view/'+roleId);
        },
        updateRole: function(roleId, roleData) {
            return $http.put(endpoint+'roles/update/'+roleId, roleData)
        },
        deleteRole: function(roleId) {
            return $http.delete(endpoint+'roles/delete/'+roleId);
        }
    };
  }]);
