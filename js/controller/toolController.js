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
			vm.pageSize = 10;
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
			var url = urlObject.urlMonitorRest+"/aggregate?projection=name&projection=homepage&skip="+skip+'&limit='+limit;
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

			// vm.chunks.push(vm.allData(tools.data))
			// vm.toolsArray = [].concat.apply([], vm.chunks);
			// $rootScope.array = [].concat.apply([], vm.chunks);
			// vm.loadingDisplay = 1
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
			$window.open($location.absUrl()+tool._id._id, "_blank");
		};

		// vm.allData= function (tool){
		// 	var array = []
		// 	for (var i = 0; i < tool.length; i++) {
		// 		array.push(vm.initTool(tool[i]));
		// 	}
		// 	return array
		// }


		// /**
		// @name initInstance
		// @description Creats new instances of a tool and returns the instance
		// @param tool is the response data from the Api
		// @param i is the posistion
		// @version 1.0
		// @author Vicky Sundesha
		// */
		// vm.initInstance = function (tool){
		// 	var instance = new Instance();
		// 	// if(tool['@type']){
		// 	// 	instance.setType(tool['@type'])
		// 	// }
		// 	if(tool.version){
		// 		instance.setVersion(tool.version)
		// 	}
		// 	if(tool.publications){
		// 		instance.setPublication(tool.publications)
		// 	}
		// 	if(tool.repositories){
		// 		instance.setRepo(tool.repositories)
		// 	}
		// 	if(tool.documentation){
		// 		instance.setDocs(tool.documentation)
		// 	}
		// 	return instance;
		// }


		// /**
		// @name checkName
		// @description checks if the tool name exists
		// @param tool is the response data from the Api
		// @param i is the posistion
		// @version 1.0
		// @author Vicky Sundesha
		// */
		// vm.checkName = function (i,tool){
		// 	return tool[i].name != tool[i-1].name ? false : true;
		// }


		/**
		@name initTool
		@description Creats new tool and returns the tool
		@param tool is the response data from the Api
		@param i is the posistion
		@param instance is are the diffrent instances of the tool web,cmd,app etc..
		@version 1.0
		@author Vicky Sundesha
		*/
		// vm.initTool = function (tool){
		// 	var toolBasicDetails = new Tool();
		// 	toolBasicDetails.setId(tool['@id']);
		// 	toolBasicDetails.setType(tool['@type']);
		// 	toolBasicDetails.setName(tool.name);
		// 	toolBasicDetails.setDesc(tool.description);
		// 	toolBasicDetails.setLink(tool.homepage);
		// 	toolBasicDetails.setContact(tool.contacts);
		// 	toolBasicDetails.setCredits(tool.credits);
		// 	var urlToBioTools = "";
		// 	var urlToBioTools = "https://bio.tools/"+tool.name.replace(/[\s]/g,"_");
		// 	toolBasicDetails.setLinkToBioTool(urlToBioTools);
		// 	toolBasicDetails.setInstance(instance);
		// 	return toolBasicDetails;
		// }

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
