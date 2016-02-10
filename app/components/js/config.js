angular.module('myApp.config', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider) {
        $logProvider.debugEnabled(true);
        // remove pound sign for browsers that have html5
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
        //
        // For any unmatched url, redirect to /state1
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
                templateUrl: "components/views/aboutView.html"
            })
            .state('login', {
                url: "/login/",
                templateUrl: "components/views/loginView.html"
            });
});