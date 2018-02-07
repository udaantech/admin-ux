'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Guest
 * @description
 * # Guest
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Guest', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getGuestList: function() {
            return $http.get(endpoint+'guest', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createGuest: function(guestData) {
        	return $http.post(endpoint+'guest/create', guestData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewGuestById: function(guestId) {
            return $http.get(endpoint+'guest/view/'+guestId, {
                headers:{ 'x-access-token': SessionService.getSessionUser().token }
            });
        },
        updateGuest: function(guestId, guestData) {
            return $http.put(endpoint+'guest/update/'+guestId, guestData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        deleteGuest: function(guestId) {
            return $http.delete(endpoint+'guest/delete/'+guestId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
  }]);
