'use strict';

// This adds different modules for the over all shoppingCart app
angular.module('shoppingCart', [
	'ngRoute',
	'cart',
	'checkout'
]).
 config(['$routeProvider', function($routeProvider) {
 	$routeProvider.otherwise({
 		redirectTo: '/cart'
 	});
 }]);