'use strict';

// Defining Angular app model with all other dependent modules
angular.module('myApp',['ui.router',
	'myApp.config', 'myApp.home','myApp.about','myApp.login', 'myApp.services.Card', 'myApp.services.Dealer',
	'myApp.services.Deck', 'myApp.services.Player', 'myApp.services.WinnerPicker', 'myApp.directives.card']);
//
//myApp.config(function($routeProvider, $locationProvider, $httpProvider) {
//
//	// Declaration of the default route if neither of the controllers
//	// is supporting the request path
//	$routeProvider.otherwise({ redirectTo: '/'});
//
//	// Settings for http communications
//	$httpProvider.defaults.useXDomain = true;
//	delete $httpProvider.defaults.headers.common['X-Requested-With'];
//
//	// disabling # in Angular urls
//	 $locationProvider.html5Mode({
//	 		enabled: true,
//	      requireBase: false
//	 });
//});