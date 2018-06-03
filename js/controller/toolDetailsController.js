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
			vm.loadingDisplay=0;
			vm.tools = null;
			vm.versionSelected = "";
			vm.tags = [];
			vm.chartavailable=0;
			vm.dataServiceFunction(vm.parseUrl())
			vm.loadCharts();
		}
		vm.loadCharts = function (){
			setTimeout(() => {
				loadChart()
				loadCitationChart()
			}, 600);
		}
		vm.parseUrl = function (){
			var urlSplit = $location.absUrl().split("/");
			return urlObject.urlMonitorRest+"/aggregate?id="+urlSplit[urlSplit.length-1];

		}


		vm.addAlert = function() {
			vm.alerts= [];
			vm.alerts.push({msg: 'Your request has been accepted ! Thank you !'});
		};

		vm.closeAlert = function(index) {
			vm.alerts.splice(index, 1);
		};

		vm.onOptionChange = function(_id){
			vm.getMetrics(_id);
			vm.f = _id.split("/");
			vm.f = _id.split("/tool/")[1]
			// console.log(vm.f)
			setTimeout(()=> {
				loadCitationChart()
			},600)
		}

		

		vm.dataServiceFunction = function (url){
			dataService.getData(url)			
				.then(function (response){
					
					vm.theData = angular.copy(response.data);
					

					vm.versionSelected = vm.theData[0].entities[0].tools[vm.theData[0].entities[0].tools.length-1];
					// console.log(vm.versionSelected);
					var ary= [];
					vm.theData[0].entities[0].tools.forEach(element => {
						if(!isInArray(ary,element['@id'].split('/tool/')[1].split(':')[0])){
						var link;
						if(element['@id'].split('/tool/')[1].split(':')[0]=='bio.tools'){
							link = 'https://bio.tools/'+element['@id'].split('/tool/')[1].split(':')[1];
							
						} else if(element['@id'].split('/tool/')[1].split(':')[0]=='bioconda'){
							link = 'https://anaconda.org/bioconda/'+element['@id'].split('/tool/')[1].split(':')[1];
							
						} else {
							link = "";
							
						}
						var tool = {
							'source' : element['@id'].split('/tool/')[1].split(':')[0],	
							'toolid' : element['@id'].split('/tool/')[1].split(':')[1],	
							'version' : element['@id'].split('/tool/')[1].split(':')[2],
							'link' : link
							
						};
						ary.push(element['@id'].split('/tool/')[1].split(':')[0]);
						vm.tags.push(tool);
						}
					});

					function isInArray(ary, a) {
						return ary.indexOf(a.toLowerCase()) > -1;
					}
					
					var f = vm.versionSelected['@id'].split("/");	
								
					vm.f = vm.versionSelected['@id'].split("/tool/")[1]
					
					
					vm.getMetrics(vm.versionSelected['@id'])
					// vm.getDataFromJsonFile(vm.versionSelected['@id'])
					vm.loadDisplay=1
				
				}).catch(function (error){
					vm.error = error;
					vm.loadingDisplay=2;
				})
		}

		

		vm.getMetrics = function (u){
		
			var url = u.replace("/tool/","/metrics/");
			
			dataService.getData(url)
				.then(function (response){
					vm.metricsData = response.data;
					// console.log(vm.metricsData);
				}).catch(function (error){
					vm.error = error;
					vm.loadingDisplay=2;
				})
		}


		vm.toTools = function (data){
			vm.tools = [];
			for (var i = 0; i < data.length; i++) {
				var tool = new Tool();
				tool.setName(data[i].name);
				tool.setId(data[i]['@id']);
				tool.setDesc(data[i].description);
				tool.setType(data[i]['@type']);
				tool.setLinkToBioTool(vm.bioToolsLink(data[i]['@id']));
				tool.setVersion(data[i].version);
				tool.setPublications(data[i].publications);
				
				tool.setLink(data[i].homepage);

				vm.tools.push(tool);
			}
		}


		vm.bioToolsLink = function (url){

			var res = url.split("/")[5];
			var a = res.split(":")
			return "https://bio.tools/"+a[1];
		}

	

		vm.publicationLinks = function (key,value){

			var res = ""
			if(key=="pmid"){
				window.open("https://www.ncbi.nlm.nih.gov/pubmed/"+value);
			}else if(key=="doi"){
				window.open("https://doi.org/"+value);
			} else {
				res = value;
			}
		}



    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
