(function(){
    'use strict';

    angular
        .module('myApp')
        .service('Card', Card);


    function Card() {
        return function(suit, card){
            var s = suit; //0: clubs, 1: diamonds, 2: hearts, 3:spades
            var c = card; // add 2 to get card, 9: jack, 10: queen, 11: king, 12: Ace
            // TODO: Delete below
            this.nammmmme = card;
            this.suiiiittt = suit;

            this.getCardValue = function(){
                return c;
            };

            this.getSuitValue = function(){
                return s;
            };
            this.getCardName = function(fullName){
                // turn this into symbol representation of card
                var sym;
                var name;
                switch(c){
                    case 12:
                        sym = 'A';
                        name = 'Ace';
                        break;
                    case 11:
                        sym = 'K';
                        name = 'King';
                        break;
                    case 10:
                        sym = 'Q';
                        name = 'Queen';
                        break;
                    case 9:
                        sym = 'J';
                        name = 'Jack';
                        break;
                    default:
                        sym = c + 2;
                        name = sym;
                }
                if (fullName) {
                    return name;
                } else {
                    return sym;
                }
            };

            this.getSuitName = function() {
                switch(s){
                    case 0:
                        return '&clubs;';
                    case 1:
                        return '&diams;';
                    case 2:
                        return '&hearts;';
                    case 3:
                        return '&spades;';
                    default:
                        return 'E';
                }
            }
        }
    }
})();