'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:GuestCtrl
 * @description
 * # GuestCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('GuestCtrl', ['Guest', 'User', 'Contact', 'Language', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', function(Guest, User, Contact, Language, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert) {
        
        function contactList() {
            if(SessionService.isAuthenticated() == true) {
                Contact.getContactList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.contactslistData = response.data.result;

                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        function languageList() {
            if(SessionService.isAuthenticated() == true) {
                Language.getLanguageList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $scope.languageslistData = response.data.result;
                        }
                    },
                    function(err) {
                        //console.log('error', err);
                    });
            } else {
                $location.path('/');
            }
        }

        languageList();
        contactList();

        $scope.guestList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Guest.getGuestList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.guestlist = response.data.result;
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

        $scope.createGuestForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.guest = "";
                $rootScope.showLoader = false;
                $location.path('/createguest');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.createGuest = function(guest) {
            if(SessionService.isAuthenticated() == true) {
                guest.createdBy = SessionService.getSessionUser().result._id;
                Guest.createGuest(guest).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/guestlist');
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

        $scope.viewGuest = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var guestId = $routeParams.id;
                Guest.viewGuestById(guestId).then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.guest = response.data.result;
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


        $scope.editGuestForm = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var guestId = $routeParams.id;
                Guest.viewGuestById(guestId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.guest = response.data.result;
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

        $scope.updateGuest = function(guest) {
            if(SessionService.isAuthenticated() == true) {
                guest.contactId = guest.contactId._id;
                guest.languages = guest.languages._id;
                guest.lastmodifiedBy = SessionService.getSessionUser().result._id;
                Guest.updateGuest(guest._id, guest).then(
                    function(response) {
                        if(response.data.status == "success") {
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/guestlist');
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

        $scope.deleteGuest = function(guestId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this guest!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Guest.deleteGuest(guestId).then(
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
                      SweetAlert.swal("Cancelled", "Your guest is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }

        
    }]);
