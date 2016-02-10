angular.module('myApp.services.Deck', [])
    .service('Deck', function(Card){
        return function(){
            var whoseTurn = 0; // keeps track of who has to go first => 0:Player, 1:Dealer
            this.dealCards = function(numberOfCards){
                var cardsToDeal = [];
                for (var i = 0; i < numberOfCards; i++) {
                    cardsToDeal.push(deck.pop());
                }
                return cardsToDeal;
            };

            function createDeck() {
                var deck = [];
                for (var suit = 0; suit < 4; suit++) {
                    for (var card = 0; card < 13; card++) {
                        deck.push(new Card(suit, card));
                    }
                }
                return deck;
            }

            this.shuffle = function() {
                var array = createDeck();
                var counter = array.length;

                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    var index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    var temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                console.log('this is deck: ', array);
                return array;
            };

            this.changeTurn = function() {
                whoseTurn = (whoseTurn === 0) ? 1 : 0;
            };
            this.getTurn = function(){
                return whoseTurn;
            };

            var deck = this.shuffle();
        }
    });