(function(){
	'use strict';

	angular
		.module('myApp')
		.controller('HomeController', homeController);


	function homeController($scope, Deck, Player, Dealer, HandAnalyzer) {
		$scope.$watch('showButton', function(){
			console.log('0');
			if ($scope.showButton = false) {
				console.log('1');

				console.log('2');
			}
		}, true);
		init();

		function init(){
			var deck = new Deck();
			$scope.player1 = new Player(deck, HandAnalyzer);
			$scope.dealer = new Dealer(deck);
			$scope.player1.startGame();
			$scope.dealer.startGame();
			$scope.showButton = false;

			$scope.seeHand = HandAnalyzer.evaluateHand($scope.player1.cards);

		}
	}
})();