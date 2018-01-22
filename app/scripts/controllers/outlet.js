'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:OutletCtrl
 * @description
 * # OutletCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('OutletCtrl', ['Outlet', 'User', 'OutletType', 'SessionService', '$location', '$scope', '$route', '$rootScope', '$routeParams', 'SweetAlert', function(Outlet, User, OutletType, SessionService, $location, $scope, $route, $rootScope, $routeParams, SweetAlert) {

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

        userList();

        function outletTypeList() {
            if(SessionService.isAuthenticated() == true) {
                OutletType.getOutletTypeList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.outletTypelistData = response.data.result;
                        }
                    },
                    function(err) {
                        console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        outletTypeList();

        $scope.myVar = "5a585ab973b38330416cf38b";
    	$scope.outletList = function() {
    		$rootScope.showLoader = true;
    		if(SessionService.isAuthenticated() == true) {
    			Outlet.getOutletList().then(
    				function(response) {
    					if(response.data.status == "success") {
    						$rootScope.showLoader = false;
    						$scope.outletlist = response.data.result;
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

        $scope.createOutletForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.outlet = "";
                $rootScope.showLoader = false;
                $location.path('/createoutlet');
            } else {
                $location.path('/');
            }
        }

        $scope.createOutlet = function(outlet) {
            console.log('ssdsdsdss', outlet);
            if(SessionService.isAuthenticated() == true) {
                outlet.createdBy = SessionService.getSessionUser().result._id;
                Outlet.createOutlet(outlet).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/outletlist');
                            });
                        } else {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    },
                    function(err) {
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            }
        }

        $scope.viewOutlet = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var outletId = $routeParams.id;
                Outlet.viewOutletById(outletId).then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.outlet = response.data.result;
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


        $scope.editOutletForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var outletId = $routeParams.id;
                Outlet.viewOutletById(outletId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.outlet = response.data.result;
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

        $scope.updateOutlet = function(outlet) {
            if(SessionService.isAuthenticated() == true) {
                outlet.outletTypeId = outlet.outletTypeId._id;
                //outlet.outletmanagerId = outlet.outletmanagerId._id;
                outlet.lastmodifiedBy = SessionService.getSessionUser().result._id;
                Outlet.updateOutlet(outlet._id, outlet).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/outletlist');
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

        $scope.deleteOutlet = function(outletId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this outlet!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Outlet.deleteOutlet(outletId).then(
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
                      SweetAlert.swal("Cancelled", "Your outlet is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }

    }]);
        