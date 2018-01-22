'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Property
 * @description
 * # Property
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Property', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getPropertyList: function() {
            return $http.get(endpoint+'property/index', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createProperty: function(propertyData) {
        	return $http.post(endpoint+'property/create', propertyData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewPropertyById: function(propertyId) {
            return $http.get(endpoint+'property/view/'+propertyId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateProperty: function(propertyId, propertyData) {
            return $http.put(endpoint+'property/update/'+propertyId, propertyData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        deleteProperty: function(propertyId) {
            return $http.delete(endpoint+'property/delete/'+propertyId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
  }]);
