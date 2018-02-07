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
       
    };
  }]);
