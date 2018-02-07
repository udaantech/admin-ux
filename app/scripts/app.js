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
        'oitozero.ngSweetAlert',
        'datatables'
    ])
    .constant({
        'endpoint': 'http://projects.udaantechnologies.com:3000/'
    })
    .filter('capitalizeWord', function() {
        return function(text) {
            return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
        }
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
            .when('/createproperty', {
               templateUrl: 'views/property/add-property.html',
                controller: 'PropertyCtrl'
            })
            .when('/viewproperty/:id', {
                templateUrl: 'views/property/view-property.html',
                controller: 'PropertyCtrl'
            })
            .when('/editproperty/:id', {
                templateUrl: 'views/property/edit-property.html',
                controller: 'PropertyCtrl'
            })
            .when('/departmentlist', {
                templateUrl: 'views/department/department-list.html',
                controller: 'DepartmentCtrl'
            })
            .when('/createdepartment', {
                templateUrl: 'views/department/add-department.html',
                controller: 'DepartmentCtrl'
            })
            .when('/viewdepartment/:id', {
                templateUrl: 'views/department/view-department.html',
                controller: 'DepartmentCtrl'
            })
            .when('/editdepartment/:id', {
                templateUrl: 'views/department/edit-department.html',
                controller: 'DepartmentCtrl'
            })
            .when('/outletlist', {
                templateUrl: 'views/outlet/outlet-list.html',
                controller: 'OutletCtrl'
            })
            .when('/createoutlet', {
                templateUrl: 'views/outlet/add-outlet.html',
                controller: 'OutletCtrl'
            })
            .when('/viewoutlet/:id', {
                templateUrl: 'views/outlet/view-outlet.html',
                controller: 'OutletCtrl'
            })
            .when('/editoutlet/:id', {
                templateUrl: 'views/outlet/edit-outlet.html',
                controller: 'OutletCtrl'
            })
            .when('/outlettypelist', {
                templateUrl: 'views/outletType/outletType-list.html',
                controller: 'OutletTypeCtrl'
            })
            .when('/createoutlettype', {
                templateUrl: 'views/outletType/add-outletType.html',
                controller: 'OutletTypeCtrl'
            })
            .when('/viewoutlettype/:id', {
                templateUrl: 'views/outletType/view-outletType.html',
                controller: 'OutletTypeCtrl'
            })
            .when('/editoutlettype/:id', {
                templateUrl: 'views/outletType/edit-outletType.html',
                controller: 'OutletTypeCtrl'
            })
            .when('/guestlist', {
                templateUrl: 'views/guest/guest-list.html',
                controller: 'GuestCtrl'
            })
            .when('/createguest', {
                templateUrl: 'views/guest/add-guest.html',
                controller: 'GuestCtrl'
            })
            .when('/viewguest/:id', {
                templateUrl: 'views/guest/view-guest.html',
                controller: 'GuestCtrl'
            })
            .when('/editguest/:id', {
                templateUrl: 'views/guest/edit-guest.html',
                controller: 'GuestCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
