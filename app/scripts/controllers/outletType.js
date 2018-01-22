'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:OutletTypeCtrl
 * @description
 * # OutletTypeCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('OutletTypeCtrl', ['OutletType', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', function(OutletType, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert) {
        
        $scope.outletTypeList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                OutletType.getOutletTypeList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.outletTypelist = response.data.result;
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

        $scope.createOutletTypeForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.role = "";
                $rootScope.showLoader = false;
                $location.path('/createoutlettype');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createOutletType = function(outletType) {
            if(SessionService.isAuthenticated() == true) {
                OutletType.createOutletType(outletType).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/outlettypelist');
                            });
                        } else {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    },
                    function(err) {
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.viewOutletType = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var outletTypeId = $routeParams.id;
                OutletType.viewOutletTypeById(outletTypeId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.outletType = response.data.result;
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

        $scope.editOutletTypeForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var outletTypeId = $routeParams.id;
                OutletType.viewOutletTypeById(outletTypeId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.outletType = response.data.result;
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

        $scope.updateOutletType = function(outletType) {
            if(SessionService.isAuthenticated() == true) {
                OutletType.updateOutletType(outletType._id, outletType).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/outlettypelist');
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

        $scope.deleteOutletType = function(outletTypeId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this outletType!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      OutletType.deleteOutletType(outletTypeId).then(
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
                      SweetAlert.swal("Cancelled", "Your outletType is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }
        }
    }]);
