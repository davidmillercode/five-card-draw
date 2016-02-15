(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('HomeController', homeController);


	function homeController($scope, Deck, Player, Dealer) {
		init();

		function init(){
			var deck = new Deck();
			$scope.player1 = new Player(deck);
			$scope.dealer = new Dealer(deck);
			$scope.player1.startGame();
			$scope.dealer.startGame();
		}
	}
})();