(function(){
    'use strict';

    angular
        .module('myApp')
        .config(config);


    function config($stateProvider, $urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(true);
        $urlRouterProvider.otherwise('/home/');

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home/",
                templateUrl: "components/views/homeView.html",
                controller: 'HomeController'
            })
            .state('rules', {
                url: "/rules/",
                templateUrl: "components/views/aboutView.html",
                controller: 'AboutController'
            })
            .state('login', {
                url: "/login/",
                templateUrl: "components/views/loginView.html"
            });
    }
})();