'use strict';

/**
 * @ngdoc service
 * @name ladakApp.User
 * @description
 * # User
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
  .factory('User', ['$http', 'endpoint','SessionService', function($http, endpoint, SessionService) {

    return {
        getLogin: function(userData) {
            return $http.post(endpoint+'users/login', userData);
        },
        forgotPassword: function(userData) {
            return $http.post(endpoint+'users/forgot', userData);
        },
        registerUser: function(userData) {
            return $http.post(endpoint+'users/register', userData);
        },
        resetPassword: function(userData) {
            return $http.post(endpoint+'users/changepassword/'+userData.id, userData);
        },
        getUserList: function() {
            return $http.get(endpoint+'users/index', {
                 headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        createUser: function(userData) {
            return $http.post(endpoint+'users/create', userData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        viewUserById: function(userId) {
            return $http.get(endpoint+'users/view/'+userId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        updateUser: function(userId, userData) {
            return $http.put(endpoint+'users/update/'+userId, userData, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        },
        deleteUser: function(userId) {
            return $http.delete(endpoint+'users/delete/'+userId, {
                headers:{ 'x-access-token':  SessionService.getSessionUser().token }
            });
        }
    };
  }]);


