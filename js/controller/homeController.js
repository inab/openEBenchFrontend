/**
@name homeController.js
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
		@description controls the home-page.html page of the angular app.
		@version 1.0
		@author Vicky Sundesha
		*/
		function homeController ($scope,$rootScope,dataService,$location,$window){
            var vm = this

            vm.loadInitData = function (){
                vm.loadingDisplay = 0;
                vm.data = [];
            }
            vm.search = function (search){
                var url =   "https://elixir.bsc.es/tools/search?text="+search+"&projection=name";
                dataService.getData(url)
                .then(function (response){
                vm.data = response.data;

                    vm.loadingDisplay = 1;
                }).catch(function (error){
                    console.log(error);
                })

            }

            vm.parseurl = function (a){
                console.log(a);
                console.log($location.absUrl()+a.split(/.+\/tool\//g)[1]);

                $window.open($location.absUrl()+"tool/"+a.split(/.+\/tool\//g)[1], "_blank");
            }
		 }

         homeController.$inject = ['$scope','$rootScope','dataService','$location','$window']

        angular.module('elixibilitasApp')
        .controller("homeController",homeController)
})();
