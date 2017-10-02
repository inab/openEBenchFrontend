/**
@name toolController.js
@description tool page controller
@version 1.0
@author Vicky Madan Sundesha
*/

//Angular code
(function (){
	'use strict';

	angular
		.module('elixibilitasApp')
		.controller("toolController", toolController);


	toolController.$inject = ['$scope','$http', '$window','$rootScope']
	/**
	@name toolController
	@description controls the tool-page.html page of the angular app.
	@version 1.0
	@author Vicky Sundesha
	*/
	function toolController ($scope, $http, $window, $rootScope){

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
			vm.edamArray = [];
			vm.toolDetails;
			vm.displayDetailsView = 0;
			vm.detailsToDisplayObjects = [];
			vm.basicDetails;

			//if $rootScope.array is empty
			if(!$rootScope.array){
				vm.getData();
			} else {
				//if $rootScope.array is full
				vm.toolsArray = $rootScope.array;
			}

		};

		/**
		@name getData
		@description getData fetches all tools in json format from the api and saves it to the $rootScope.array
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.getData = function (){
			// varcontact url = 'http://localhost/~vsundesh/openEBenchFrontend/json/tool.json'
			var url = 'https://elixir.bsc.es/tool'
			$http({
				method: 'GET',
				url: url,
			}).then(function successCallback(response){
					vm.toolsArray =  response.data;
					$rootScope.array = vm.toolsArray;
					console.log(vm.toolsArray);
			}, function errorCallback(response){
					// TODO: control errors
					console.log(response);
			});
		}



		/**
		@name showDetails
		@description showDetails is called when detailsvm.toolsArray =  response.data;
					$rootScope.array = vm.toolsArray;
					console.log(vm.toolsArray); button is clicked for everytool this iterates the semantics and send each semantic to this corisponding function.
		@version 1.0
		@author Vicky Sundesha
		*/
		vm.showDetails = function (tool){
			vm.detailsToDisplayObjects = [];
			vm.populateToolDetails(tool);
			var idSplit = tool['@id'];
			var pathname = new URL(idSplit).pathname;
			var url = "https://elixir.bsc.es/edam"+pathname;
			vm.getDetails(url);
		};

		vm.getDetails = function (url){
			$http({
				method: 'GET',
				url: url,
			}).then(function successCallback(response){
					vm.toolDetails = response.data;
					vm.seperateDetails(vm.toolDetails);
			}, function errorCallback(response){
					// TODO: control errors
					console.log(response);
			});
		};

		vm.populateToolDetails=function(tool){
			console.log(tool);
			var toolBasicDetails = new Detail();
			toolBasicDetails.setName(tool.name);
			toolBasicDetails.setLink(tool.homepage)
			toolBasicDetails.setType(tool['@type'])
			toolBasicDetails.setDesc(tool.description)
			if(tool.version){
				toolBasicDetails.setVersion(tool.version)
			}
			if(tool.publications){
				toolBasicDetails.setPublication(tool.publications)
			}
			if(tool.contacts){
				toolBasicDetails.setContact(tool.contacts)
			}
			vm.basicDetails = toolBasicDetails;
		}

		vm.seperateDetails = function (toolDetails){
			var object = toolDetails;
			var objectKeys = Object.keys(object);
			var i = 0;
			for (i = 0; i < objectKeys.length; i++) {
				switch (objectKeys[i]) {
					case "inputs" :

					case "operations" :

					case "outputs" :

					case "topics" :
						var edamArray = object[objectKeys[i]];
						vm.iterateEdamArray(edamArray,objectKeys[i]);
						break;
					default:

				};
			};
			if(i == objectKeys.length){
				vm.displayDetailsView = 1;
			}
		}


		vm.iterateEdamArray = function (edamArray,edamType){
				var j = 0;
				for ( j=0; j < edamArray.length; j++){
					vm.createDetailsView(edamArray[j],edamType)
				}
		};

		vm.createDetailsView = function (edamObject,edamType){

			// console.log(edamObject);
			var toolLabel;
			var toolComment;
			var formatLabel;
			var formatComment;

			toolLabel = edamObject.labels;
			toolComment = edamObject.comments;

			if(edamObject.formats){

				if(edamObject.formats[0]){
					formatLabel = edamObject.formats[0].labels;
					formatComment = edamObject.formats[0].comments;
				}
			}
			var edamDetailObject = new EdamDetail();
			// edamDetailObject.construct(edamType,toolLabel,toolComment,formatLabel,formatComment);
			edamDetailObject.setEdamType(edamType);
			edamDetailObject.setToolName(toolLabel);
			edamDetailObject.setToolComment(toolComment);
			edamDetailObject.setFormatLabel(formatLabel);
			edamDetailObject.setFormatComment(formatComment);
			vm.detailsToDisplayObjects.push(edamDetailObject)

		}
	}


})();