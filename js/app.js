/**
    @name app.js
    @description app.js this is where you create the directives and add the modules for the angular js app !
    @version 1.0
    @author Vicky Sundesha
*/

var angular = require('angular');
var chartjs = require('angular-chart.js');
var angularUtilsdirectivesdirPagination = require('angular-utils-pagination');
var ngSanitize = require('angular-sanitize');
var uibootstrap = require('angular-ui-bootstrap');
var ngRoute = require ('angular-route')

(function() {
    'use strict';

    angular
        .module('elixibilitasApp', [
            chartjs,
            angularUtilsdirectivesdirPagination,
            ngSanitize,
            uibootstrap,
            ngRoute
        ]);

    require('./controller');
    require('./directives');
    require('./external/dirPagination.js');
    require('./factory');
    require('./factory/errorService');
    require('./model/Chart.js');
    require('./model/Instance.js');
    require('./model/Tool.js');
    require('./model/Tooltype.js');
    require('./model/url.js');
})();
