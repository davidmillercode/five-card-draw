(function(){
    'use strict';

    angular
        .module('myApp')
        .directive('card', card);


    function card() {
        return {
            restrict: 'E',
            replace: 'true',
            template: '<div class="outline shadow rounded">' +
            '<div class="top"><span>{{card.getCardName()}}</span><span ng-bind-html="card.getSuitName()"></span></div>' +
            '<h1 ng-bind-html="card.getSuitName()"></h1>' +
            '<div class="bottom"><span ng-bind-html="card.getSuitName()"></span><span>{{card.getCardName()}}</span></div>' +
            '</div>',
            scope: {
                card: '=card',
                player: '=player',
                i: '=i'
            },
            link: function(scope, ele, attrs) {
                // color black if spade or club --- already red if nothing changes
                if (scope.card.getSuitValue() % 3 === 0) {
                    ele.addClass('black-suit');
                }
                // player can only discard their own cards
                if (! scope.player.dealer) {
                    // bind click event where they select what they would like to discard
                    ele.bind('click', function(){
                        // darkens card to discard if unselected / removes darken if selected
                        // also adds or removes from pending discard pile
                        if (ele.hasClass('darken')) {
                            ele.removeClass('darken');
                            scope.player.selectCardToRemove(scope.i);
                        } else {
                            ele.addClass('darken');
                            scope.player.selectCardToRemove(scope.i);
                        }
                    });
                    // highlight cards that make best hand after each round
                    scope.$watch('player.toHighlight', function(){
                        if (scope.player.toHighlight.indexOf(scope.i) !== -1) {
                            ele.addClass('highlighted');
                        } else {
                            ele.removeClass('highlighted');
                        }
                    });

                }
            }
        };
    }
})();