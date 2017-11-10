(function() {
    'use strict';

    angular
        .module('elixibilitasApp')
        .directive('badgeTag', badgeTag);

        function badgeTag (){
            var scope = {
                badge : '='
            }
            var directive = {
                restrict : 'EA',
                scope : scope,
                templateUrl : 'view/template/badge-template.html'
            }
            return directive;

        }

})();
