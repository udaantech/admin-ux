'use strict';

/**
 * @ngdoc function
 * @name ladakApp.controller:EntityCtrl
 * @description
 * # EntityCtrl
 * Controller of the ladakApp
 */
angular.module('ladakApp')
    .controller('EntityCtrl', ['Entity', 'Picture', 'Category', 'Tag', 'endpoint', 'SessionService', '$location', '$scope', '$rootScope', '$route', '$routeParams', 'SweetAlert', '$window', function(Entity, Picture, Category, Tag, endpoint, SessionService, $location, $scope, $rootScope, $route, $routeParams, SweetAlert, $window) {
       
        $scope.imagePath = endpoint+'images/uploads/';

        $scope.entityList = function() {
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Entity.getEntityList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.entitylist = response.data.result;
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
                $location.path('/');
            }
        }

        $scope.createEntityForm = function() { 
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                $scope.entity = "";
                $rootScope.showLoader = false;
                $scope.categoryList();
                $location.path('/createentity');
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }


        $scope.createEntity = function(entity) { 
                var file = entity.file; 
                var fd = new FormData();  
                fd.append('file', file);
                if(SessionService.isAuthenticated() == true) {
                    if(file) {
                        // console.log('file found');
                        $rootScope.showLoader = true;
                        Picture.createPicture(fd).then(
                            function(response) {
                                if(response.data.status == "success") {
                                        entity.imageId = response.data.result._id;
                                        entity.createdBy = SessionService.getSessionUser().result._id;
                                        Entity.createEntity(entity).then(
                                            function(response) {
                                                if(response.data.status == "success") {
                                                    $rootScope.showLoader = false;
                                                    SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                                        $location.path('/entitylist');
                                                    });
                                                } else {
                                                    $rootScope.showLoader = false;
                                                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                                                }
                                            }, function(err) {
                                                $rootScope.showLoader = false;
                                                SweetAlert.swal("Error", err.data.message + ":(", "error");
                                            });
                                        } else {
                                            $rootScope.showLoader = false;
                                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                                        }
                                }, function(err) {
                                    $rootScope.showLoader = false;
                                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                                });
                    } else {
                        // console.log('file not found');
                        $rootScope.showLoader = true;
                        entity.createdBy = SessionService.getSessionUser().result._id;
                        Entity.createEntity(entity).then(
                            function(response) {
                                if(response.data.status == "success") {
                                    $rootScope.showLoader = false;
                                    SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                        $location.path('/entitylist');
                                    });
                                } else {
                                    $rootScope.showLoader = false;
                                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                                }
                            }, function(err) {
                                $rootScope.showLoader = false;
                                SweetAlert.swal("Error", err.data.message + ":(", "error");
                            });
                    }
                } else {
                    $location.path('/');
                }
        }


        $scope.stepsModel = [];

        $scope.imageUpload = function(event){
             var files = event.target.files; //FileList object
             if(files[0].type == "image/jpeg" || files[0].type == "image/png" || files[0].type == "image/gif"){ 
                    $rootScope.filevalid = true;
                    for (var i = 0; i < files.length; i++) {
                         var file = files[i];
                             var reader = new FileReader();
                             reader.onload = $scope.imageIsLoaded; 
                             reader.readAsDataURL(file);
                     }
                }
                else{
                    $rootScope.filevalid = false;
                }       
        }

        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.stepsModel.push(e.target.result);
            });
        }

        // $scope.viewEntity = function() {
        //     $rootScope.showLoader = true;
        //     if(SessionService.isAuthenticated() == true) {
        //         var entityId = $routeParams.id;
        //         Guest.viewEntityById(entityId).then(
        //             function(response) {
        //                 if(response.data.status == "success") {
        //                     $rootScope.showLoader = false;
        //                     $scope.entity = response.data.result;
        //                 }
        //             }, 
        //             function(err) {
        //                 $rootScope.showLoader = false;
        //                 SweetAlert.swal("Error", err.data.message + ":(", "error");
        //             })
        //     } else {
        //         $rootScope.showLoader = false;
        //         $location.path('/');
        //     }
        // }


        $scope.editEntityForm = function() { 
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                var entityId = $routeParams.id;
                Entity.viewEntityById(entityId).then(
                    function(response) {
                        if(response.data.status == "success") {
                           $rootScope.showLoader = false;
                           $scope.categoryList();
                           var entity_arr = response.data.result; 
                           var temp_entity = [];
                           for(var i=0; i < entity_arr.tags.length; i++) {
                            temp_entity[i] = entity_arr.tags[i]._id;
                           }
                           $scope.entityTagsArray = temp_entity;
                           $scope.entity = response.data.result;
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

        $scope.updateEntity = function(entity) {
            var file = entity.file; 
            var fd = new FormData();  
            fd.append('file', file);
            if(SessionService.isAuthenticated() == true) {
                if(file && entity.imageId) {
                    console.log('file found');
                    $rootScope.showLoader = true;
                    
                    Picture.updatePicture(entity.imageId._id, fd).then(
                        function(response) {
                            if(response.data.status == "success") {
                                    entity.imageId = response.data.result._id;
                                    entity.lastmodifiedby = SessionService.getSessionUser().result._id;
                                    Entity.updateEntity(entity._id, entity).then(
                                        function(response) {
                                            if(response.data.status == "success") {
                                                $rootScope.showLoader = false;
                                                SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                                    $location.path('/entitylist');
                                                });
                                            } else {
                                                $rootScope.showLoader = false;
                                                SweetAlert.swal("Error", err.data.message + ":(", "error");
                                            }
                                        }, function(err) {
                                            $rootScope.showLoader = false;
                                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                                        });
                                    } else {
                                        $rootScope.showLoader = false;
                                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                                    }
                            }, function(err) {
                                $rootScope.showLoader = false;
                                SweetAlert.swal("Error", err.data.message + ":(", "error");
                            });
                } else if(file && !entity.imageId) {
                    $rootScope.showLoader = true;
                     Picture.createPicture(fd).then(
                            function(response) {
                                if(response.data.status == "success") {
                                        entity.imageId = response.data.result._id;
                                        entity.lastmodifiedby = SessionService.getSessionUser().result._id;
                                        Entity.updateEntity(entity._id, entity).then(
                                            function(response) {
                                                if(response.data.status == "success") {
                                                    $rootScope.showLoader = false;
                                                    SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                                        $location.path('/entitylist');
                                                    });
                                                } else {
                                                    $rootScope.showLoader = false;
                                                    SweetAlert.swal("Error", err.data.message + ":(", "error");
                                                }
                                            }, function(err) {
                                                $rootScope.showLoader = false;
                                                SweetAlert.swal("Error", err.data.message + ":(", "error");
                                            });
                    } else {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    }
                });
            } else {
                if(entity.imageId) {
                    entity.imageId = entity.imageId._id;
                } else {
                    entity.imageId = null;
                }
                entity.lastmodifiedby = SessionService.getSessionUser().result._id;
                Entity.updateEntity(entity._id, entity).then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $location.path('/entitylist');
                            });
                        } else {
                            $rootScope.showLoader = false;
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        }
                    }, function(err) {
                        $rootScope.showLoader = false;
                        SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            }
            } else {
                $location.path('/');
            }
        }

        $scope.deleteEntity = function(entityId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this entity!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Entity.deleteEntity(entityId).then(
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
                      SweetAlert.swal("Cancelled", "Your entity is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }

        $scope.deleteEntity2 = function(entityId) {
            if(SessionService.isAuthenticated() == true) {
                SweetAlert.swal({ title: "Are you sure?",
                   text: "Your will not be able to recover this entity!",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                   cancelButtonText: "No, cancel plx!",
                   closeOnConfirm: false,
                   closeOnCancel: false }, 
                function(isConfirm){ 
                   if (isConfirm) {
                      Entity.deleteEntity(entityId).then(
                        function(response) {
                            if(response.data.status == "success") {
                                SweetAlert.swal({ title: "Deleted!", text: response.data.message, type: "success" }, function() {
                                    $location.path('/entitylist');
                                });  
                            }
                        },
                        function(err) {
                            SweetAlert.swal("Error", err.data.message + ":(", "error");
                        });
                      
                   } else {
                      SweetAlert.swal("Cancelled", "Your entity is safe :)", "error");
                   }
                });
            } else {
                $location.path('/');
            }

        }


//----------------------------for category---------------------------

        $scope.categoryList = function() {  
            $rootScope.showLoader = true;
            if(SessionService.isAuthenticated() == true) {
                Category.getCategoryList().then(
                    function(response) {
                        if(response.data.status == "success") {
                            $rootScope.showLoader = false;
                            $scope.categorylist = response.data.result;
                        } 
                    }, 
                    function(err) {
                        $rootScope.showLoader = false;
                        //SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $rootScope.showLoader = false;
                $location.path('/');
            }
        }

        $scope.addEntityTag = function(entityTagData) { 
            $rootScope.showLoader = true;
             if(SessionService.isAuthenticated() == true) {
                entityTagData.entityId = $routeParams.id;
                Entity.addEntityTag(entityTagData).then(
                    function(response) {
                        if(response.data.status == "success") {
                            //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $rootScope.showLoader = false;
                                $scope.editEntityForm();
                            //});
                        } 
                    }, function(err) {
                        $rootScope.showLoader = false;
                        //SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        $scope.removeEntityTag = function(entityTagData) { 
             $rootScope.showLoader = true;
             if(SessionService.isAuthenticated() == true) {
                entityTagData.entityId = $routeParams.id;
                Entity.removeEntityTag(entityTagData).then(
                    function(response) {
                        if(response.data.status == "success") {
                            //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $rootScope.showLoader = false;
                                $scope.editEntityForm();
                            //});
                        }
                    }, function(err) {
                        $rootScope.showLoader = false;
                        //SweetAlert.swal("Error", err.data.message + ":(", "error");
                    });
            } else {
                $location.path('/');
            }
        }

        //for create entity form 
        var tagArr = [];
        $scope.tagArray = tagArr;
        $scope.addTagInAddEntityForm = function(tag) {
            tagArr.push(tag._id);
            $scope.tagArray = tagArr;
        }
        $scope.removeTagInAddEntityForm = function(tag) {
            const index = tagArr.indexOf(tag._id);
            tagArr.splice(index, 1);
            $scope.tagArray = tagArr;
        }

        //add tag category
        $scope.createCategory = function(category) { 
            if(SessionService.isAuthenticated() == true) {
                category.createdBy = SessionService.getSessionUser().result._id;
                Category.createCategory(category).then(
                    function(response) {
                        if(response.data.status == "success") {
                            //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $scope.category = null;
                                angular.element('#tagscategory').modal('hide');
                                if($routeParams.id != null) {
                                    $scope.editEntityForm();
                                } else {
                                    $scope.createEntityForm();
                                }
                                
                            //});
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

        //add tag
        $scope.createTag = function(tag) {
            if(SessionService.isAuthenticated() == true) {
                tag.createdBy = SessionService.getSessionUser().result._id;
                Tag.createTag(tag).then(
                    function(response) {
                        if(response.data.status == "success") {
                            //SweetAlert.swal({ title: "Success!", text: response.data.message, type: "success" }, function() {
                                $scope.tag = null;
                                angular.element('#addcategory').modal('hide');
                                if($routeParams.id != null) {
                                    $scope.editEntityForm();
                                } else {
                                    $scope.createEntityForm();
                                }
                            //});
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
