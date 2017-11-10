/**
@name toolDetailsController.js
@description tool page controller
@version 1.0
@author Vicky Sundesha
*/

//Angular code
(function (){
	'use strict';

	/**
	@name toolDetailsController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolDetailsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataService, errorService,  $routeParams){

		var vm = this;

		vm.loadInitData = function (){
			var  url = "https://elixir.bsc.es"+$location.path();
			dataService.getData(url)
			.then(function (response){
				vm.tool = response.data;
				vm.loadingDisplay=1;
				vm.badge = {name:url.split(/tool\/(.*):/)[1]};

			}).catch(function (error){
				vm.error = error;
				vm.loadingDisplay=2
			})
		}
    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
