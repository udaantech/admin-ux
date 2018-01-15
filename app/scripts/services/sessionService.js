'use strict';

/**
 * @ngdoc service
 * @name ladakApp.sessionService
 * @description
 * # sessionService
 * Factory in the ladakApp.
 */
angular.module('ladakApp')
    .factory('SessionService', ['localStorageService', '$cookies', function(localStorageService, $cookies) {
        return {
            isAuthenticated: function() {
                return this.getSessionUser() ? true : false;
            },
            setSessionUser: function(user) {
                if (!!user) {
                    localStorageService.set('sessionUser', user);
                    $cookies.put('JSESSIONID', user.sessionToken);
                }
            },
            getSessionUser: function() {
                return localStorageService.get('sessionUser');
            },
            destroySession: function() {
                localStorageService.remove('sessionUser');
                $cookies.remove('JSESSIONID');
            },
            setSession: function(key, value) {
                localStorageService.set(key, value);
            },
            evictSession: function(key) {
                localStorageService.remove(key);
            },
            getSessionValue: function() {
                localStorageService.get(key);
            }
        };
    }]);