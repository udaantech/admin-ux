'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('UserCtrl', ['User', 'Roles', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', function(User, Roles, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert) {
        $scope.loginForm = true;
        $scope.passwordForm = false;

        function roleList() {
            if(SessionService.isAuthenticated() == true) {
                Roles.getRolesList().then(
                function(response) {
                    if(response.data.status == "success") {
                        $scope.rolelistData = response.data.result;
                    }
                },
                function(err) {
                    console.log('error', err);
                });
            } else {
                $location.path('/');
            }
            
        }

        roleList();
        
        $scope.loginUser = function(user) {
            $rootScope.showLoader = true;
            User.getLogin(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        $rootScope.showLoader = false;
                        SessionService.setSessionUser(response.data);
                        //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('propertylist/');
                        //});
                    }
                },
                function(err) {
                    $rootScope.showLoader = false;
                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                });
        } 

        $scope.forgotPasswordForm = function() {
            $scope.passwordForm = true;
            $scope.loginForm = false;
            }

        $scope.forgotPassword = function(user) {
            User.forgotPassword(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('/');
                        });
                    }
                },
                function(err) {
                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                });
        }


        $scope.registerUser = function(user) {
            $rootScope.showLoader = true;
            User.registerUser(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        $rootScope.showLoader = false;
                        //SessionService.setSessionUser(response.data);
                        //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('/');
                        //});
                    } else {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    }
                },
                function(err) {
                    $rootScope.showLoader = false;
                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                });
        }

        $scope.resetPassword = function(user) {
            user.id = $routeParams.id;
            if(user.cpassword == true) {
                user.cpassword = user.npassword;
            }
            User.resetPassword(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('/');
                        });
                    }
                },
                function(err) {
                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                });
        }
           
        $scope.userList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                User.getUserList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.userslist = response.data.result;
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

        $scope.createUserForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.user = "";
                $rootScope.showLoader = false;
                $location.path('/createuser');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createUser = function(user) {
            if(SessionService.isAuthenticated() == true) {
                User.createUser(user).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/userlist');
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

        $scope.viewUser = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var userId = $routeParams.id;
                User.viewUserById(userId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.user = response.data.result;
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

        $scope.editUserForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var userId = $routeParams.id;
                User.viewUserById(userId).then(
                    function(response) {
                        console.log('response', response);
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                           $scope.user = response.data.result;
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

        $scope.updateUser = function(user) {
            if(SessionService.isAuthenticated() == true) {
                user.userRoles = user.userRoles[0]._id;
                User.updateUser(user._id, user).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/userlist');
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

        $scope.deleteUser = function(userId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this user!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      User.deleteUser(userId).then(
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
                      SweetAlert.swal("Cancelled", "Your user is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }
    
    }]);
