(function() {
    'use strict';

    angular
        .module('myApp')
        .service('Messages', Messages);


    function Messages() {
        var o = {};
        o.hands = {
            fullHouse : function(three, two) {
                return three + 's full of ' + two + 's';
            },
            twoPair: function(a,b) {
                return 'Two pair: ' + a +'s and ' + b + 's';
            },
            flush: function(highCard){
                return highCard.getCardName(true) + ' high ' + highCard.getSuitName().slice(1, -1) + ' flush';
            },
            straight: function(highNum){
                return highNum + ' high straight';
            },
            straightFlush: function(highCard){
                return highCard.getCardName(true) + ' high ' + highCard.getSuitName().slice(1, -1) + ' straight flush';
            }



        };
        return o;
    }
})();