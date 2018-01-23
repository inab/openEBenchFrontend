/**
@name profileController.js
@description home page controller
@version 1.0
@date 09/06/2017
@author Vicky Madan Sundesha
*/

//Angular code
(function() {
    'use strict';



		/**
		@name controller function
		@description controls the profile-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function profileController ($scope,$rootScope,dataService,$location,$window){
            var vm = this

            vm.name = $location.search().name
            vm.loadDisplay = 0;
            vm.section = 1;
            vm.section = 0;


            vm.isActive = function () {
                return active;
            }
		 }

         profileController.$inject = ['$scope','$rootScope','dataService','$location','$window']

        angular.module('elixibilitasApp')
        .controller("profileController",profileController)

})();
