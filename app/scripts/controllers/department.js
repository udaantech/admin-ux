'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:DepartmentCtrl
 * @description
 * # DepartmentCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('DepartmentCtrl', ['Department', 'User', 'Property', 'SessionService', '$location', '$scope', '$route', '$rootScope', '$routeParams', 'SweetAlert', function(Department, User, Property, SessionService, $location, $scope, $route, $rootScope, $routeParams, SweetAlert) {
        
        function userList() {
            if(SessionService.isAuthenticated() == true) {
                User.getUserList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.userslistData = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        function propertyList() {
            if(SessionService.isAuthenticated() == true) {
                Property.getPropertyList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.propertylistData = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        userList();
        propertyList();

        $scope.myVar = "5a573dcda78e1f17864c1b2c";

        $scope.departmentList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Department.getDepartmentList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.departmentlist = response.data.result;
                        }
                    },
                    function(err) {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.createDepartmentForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $rootScope.showLoader = false;
                $location.path('/createdepartment');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createDepartment = function(department) {
            if(SessionService.isAuthenticated() == true) {
                department.createdBy = SessionService.getSessionUser().result._id;
                Department.createDepartment(department).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/departmentlist');
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

        $scope.viewDepartment = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var departmentId = $routeParams.id;
                Department.viewDepartmentById(departmentId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.department = response.data.result;
                        }
                    },
                    function(err) {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.editDepartmentForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var departmentId = $routeParams.id;
                Department.viewDepartmentById(departmentId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.department = response.data.result;
                        }
                    },
                    function(err) {
                        console.log('sdsd', err);
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.updateDepartment = function(department) {
            if(SessionService.isAuthenticated() == true) {
                department.propertyId = department.propertyId._id;
                department.managerId = department.managerId._id;
                department.supervisorId = department.supervisorId._id;
                department.lastmodifiedBy = SessionService.getSessionUser().result._id;
                Department.updateDepartment(department._id, department).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/departmentlist');
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

        $scope.deleteDepartment = function(departmentId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this department!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Department.deleteDepartment(departmentId).then(
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
                      SweetAlert.swal("Cancelled", "Your department is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }
    

    }]);
