'use strict';

angular.module('myApp.home', ['ngSanitize'])

// Controller definition for this module
.controller('HomeController', ['$scope', 'Player', 'Dealer', 'Deck', function($scope, Player, Dealer, Deck) {
	init();

	function init(){
		var deck = new Deck();
		$scope.player1 = new Player(deck);
		$scope.dealer = new Dealer(deck);
		$scope.player1.startGame();
	}
}]);