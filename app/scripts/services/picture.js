'use strict';
/**
 * @ngdoc service
 * @name ladakApp.Picture
 * @description
 * # Picture
 * Factory in the ladakApp.
 */
 angular.module('ladakApp')
 	.factory('Picture', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
 		return {
 			getPictureList: function() {
 				return $http.get(endpoint+'pictures', {
 					headers:{ 'x-access-token':  SessionService.getSessionUser().token }
 				});
 			},
 			createPicture: function(pictureData) { 
 				return $http.post(endpoint+'pictures/create', pictureData, {
 					transformRequest: angular.identity,
 					headers:{ 'Content-Type': undefined, 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			viewPictureById: function(pictureId) {
 				return $http.get(endpoint+'pictures/view/'+pictureId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			updatePicture: function(pictureId, pictureData) {
 				return $http.put(endpoint+'pictures/update/'+pictureId, pictureData, {
 					headers: { 'Content-Type': undefined, 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			deletePicture: function(pictureId) {
 				return $http.delete(endpoint+'pictures/delete/'+pictureId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			}
 		};
 	}]);