(function(){
    'use strict';

    angular
        .module('myApp')
        .service('HandAnalyzer', HandAnalyzer);


    function HandAnalyzer() {
        var o = {};
        var handsValueChart = [' High Straight Flush', 'Four of a Kind', 'Fullhouse', ' High Flush', ' High Straight',
            'Three of a Kind', 'Two Pair', 'One Pair', ' High'];
        o.evaluateHand = function(hand){


        };
        // returns false or the numerical value of the highest held flush card
        o.flushDetector = function(hand) {

            var suit = hand[0].getSuitValue();
            var hasFlush = hand.slice(1).every(function(card){
                return suit = card.getSuitValue();
            });
            var getHighCard = function(hand){
                var highCard = hand[0].getCardValue();
                hand.slice(1).forEach(function(card){
                    // determine if current card is higher than all previous cards
                    var tempCardValue = card.getCardValue();
                    if (tempCardValue > highCard) {
                        highCard = tempCardValue;
                    }
                });
                return highCard;
            };
            if (hasFlush) {
                return getHighCard(hand);
            } else {
                return false;
            }
        }
    }
})();