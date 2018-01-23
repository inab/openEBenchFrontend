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
			// vm.versionSelected = "";
			vm.dataServiceFunction(vm.parseUrl());
		}



		// $scope.$watch(()=>vm.versionSelected, function(newValue, oldValue){
		// 	console.log(vm.versionSelected['@id']);
		// });

		vm.versionSelectedfun = function (i){
			vm.versionSelected = vm.theData[0].entities[0].tools[i];
				vm.getMetrics(vm.theData[0].entities[0].tools[i]['@id']);
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

		vm.dataServiceFunction = function (url){
			dataService.getData(url)
				.then(function (response){
					vm.theData = angular.copy(response.data);

					vm.versionSelected = vm.theData[0].entities[0].tools[vm.theData[0].entities[0].tools.length-1];
					vm.datasetUptimeChart(vm.theData[0].entities[0].tools[0]['@id']);
					vm.getMetrics(vm.versionSelected['@id'])
					vm.loadDisplay=1
				}).catch(function (error){
					vm.error = error;
					vm.loadingDisplay=2;
				})
		}

		vm.getMetrics = function (u){
			var url = u.replace("/tool/","/metrics/");
			// console.log(url);
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

		vm.datasetUptimeChart = function (url){
			dataService.getData(vm.lastSeen(url))
				.then(function (response){

					var res = angular.copy(response.data)
					vm.generateDataForUpTimeChart(response.data);
					// return response.data;
				}).catch(function (error){
					vm.error = error;
				})
		}

		vm.generateDataForUpTimeChart = function (objects){

			vm.arrayUptime = [];
			if (objects.length>1){

				var res = vm.createDataForUptimeCharts2(objects);
				res.pop();
				var a = vm.createDataForUptimeCharts(objects[objects.length-1].date, vm.parsevalue(objects[objects.length-1].value));
				var b = res.concat(a);

				vm.arrayUptime = b.slice(Math.max(b.length - 5, 1));


			}
			else {

				var c = vm.createDataForUptimeCharts(objects[objects.length-1].date, vm.parsevalue(objects[objects.length-1].value));

				vm.arrayUptime = c.slice(Math.max(c.length - 5, 1));

			}

		}
		vm.parsevalue = function (ae){
			if(ae=="200")
			{
				return "1";
			}else{
				return "0";
		  	};
		}
		vm.createDataForUptimeCharts2 = function (objects){
			var x = [];
			var arrayTmpUptime = [];

				for (var i = 0; i < objects.length-1; i++) {
					var a =  objects[i].date;
					var b = objects[i+1].date;

					var dateArray = vm.getDates(new Date(a),new Date(b)) ;
					if(i!=objects.length-2){
						dateArray.pop();
					}
					for (var j in dateArray) {
						arrayTmpUptime.push({'date' : dateArray[j].toISOString().split("T")[0], "status": vm.parsevalue(objects[i].value)});
					}
				}
			return arrayTmpUptime;
		}

		vm.getDates = function(startDate, endDate) {
		var dates = [],
		  currentDate = startDate,
		  addDays = function(days) {
		    var date = new Date(this.valueOf());
		    	date.setDate(date.getDate() + days);
		    return date;
		  };
		while (currentDate <= endDate) {
			dates.push(new Date(currentDate));
			currentDate = addDays.call(currentDate, 1);
		}
		return dates;
		};

		vm.createDataForUptimeCharts = function (d, val) {
			var arrayTmpUptime = [];
			var a = new Date(); //Todays Date
			var b = new Date(d); // last seen last date
			var array = vm.getDates(b,a);

			var arrayTmpUptime = [];

			for (var j in array) {

				arrayTmpUptime.push({'date' : array[j].toISOString().split("T")[0], "status": val});
			}
			return arrayTmpUptime;
		}




		vm.checkIfEmail = function (value){
			return $rootScope.emailRegex.test(value);
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

		vm.lastSeen= function (url){

			var res = url.split("/");
			var a = res[5]+"/"+res[6]+"/"+res[7];
			var b = urlObject.urlMonitorMetrics+"/log/"+a+"/project/website/operational";

			return b;
		}


    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
