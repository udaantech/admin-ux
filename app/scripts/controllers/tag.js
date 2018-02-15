'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:TagCtrl
 * @description
 * # TagCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('TagCtrl', ['Tag', 'Category', 'Entity', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert','$window',  function(Tag, Category, Entity, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert, $window) {
        
        function categoryList() {
            if(SessionService.isAuthenticated() == true) {
                Category.getCategoryList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.categorylistData = response.data.result;
                        }
                    },
                    function(err) {
                        if(err.status == -1) {
                            SweetAlert.swal("Error", "Server not found" + ":(", "error");
                        }
                    });
            } 
        }

        categoryList();

        $scope.tagList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Tag.getTagList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.taglist = response.data.result;
                        } 
                    }, 
                    function(err) {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createTag = function(tag) {
            if(SessionService.isAuthenticated() == true) {
                tag.createdBy = SessionService.getSessionUser().result._id;
                Tag.createTag(tag).then(
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
