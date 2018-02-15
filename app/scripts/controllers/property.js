'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:PropertyCtrl
 * @description
 * # PropertyCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('PropertyCtrl', ['Property', 'User', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', function(Property, User, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert) {
        
        function userList() {
            if(SessionService.isAuthenticated() == true) {
                User.getUserList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.userslistData = response.data.result;
                        }
                    },
                    function(err) {
                        if(err.status == -1) {
                            SweetAlert.swal("Error", "Server not found" + ":(", "error");
                        } 
                    });
            } else {
                $location.path('/');
            }
        }

        userList();

        $scope.myVar = "5a573dcda78e1f17864c1b2c";

        $scope.propertyList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Property.getPropertyList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.propertylist = response.data.result;
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

        $scope.createPropertyForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.property = "";
                $rootScope.showLoader = false;
                $location.path('/createproperty');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createProperty = function(property) {
            if(SessionService.isAuthenticated() == true) {
                property.createdBy = SessionService.getSessionUser().result._id;
                Property.createProperty(property).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/propertylist');
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

        $scope.viewProperty = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var propertyId = $routeParams.id;
                Property.viewPropertyById(propertyId).then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.property = response.data.result;
                        }
                    }, 
                    function(err) {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    })
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }


        $scope.editPropertyForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var propertyId = $routeParams.id;
                Property.viewPropertyById(propertyId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.property = response.data.result;
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

        $scope.updateProperty = function(property) {
            if(SessionService.isAuthenticated() == true) {
                property.salespersonId = property.salespersonId._id;
                property.lastmodifiedBy = SessionService.getSessionUser().result._id;
                Property.updateProperty(property._id, property).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/propertylist');
                            });
                        }
                    },
                    function(err) {
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.deleteProperty = function(propertyId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this property!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Property.deleteProperty(propertyId).then(
                        function(response) {
                            if(response.data.status == "success") {
                                SweetAlert.swal({ title: "Deleted!", text: response.data.message, type: "success" }, function() {
                                    $route.reload();
                                });  
                            }
                        },
                        function(err) {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        });
                      
                   } else {
                      SweetAlert.swal("Cancelled", "Your property is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }

        
    }]);
