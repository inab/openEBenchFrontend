(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .directive('stackedBarChart', stackedBarChart);

        function stackedBarChart (){
            var directive = {
                link : link,
                restrict : 'EA'
            }
            return directive;

             function link (scope, element, attrs){
                //  d3.select(element[0]).append('svg');


                 
             }

        }

})();
