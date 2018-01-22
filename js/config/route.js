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
            .when("/tool/:id",{
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
            .when("/profile/", {
                templateUrl : "view/template/user-profile-page.html"
            })
            .when("/about/", {
                templateUrl : "view/template/about-page.html"
            })
            .when("/opebapi/", {
                templateUrl : "view/template/opebapi-page.html"
            })
            .otherwise({redirectTo:'/'})
    }
})();
