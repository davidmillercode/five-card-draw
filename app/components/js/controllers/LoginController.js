(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('LoginController', LoginController);


	function LoginController($scope) {

		var responseStatus = '';
		var userIp = 'not yet retrieved';

		init();

		function init(){}
	}
})();