'use strict';
/**
 * @ngdoc service
 * @name ladakApp.Tag
 * @description
 * # Tag
 * Factory in the ladakApp.
 */
 angular.module('ladakApp')
 	.factory('Tag', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
 		return {
 			getTagList: function() {
 				return $http.get(endpoint+'tags', {
 					headers:{ 'x-access-token':  SessionService.getSessionUser().token }
 				});
 			},
 			createTag: function(tagData) {
 				return $http.post(endpoint+'tags/create', tagData, {
 					headers:{'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			viewTagById: function(tagId) {
 				return $http.get(endpoint+'tags/view/'+tagId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			updateTag: function(tagId, tagData) {
 				return $http.put(endpoint+'tags/update/'+tagId, tagData, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			deleteTag: function(tagId) {
 				return $http.delete(endpoint+'tags/delete/'+tagId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			}
 		};
 	}]);