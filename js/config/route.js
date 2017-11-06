/**
@name route.js
@description this takes care of url routes
@version 1.0
@author Vicky Madan Sundesha
*/

(function (){
    'use strict';
    angular
        .module('elixibilitasApp')
        .config(router);

    function router($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "view/template/home-page.html"
            })
            .when("/search/:search", {
                templateUrl : "view/template/search-page.html"
            })
            .when("/tool/", {
                templateUrl : "view/template/tool-page.html"
            })
            .when("/tool/:toolName/:toolType/:toolUrl",{
                templateUrl : "view/template/tool-details-page.html"
            })
            .when("/stats/", {
                templateUrl : "view/template/stats-page.html"
            })
            .when("/benchmarking/", {
                templateUrl : "view/template/bench-page.html"
            })
            .when("/benchmarking/:community", {
                templateUrl : "view/template/community-page.html"
            })
            .otherwise({redirectTo:'/'})
    }
})();
