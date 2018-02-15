'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('RoleCtrl', ['Roles', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', function(Roles, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert) {
        
        $scope.rolesList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Roles.getRolesList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.roleslist = response.data.result;
                        }
                    },
                    function(err) {
                        $rootScope.showLoader = false;
                        if(err.status == -1) {
                            SweetAlert.swal("Error", "Server not found" + ":(", "error");
                        } else {
                             SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    });
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createRoleForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.role = "";
                $rootScope.showLoader = false;
                $location.path('/createrole');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createRole = function(role) {
            if(SessionService.isAuthenticated() == true) {
                Roles.createRole(role).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/roleslist');
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

        $scope.viewRole = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var roleId = $routeParams.id;
                Roles.viewRoleById(roleId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.role = response.data.result;
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

        $scope.editRoleForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var roleId = $routeParams.id;
                Roles.viewRoleById(roleId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.role = response.data.result;
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

        $scope.updateRole = function(role) {
            if(SessionService.isAuthenticated() == true) {
                Roles.updateRole(role._id, role).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/roleslist');
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

        $scope.deleteRole = function(roleId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this role!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Roles.deleteRole(roleId).then(
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
                      SweetAlert.swal("Cancelled", "Your role is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }
        }
    }]);
