angular.module('myApp.directives.card', ['ngSanitize'])
    .directive('card', function($sanitize) {
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
            }
        }
    };
    });