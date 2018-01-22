'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Department
 * @description
 * # Department
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Department', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getDepartmentList: function() {
            return $http.get(endpoint+'departments', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createDepartment: function(departmentData) {
            return $http.post(endpoint+'departments/create', departmentData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewDepartmentById: function(departmentId) {
            return $http.get(endpoint+'departments/view/'+departmentId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateDepartment: function(departmentId, departmentData) {
            return $http.put(endpoint+'departments/update/'+departmentId, departmentData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            })
        },
        deleteDepartment: function(departmentId) {
            return $http.delete(endpoint+'departments/delete/'+departmentId, {
                headers:{ 'x-access-token': SessionService.getSessionUser().token }
            });
        }
    };
  }]);
