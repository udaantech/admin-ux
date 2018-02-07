'use strict';

/**
 * @ngdoc service
 * @name ladakApp.Language
 * @description
 * # Language
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('Language', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
    return {
        getLanguageList: function() {
            return $http.get(endpoint+'languages', {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
       
    };
  }]);
