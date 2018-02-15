'use strict';
/**
 * @ngdoc service
 * @name ladakApp.Entity
 * @description
 * # Entity
 * Factory in the ladakApp.
 */
 angular.module('ladakApp')
 	.factory('Entity', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
 		return {
 			getEntityList: function() {
 				return $http.get(endpoint+'entities', {
 					headers:{ 'x-access-token':  SessionService.getSessionUser().token }
 				});
 			},
 			createEntity: function(entityData) {
 				return $http.post(endpoint+'entities/create',entityData, {
 					headers:{ 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			viewEntityById: function(entityId) {
 				return $http.get(endpoint+'entities/view/'+entityId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			updateEntity: function(entityId, entityData) {
 				return $http.put(endpoint+'entities/update/'+entityId, entityData, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			deleteEntity: function(entityId) {
 				return $http.delete(endpoint+'entities/delete/'+entityId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},

 			addEntityTag: function(entityTagData) {
 				return $http.post(endpoint+'entities/addentitytag', entityTagData, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			removeEntityTag: function(entityTagData) {
 				return $http.post(endpoint+'entities/removeentitytag', entityTagData, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			}
 		};
 	}]);