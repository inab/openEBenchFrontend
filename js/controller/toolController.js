/**
@name toolController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';


	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q, dataService, errorService){

		var vm = this;


		/**
		@name loadInitData
		@description loadInitData starts the app variables with default values this is also where the the $rootScope.array is loaded
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.loadInitData = function() {
			vm.currentPage = 1;
			vm.pageSize = 5;
			vm.toolsArray = [];
			vm.displayDetailsView = 0;
			vm.basicDetails;
			vm.edamTerm = "";
			vm.sortKey;
			vm.reverse;
			vm.chunks=[];

			//if $rootScope.array is empty
			if(!$rootScope.array){
				var url = urlObject.urlMonitorRest+"/statistics/";
				dataService.getData(url)
					.then(function (response){
						vm.getChunks(response.data.all.total);
						$rootScope.typeArray = Object.keys(response.data);
						vm.loadingDisplay = 0;
					}).catch(function(error){
						vm.error = error;
						vm.loadingDisplay = 2;
					})


			} else {
				//if $rootScope.array is full
				vm.toolsArray = $rootScope.array;
				vm.loadingDisplay = 1;
			}

		};


		$('input').hover(elevated);


		function elevated(){
			$(this).toggleClass("elevated");
		}

		// get api in chunks
		vm.getChunks = function (totalTools){
			var skip = 0;
			var limit = totalTools;
			var size = 100;
			while(skip<size){
			vm.loopChunks(skip,limit);
				skip = skip + limit;
			}
		}



		//loop chunks
		vm.loopChunks = function(skip,limit){
			var url = urlObject.urlMonitorRest+"/aggregate?projection=description&projection=homepage&projection=name&skip="+skip+'&limit='+limit;
			// console.log(url);
			dataService.getData(url)
				.then(function (response){
					vm.pushData(response);
				}).catch(function(error){
					vm.error = error;
					vm.loadingDisplay = 2;
				})
		}


		//the data recived from api in places
		vm.pushData = function (tools){
		 	vm.chunks.push(tools.data)
			vm.toolsArray = [].concat.apply([], vm.chunks);
			$rootScope.array = [].concat.apply([], vm.chunks);
			vm.loadingDisplay = 1
		}

		//Sort name
		vm.sort = function (keyName){
			vm.sortKey = keyName;
			vm.reverse = !vm.reverse;
		}



		/**
		@name showDetails
		@description showDetails is called when details button is clicked for everytool this iterates the semantics and send each semantic to this corisponding function.
		@param tool for details.
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.showDetails = function (tool){
			console.log(tool)
			console.log(tool.id)
			$window.open($location.absUrl()+tool.id, "_blank");
		};

		vm.removeFilter = function () {
			vm.edamTerm = "";
			vm.toolsArray = $rootScope.array;
			// vm.loadingDisplay = 1;

		}

		vm.advancedSearch = function (){
			if(vm.edamTerm){
				var url = urlObject.urlEdamSearch+vm.edamTerm;
				dataService.getData(url)
					.then(function (response){
						vm.searchByEdam(response.data);
					}).catch(function(error){
						vm.error = error;
						vm.loadingDisplay = 2;
					})
			} else {
				vm.toolsArray = $rootScope.array;
			}


		}

		vm.searchByEdam = function (data){
			var toolArray = [];
			for (var i = 0; i < data.length; i++) {
				var tool;
				if($rootScope.array.find(tool => tool['_id'] === data[i]['@id'])){
					toolArray.push($rootScope.array[i]);
				}
			}
			if(i == data.length){
				vm.toolsArray = toolArray;
			}

		}

	}


	toolController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q', 'dataService', 'errorService']

	angular
	.module('elixibilitasApp')
	.controller("toolController", toolController);

})();
