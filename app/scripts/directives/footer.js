'use strict';

/**
 * @ngdoc directive
 * @name ladakApp.directive:footerBar
 * @description
 * # footerBar
 */

 angular.module('ladakApp')
 	.directive('footerBar', function () {
 		return {
 			templateUrl: 'partials/footer.html',
 			restrict: 'A'
 		};
 	});