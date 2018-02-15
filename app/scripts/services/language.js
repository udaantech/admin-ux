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
        createLanguage: function(languageData) {
			return $http.post(endpoint+'languages/create', languageData, {
				headers:{'x-access-token': SessionService.getSessionUser().token }
			});
		},
		viewLanguageById: function(languageId) {
			return $http.get(endpoint+'languages/view/'+languageId, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		},
		updateLanguage: function(languageId, languageData) {
			return $http.put(endpoint+'languages/update/'+languageId, languageData, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		},
		deleteLanguage: function(languageId) {
			return $http.delete(endpoint+'languages/delete/'+languageId, {
				headers: { 'x-access-token': SessionService.getSessionUser().token }
			});
		}
    
    };
  }]);
