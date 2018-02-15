'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Contact
 * @description
 * # Contact
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Contact', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getContactList: function() {
            return $http.get(endpoint+'contacts/index', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createContact: function(contactData) {
			return $http.post(endpoint+'contacts/create', contactData, {
				headers:{'x-access-token': SessionService.getSessionUser().token }
			});
		},
		viewContactById: function(contactId) {
			return $http.get(endpoint+'contacts/view/'+contactId, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		},
		updateContact: function(contactId, contactData) {
			return $http.put(endpoint+'contacts/update/'+contactId, contactData, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		},
		deleteContact: function(contactId) {
			return $http.delete(endpoint+'contacts/delete/'+contactId, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		}
       
    };
  }]);
