angular.module('myApp.services.Player', [])
    .service('Player', function() {
        return function(deck){
            var toRemove; //this will just be the indexes of cards selected to replace
            var round = 0; // 0 is before getting dealt; 1 is after dealt; 2 is after discarded
            var score = 0; // only goes up with a win
            var canDiscard = true;
            var turn = 0; // when 0, player goes first to remove cards

            //this.getRound = function() {
            //    return round;
            //};
            //this.getTurn = function() {
            //  return turn;
            //};
            this.canDiscard = function() {
                return deck.round === 1 && deck.whoseTurn === 0;
            };

            this.getCards = function() {
                canDiscard = false; // no more selecting && discarding cards
                deck.changeTurn();
                var cardsDealt = deck.dealCards(toRemove.length);
                var that = this;
                toRemove.forEach(function(i){
                    that.cards[i] = cardsDealt.pop();
                });
                toRemove = [];

            };

            this.selectCardToRemove = function(i){
                if (canDiscard) {
                    var indexLocated = toRemove.indexOf(i);
                    if (indexLocated !== -1) { // if card has already been selected for removal
                        toRemove.splice(indexLocated, 1); // un-select
                    } else {
                        toRemove.push(i); // select card for removal
                    }
                }
            };

            function updateRound() {
                round = (round < 2) ? round + 1 : 0;
            }

            function changeTurn(){
                turn = (turn === 0) ? 1 : 0;
            }

            this.startGame = function(){
                toRemove = [];
                this.cards = deck.dealCards(5);
                canDiscard = true;
                round = 1;
                changeTurn();
            }
        }
    });