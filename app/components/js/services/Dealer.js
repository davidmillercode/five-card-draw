angular.module('myApp.services.Dealer', [])
    .service('Dealer', function(Player) {
        return function(deck){
            // create our new custom object that reuse the original object constructor
            var Dealer = function() {
                Player.apply(this, arguments);
            };

            Dealer.prototype = new Player(deck);

            var cards;
            var toRemove; //this will just be the indexes of cards selected to replace
            var round = 0; // 0 is before getting dealt; 1 is after dealt; 2 is after discarded
            var score = 0; // only goes up with a win
            var canDiscard = true;
            var turn = 0; // says who has to act first, player if 0, dealer if 1

            Dealer.prototype.startGame = function() {
                toRemove = [];
                cards = deck.dealCards(5);
                canDiscard = true;
                round = 1;
                deck.changeTurn();
                turn = deck.getTurn();
                if (turn === 1) {
                    drawCards();
                } // otherwise wait for player's move
            };

            Dealer.drawCards = function(){

            };

            Dealer.makeMove = function(){

            };

            return Dealer;
        }
    });