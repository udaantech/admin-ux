'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Roles
 * @description
 * # Roles
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Roles', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getRolesList: function() {
            return $http.get(endpoint+'roles/index', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createRole: function(roleData) {
            return $http.post(endpoint+'roles/create', roleData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewRoleById: function(roleId) {
            return $http.get(endpoint+'roles/view/'+roleId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateRole: function(roleId, roleData) {
            return $http.put(endpoint+'roles/update/'+roleId, roleData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            })
        },
        deleteRole: function(roleId) {
            return $http.delete(endpoint+'roles/delete/'+roleId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
  }]);
