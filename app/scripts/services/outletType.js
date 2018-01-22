'use strict';

/**
 * @ngdoc service
 * @name ladakApp.OutletType
 * @description
 * # OutletType
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('OutletType', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getOutletTypeList: function() {
            return $http.get(endpoint+'outletTypes', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createOutletType: function(outletTypeData) {
            return $http.post(endpoint+'outletTypes/create', outletTypeData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewOutletTypeById: function(outletTypeId) {
            return $http.get(endpoint+'outletTypes/view/'+outletTypeId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateOutletType: function(outletTypeId, outletTypeData) {
            return $http.put(endpoint+'outletTypes/update/'+outletTypeId, outletTypeData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            })
        },
        deleteOutletType: function(outletTypeId) {
            return $http.delete(endpoint+'outletTypes/delete/'+outletTypeId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
  }]);
