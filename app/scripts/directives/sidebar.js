'use strict';

/**
 * @ngdoc directive
 * @name ladakApp.directive:sideBar
 * @description
 * # sideBar
 */
angular.module('ladakApp')
  .directive('sideBar', function () {
    return {
      templateUrl: 'partials/sidebar.html',
      restrict: 'A'
      };
  });
