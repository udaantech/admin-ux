'use strict';
/**
 * @ngdoc service
 * @name ladakApp.Category
 * @description
 * # Category
 * Factory in the ladakApp.
 */
 angular.module('ladakApp')
 	.factory('Category', ['$http', 'endpoint', 'SessionService', function($http, endpoint, SessionService) {
 		return {
 			getCategoryList: function() {
 				return $http.get(endpoint+'categories', {
 					headers:{ 'x-access-token':  SessionService.getSessionUser().token }
 				});
 			},
 			createCategory: function(categoryData) {
 				return $http.post(endpoint+'categories/create', categoryData, {
 					headers:{'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			viewCategoryById: function(categoryId) {
 				return $http.get(endpoint+'categories/view/'+categoryId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			updateCategory: function(categoryId, categoryData) {
 				return $http.put(endpoint+'categories/update/'+categoryId, categoryData, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			},
 			deleteCategory: function(categoryId) {
 				return $http.delete(endpoint+'categories/delete/'+categoryId, {
 					headers: { 'x-access-token': SessionService.getSessionUser().token }
 				});
 			}
 		};
 	}]);