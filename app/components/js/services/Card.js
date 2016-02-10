angular.module('myApp.services.Card', [])
    .service('Card', function($interpolate){
        return function(suit, card){
            var s = suit; //0: clubs, 1: diamonds, 2: hearts, 3:spades
            var c = card; // add 2 to get card, 9: jack, 10: queen, 11: king, 12: Ace

            this.getCardValue = function(){
                return [c,s];
            };

            this.getSuitValue = function(){
                return s;
            };
            this.getCardName = function(){
                // turn this into symbol representation of card
                switch(c){
                    case 12:
                        return 'A';
                    case 11:
                        return 'K';
                    case 10:
                        return 'Q';
                    case 9:
                        return 'J';
                    default:
                        return c + 2;
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
    });