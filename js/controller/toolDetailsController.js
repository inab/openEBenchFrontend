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
			vm.dataServiceFunction(vm.parseUrl());
		}

		vm.parseUrl = function (){
			var urlSplit = $location.absUrl().split("/");
			return urlObject.urlMonitorRest+"/search?id="+urlSplit[urlSplit.length-1];
		}

		vm.dataServiceFunction = function (url){
			dataService.getData(url)
				.then(function (response){
					var theData = angular.copy(response.data);
					vm.tools = theData;
					vm.bioToolsLink(vm.tools[0]['@id']);
					vm.datasetUptimeChart(vm.tools[0]['@id']);
					vm.loadDisplay=1
				}).catch(function (error){
					vm.error = error;
					vm.loadingDisplay=2;
				})
		}


		vm.logit = function (url){
			console.log(url);
		}

		vm.prueba = function(smt) {
			setTimeout(function() { console.log(smt+Date.now()); }, 1000);
		}
		vm.bioToolsLink = function (url){
			var res = url.split("/")[5];
			var a = res.split(":")
			vm.biolink = "https://bio.tools/"+a[1];
		}

		vm.datasetUptimeChart = function (url){
			dataService.getData(vm.lastSeen(url))
				.then(function (response){
					var res = angular.copy(response.data)
					vm.generateDataForUpTimeChart(response.data);
				}).catch(function (error){
					vm.error = error;
				})
		}

		vm.generateDataForUpTimeChart = function (objects){
			// console.log(objects);
			vm.arrayUptime = [];
			if (objects.length>1){
				console.log("many");
				vm.arrayUptime = vm.createDataForUptimeCharts2(objects);
				console.log(vm.arrayUptime);
			}
			else {
				console.log("one");
				vm.arrayUptime = vm.createDataForUptimeCharts(objects[0].date, objects[0].value);
			}

		}
		vm.createDataForUptimeCharts2 = function (objects){
			var x = [];
				var i = 0;
				var ary = [];
				for ( i; i < objects.length;) {

					var a = new Date(objects[i+1].date); //Todays Date
					var b = new Date(objects[i].date); // last seen last date
					var tmp = vm.getDates(b,a);
					var tmpAr = []
					for(var x of tmp){
						tmpAr.push({"date" : x.toISOString().split("T")[0], "status" : objects[i].value });
					}
					ary = [].concat.apply([], tmpAr);
					i = i+2;
					// console.log(getDates(objects[i].date,objects[i+1].date));
				}
				console.log(ary);
				var l = vm.createDataForUptimeCharts(objects[objects.length-1].date, objects[objects.length-1].value)
				console.log(l);
				return ary.concat(l);
		}
		vm.createDataForUptimeCharts = function (d, val) {
			var arrayTmpUptime = [];
			var a = new Date(); //Todays Date
			var b = new Date(d); // last seen last date
			var array = vm.getDates(b,a);
			var arrayTmpUptime = [];

			for (var j in array) {
				// console.log(array[j]);
				arrayTmpUptime.push({'date' : array[j].toISOString().split("T")[0], "status": val});
			}
			return arrayTmpUptime;
		}

		vm.getDates = function (startDate, stopDate) {
		    var dateArray = new Array();
		    var currentDate = startDate;
		    while (currentDate <= stopDate) {
		        dateArray.push(new Date (currentDate));
		        currentDate = currentDate.addDays(1);
		    }
			dateArray.push(new Date (stopDate));
		    return dateArray;
		}

		Date.prototype.addDays = function(days) {
		    var date = new Date(this.valueOf());
		    date.setDate(date.getDate() + days);
		    return date;
		}


		vm.checkIfEmail = function (value){
			return $rootScope.emailRegex.test(value);
		}

		vm.publicationLinks = function (key,value){
			console.log(key,value);
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
			console.log(url);
			var res = url.split("/");
			var a = res[5]+"/"+res[6]+"/"+res[7];
			var b = urlObject.urlMonitorMetrics+"/log/"+a+"/project/website/operational";
			console.log(b);
			return b;
		}


    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
