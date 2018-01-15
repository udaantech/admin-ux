'use strict';

/**
 * @ngdoc overview
 * @name ladakApp
 * @description
 * # ladakApp
 *
 * Main module of the application.
 */
angular
    .module('ladakApp', [
        'ngAnimate',
        // 'ngStorage',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule',
        'oitozero.ngSweetAlert'
    ])
    .constant({
        'endpoint': 'http://projects.udaantechnologies.com:3000/'
    })
    .config(function($routeProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/login.html',
                controller: 'UserCtrl'
            })
            .when('/resetpassword/:id', {
                templateUrl: 'views/user/reset-password.html',
                controller: 'UserCtrl',
            })
            .when('/register', {
                templateUrl: 'views/user/register.html',
                controller: 'UserCtrl'
            })
            .when('/userlist', {
                templateUrl: 'views/user/users-list.html',
                controller: 'UserCtrl'
            })
            .when('/createuser', {
                templateUrl: 'views/user/add-user.html',
                controller: 'UserCtrl'
            })
            .when('/viewuser/:id', {
                templateUrl: 'views/user/view-user.html',
                controller: 'UserCtrl'
            })
            .when('/edituser/:id', {
                templateUrl: 'views/user/edit-user.html',
                controller: 'UserCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/roleslist', {
                templateUrl: 'views/roles/roles-list.html',
                controller: 'RoleCtrl'
            })
             .when('/createrole', {
                templateUrl: 'views/roles/add-role.html',
                controller: 'RoleCtrl'
            })
            .when('/viewrole/:id', {
                templateUrl: 'views/roles/view-role.html',
                controller: 'RoleCtrl'
            })
            .when('/editrole/:id', {
                templateUrl: 'views/roles/edit-role.html',
                controller: 'RoleCtrl'
            })
            .when('/propertylist', {
                templateUrl: 'views/property/property-list.html',
                controller: 'PropertyCtrl'
            })
            .when('/departmentlist', {
                templateUrl: 'views/department/department-list.html',
                controller: 'DepartmentCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
