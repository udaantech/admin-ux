'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('CategoryCtrl', ['Category', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', '$window', function(Category, User, Entity, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert, $window) {
        
       $scope.categoryList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Category.getCategoryList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.categorylist = response.data.result;
                        } 
                    }, 
                    function(err) {
                        $rootScope.showLoader = false;
                        //SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createCategory = function(category) { console.log('fdfdf', category);
            if(SessionService.isAuthenticated() == true) {
                category.createdBy = SessionService.getSessionUser().result._id;
                Category.createCategory(category).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                 $window.location.reload();
                            });
                        } else {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    }, function(err) {
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        
    }]);
