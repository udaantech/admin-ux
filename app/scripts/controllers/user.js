'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('UserCtrl', ['User', 'SessionService', '$location', '$scope', '$rootScope', '$routeParams', 'SweetAlert', function(User, SessionService, $location, $scope, $rootScope, $routeParams, SweetAlert) {
        $scope.loginForm = true;
        $scope.passwordForm = false;

        $scope.loginUser = function(user) {
            User.getLogin(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        SessionService.setSessionUser(response.data.result);
                        SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('dashboard/');
                        });
                        // $scope.message = response.data.message;
                        // $location.path('/dashboard');
                    }
                },
                function(err) {
                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                    // $scope.message = err.data.message;
                    // $location.path('/');
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
            User.registerUser(user).then(
                function(response) {
                    if (response.data.status == "success") {
                        SessionService.setSessionUser(response.data.result);
                        SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                            $location.path('/dashboard');
                        });
                    } else {
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    }
                },
                function(err) {
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
            if(SessionService.isAuthenticated() == true) {
                User.getUserList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.userslist = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.createUser = function(user) {
            if(SessionService.isAuthenticated() == true) {
                User.createUser(user).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/userslist');
                            });
                        } else {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.viewUser = function() {
            if(SessionService.isAuthenticated() == true) {
                var userId = $routeParams.id;
                User.viewUserById(userId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.user = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.editUserForm = function() {
            if(SessionService.isAuthenticated() == true) {
                var userId = $routeParams.id;
                User.viewUserById(userId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.user = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.updateUser = function(user) {
            if(SessionService.isAuthenticated() == true) {
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
                                //SweetAlert.swal("Deleted!", response.data.message, "success");
                                SweetAlert.swal({ title: "Deleted!", text: response.data.message, type: "success" }, function() {
                                    $location.path('/userlist');
                                });
                            }
                        },
                        function(err) {
                            console.log('error', err);
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
