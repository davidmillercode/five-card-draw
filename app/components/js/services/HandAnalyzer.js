(function(){
    'use strict';

    angular
        .module('myApp')
        .service('HandAnalyzer', HandAnalyzer);


    function HandAnalyzer(Messages) {
        var o = {};
        var handsValueChart = [' High Straight Flush', 'Four of a Kind', 'Fullhouse', ' High Flush', ' High Straight',
            'Three of a Kind', 'Two Pair', 'One Pair', ' High'];

        // 1) if there is a 2/3/4-pair then there cannot be a flush or a straight
        // 2)


        o.evaluateHand = function(hand){
            console.log('hand to evaluate: ', hand);
            var toHighlight; // so we display the best cards the player can use
            var all = [0,1,2,3,4];
            var flush;
            var straight;
            // higher is better -- 0: high card, 1: pair, 2: two pair, 3: three of a kind, 4: straight, 5: flush,
            // 6: fullhouse, 7: four of a kind, 8: straight flush
            var topRankedHand = 0;
            var bestHand;
            // first check if any matches to rule out straights and flushes
            if (! o.matchFound(hand)) { // straights and flushes are only possible when no paired cards
                var d = analyzeNoMatches(hand); //Int,Str,[Int]
                topRankedHand = d.shift(); // remove head of list and assign
                bestHand = d.shift();
                toHighlight = d.shift();
            } else { //because you cannot pair a card with a flush or straight
                var indexesReturned = howManyMatchesOfWhat(hand); // gets array filled with 1-2 arrays of indexes
                if (indexesReturned.length === 1) { // IF no pair OR 2-3 of a kind
                    var firstSubArray = indexesReturned[0];
                    var matchCount = firstSubArray.length;
                    switch(matchCount){
                        case 2:
                            // get card name
                            topRankedHand = 1;
                            bestHand = 'Two ' + hand[firstSubArray[0]].getCardName(true) + 's';
                            toHighlight = firstSubArray;
                            break;
                        case 3:
                            topRankedHand = 3;
                            bestHand = 'Three' + hand[firstSubArray[0]].getCardName(true) + 's';
                            toHighlight = firstSubArray;
                            break;
                        case 4:
                            topRankedHand = 7;
                            bestHand = 'Four' + hand[firstSubArray[0]].getCardName(true) + 's';
                            toHighlight = firstSubArray;
                        default:
                            console.log('ERROR AT HAND ANALYSIS.  SHOULD BE EMPTY OR 2-3 LENGTH: ', firstSubArray);
                    }
                } else { // two pair or fullhouse
                    console.log("THESE ARE INDEXES RETURNED: ", indexesReturned);
                    var firstSubArray = indexesReturned[0];
                    var secondSubArray = indexesReturned[1];
                    toHighlight = firstSubArray.concat(secondSubArray);
                    var firstCardName = hand[firstSubArray[0]].getCardName(true);
                    var secondCardName = hand[secondSubArray[0]].getCardName(true);
                    var matchCount = firstSubArray.length + secondSubArray.length;

                    if (matchCount === 5) { // full house
                        topRankedHand = 6;
                        bestHand = (firstSubArray.length > secondSubArray.length) ?
                            Messages.hands.fullHouse(firstCardName, secondCardName) :
                            Messages.hands.fullHouse(secondCardName, firstCardName);

                    } else { // two pair
                        topRankedHand = 2;
                        bestHand = Messages.hands.twoPair(firstCardName, secondCardName);
                    }
                }
            }


            // ending of function
            return [bestHand, toHighlight, topRankedHand]; // [ '', [1,2,5], 4 ]


        };

        function highlightAll(){
            return [0,1,2,3,4];
        }
        // returns [Int, Str, [Int]]
        function analyzeNoMatches(hand){
            var flush = o.flushDetector(hand);
            var straight = o.straightDetector(hand);
            var tRankedHand;
            var bHand;
            var tHighlight;

            if (flush && straight) {
                tRankedHand = 8;
                // TODO: Here we need to fix for when ace is the low card
                bHand = Messages.hands.straightFlush(getHighCard(hand, undefined, true)[0]);
                tHighlight = highlightAll();
            } else if (!flush && !straight) { //if no flush or straight we need a high card
                var highC = getHighCard(hand, undefined, true);
                bHand = highC[0].getCardName(true);
                tHighlight = highC[1];
            } else if (flush) {
                tRankedHand = 5;
                tHighlight = all;
                bHand = Messages.hands.flush(getHighCard(hand,undefined,true)[0]);
            } else { // straight
                tRankedHand = 4;
                tHighlight = highlightAll();
                bHand = Messages.hands.straight(getHighCard(hand));
            }
            // return [top ranked hand: Int, best Hand: Str, to highlight: Array[Int]]
            return [tRankedHand, bHand, tHighlight];
        }

        // converts ace to -1 instead of 12 for low straights if 2nd optional parameter is true
        function maybeAceToLow(value, doIt) {
            if (doIt && value === 12) {
                return -1;
            } else {
                return value;
            }
        }

        // generates string that says full hou
        function fullHouseStringGen(){

        }


        // takes hand and returns an array with one or two subarrays of indexes
        // ---(if one array and empty no match)
        // ---(if one array and full then matches at those indexes and user has either a pair or three of a kind)
        // ---(if two arrays (then matches at those indexes and user has either two pair or full house)
        // prevMatched is an array of indexes where it previously matched
        function howManyMatchesOfWhat(hand, prevMatched, indexes) {
            console.log('*****BEGIN*****');
            var matchingOn = prevMatched;
            var container = []; // holds matches array(s)
            var matches;
            // make collection of indexes where there are matches
            //
            var vals = mapValues(hand);
            console.log('this is vals', vals);
            vals.every(function(cardVal, i){
                if (vals.length === i + 1) return false; // just to break loop

                // continue loop at next iteration - but we don't care about this number as it's already been matched
                console.log(cardVal === matchingOn);
                if (cardVal === matchingOn) return true;
                console.log('2: ', cardVal === matchingOn);

                // find if there is a match on the current card value
                var indexMatch = vals.slice(i + 1).indexOf(cardVal);
                if (indexMatch !== -1) { // if another value found later on
                    matchingOn = cardVal;
                    return false; //breaks loop
                } else {
                    return true;
                }
            });
            if (matchingOn !== prevMatched) {
                var mappedValsToIndexes = vals.map(function(val, i){
                    if (val === matchingOn) {
                        return i;
                    } else {
                        return 'delete me';
                    }
                });
                matches = mappedValsToIndexes.filter(function(val){
                    return val !== 'delete me';
                });
            }



            if (matchingOn !== undefined && prevMatched === undefined) { // if a mach found && first run through
                // call loop again to look for any other pairs
                return howManyMatchesOfWhat(hand, matchingOn, matches);
            // if another match found and second run through
            } else if (matchingOn !== undefined && prevMatched !== undefined && matchingOn !== prevMatched) {
                container.push(indexes);
                container.push(matches);
                return container;
            } else if (prevMatched !== undefined) { // if no other match found on second run through
                container.push(indexes);
                return container;
            } else {
                container.push(matches);
                return container;
            }

            //// looks if there are anymore of x in the array - returns matches if nothing found / matches.push(index) if found
            //function anyMore(x, arr, matches){
            //    var indexFound = arr.indexOf(x);
            //    if (indexFound !== -1) { // if find another return index; else return -1
            //        matches.push(indexFound);
            //        arr.splice(indexFound, 1);
            //        return anyMore(x, arr, matches);
            //    } else {
            //        return matches;
            //    }
            //}
        }


       function getHighCard(hand, isAceLow, getIndex) {
           var index = 0;
           var highCard = maybeAceToLow(hand[0].getCardValue(), isAceLow);
           hand.slice(1).forEach(function(card, i){
                // determine if current card is higher than all previous cards
                var tempCardValue = maybeAceToLow(card.getCardValue(), isAceLow);
                if (tempCardValue > highCard) {
                    highCard = tempCardValue;
                    index = i + 1;
                }
           });
           if (getIndex) {
               return [hand[index], index];
           } else {
               return highCard;
           }
        }
        function getLowCard(hand, isAceLow){
            var lowCard = maybeAceToLow(hand[0].getCardValue(), isAceLow);
            hand.slice(1).forEach(function(card){
                // determine if current card is higher than all previous cards
                var tempCardValue = maybeAceToLow(card.getCardValue(), isAceLow);
                if (tempCardValue < lowCard) {
                    lowCard = tempCardValue;
                }
            });
            return lowCard;
        }
        // changes array of Cards into array of their numerical values
        function mapValues(hand) {
            return hand.map(function(card){
                return card.getCardValue();
            });
        }

        function noAces(hand) {
            return hand.every(function(card){
                return card.getCardValue() !== 12;
            });
        }

        // tells if any of the cards are the same value (ex. two 7s) returns true if finds pair/3/4
        o.matchFound = function(hand) {
            // convert Card objects into just their values
            var values = mapValues(hand);
            // just looking for any match here
            var noMatch = hand.every(function(card, i){
                if (i + 1 === hand.length) { // skip as we are looking at last card that cannot match anything
                    return true;
                } else {
                    return values.slice(i + 1).indexOf(card.getCardValue()) === -1; // false when matching card found
                }
            });
            return ! noMatch;
        };

        // returns false or the numerical value of the highest held flush card - will not run if match found
        o.flushDetector = function(hand) {

            var suit = hand[0].getSuitValue();
            var hasFlush = hand.slice(1).every(function(card){
                return suit === card.getSuitValue();
            });

            if (hasFlush) {
                return getHighCard(hand);
            } else {
                return false;
            }
        };

        // returns false or the numerical value of the highest held straight card - will not run if match found
        // function gets called twice one each time with ace considered high and ace considered low
        o.straightDetector = function(hand, isAceLow) {
            // get high card and see if there is a straight -- NOTE: Ace:12 can also be -1 for -1,0,1,2,3 straight
            var highCard = getHighCard(hand, isAceLow);
            var lowCard = getLowCard(hand, isAceLow);
            if (lowCard + 4 === highCard) {
                // straight
                return highCard;
            } else if (!noAces(hand) && !isAceLow) { // if we haven't considered low aces and an ace is present
                return o.straightDetector(hand, true);
            } else {
                return false;
            }
        };
        return o;
    }
})();