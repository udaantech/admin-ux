'use strict';

/**
 * @ngdoc directive
 * @name ladakApp.directive:headerBar
 * @description
 * # headerBar
 */
angular.module('ladakApp')
  .directive('headerBar', function () {
    return {
      templateUrl: 'partials/header.html',
      restrict: 'A'
      };
  });
