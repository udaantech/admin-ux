'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('RoleCtrl', ['Roles', 'SessionService', '$location', '$scope', '$rootScope', '$routeParams', 'SweetAlert', function(Roles, SessionService, $location, $scope, $rootScope, $routeParams, SweetAlert) {
        if(SessionService.isAuthenticated() == false) {
            $location.path('/');
        }

        $scope.rolesList = function() {
            Roles.getRolesList().then(
                function(response) {
                    if(response.data.status == "success") {
                        $scope.roleslist = response.data.result;
                    }
                },
                function(err) {
                    //console.log('error', err);
                });
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
                        // console.log('error', err);
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.viewRole = function() {
            if(SessionService.isAuthenticated() == true) {
                var roleId = $routeParams.id;
                Roles.viewRoleById(roleId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.role = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.editRoleForm = function() {
            var roleId = $routeParams.id;
            Roles.viewRoleById(roleId).then(
                function(response) {
                    if(response.data.status == "success") {
                       $rootScope.role = response.data.result;
                    }
                },
                function(err) {
                    //console.log('error', err);
                });
        }

        $scope.updateRole = function(role) {
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
        }

        $scope.deleteRole = function(roleId) {
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
                            //SweetAlert.swal("Deleted!", response.data.message, "success");
                            SweetAlert.swal({ title: "Deleted!", text: response.data.message, type: "success" }, function() {
                                $location.path('/roleslist');
                            });
                        }
                    },
                    function(err) {
                        console.log('error', err);
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
                  
               } else {
                  SweetAlert.swal("Cancelled", "Your role is safe :)", "error");
               }
            });

        }
    }]);
