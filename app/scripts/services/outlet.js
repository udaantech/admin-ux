'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Outlet
 * @description
 * # Outlet
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Outlet', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    
    return {
        getOutletList: function() {
            return $http.get(endpoint+'outlets', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createOutlet: function(outletData) {
        	return $http.post(endpoint+'outlets/create', outletData, {
        		headers:{ 'x-access-token': SessionService.getSessionUser().token }
        	});
        },
        viewOutletById: function(outletId) {
            return $http.get(endpoint+'outlets/view/'+outletId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateOutlet: function(outletId, outletData) {
            return $http.put(endpoint+'outlets/update/'+outletId, outletData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        deleteOutlet: function(outletId) {
            return $http.delete(endpoint+'outlets/delete/'+outletId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
}]);