'use strict';

// var angular = require('angular');

angular
    .module('elixibilitasApp')
    .directive('badgeTag', require('./badgeDirective'));

angular
    .module('elixibilitasApp')
    .directive('datasetDirective', require('./datasetDirective'));

angular
    .module('elixibilitasApp')
    .directive('errorMessage', require('./errorDirective'));

angular
    .module('elixibilitasApp')
    .directive('upTimeChart', require('./upTimeChartDirective'));
