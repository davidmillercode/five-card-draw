(function(){
    'use strict';

    angular
        .module('myApp')
        .service('WinnerPicker', WinnerPicker);


    function WinnerPicker() {
        return function(){
            this.cards = [];
            this.getCards = function(numCards, indexes) {

            };
        }
    }
})();