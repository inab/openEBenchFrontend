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
				vm.badge = url.split(/tool\/(.*):/)[1];
				// _do();
				vm.type="bar";
				vm.data = [1,-1,1,1,-1];
				vm.labels = ["10/11","11/11","12/11","13/11","14/11"];
				vm.colors = ['#5CB85C','#D9534F','#5CB85C','#5CB85C','#D9534F'];
				vm.options = {
					title: {
						display: false
					},
					scales:{
			            yAxes: [{
			                gridLines : {
			                    display : false
			                },
							maxBarThickness: 100
			            }],

						xAxes: [{
							categoryPercentage: 1.0,
	            			barPercentage: 1.0
						}]
			        },
					tooltips:{
						enabled:false
					},
					scaleStepWidth: 1
				}

			}).catch(function (error){
				vm.error = error;
				vm.loadingDisplay=2
			})
		}



		vm._do = function () {


		}

    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
