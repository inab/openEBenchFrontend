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
			var a = $location.absUrl().split("/");
			var  url = "https://openebench.bsc.es/monitor/rest/search?id="+a[a.length-1];
			console.log(url);
			dataService.getData(url)
			.then(function (response){
				vm.responseData = response.data;
				vm.tools = vm.responseData;
				console.log(vm.tools);
				if(vm.tools=vm.responseData){
					vm.loadingDisplay=1;
				}
				// vm.loadUpTimeChart(url);
			}).catch(function (error){

				vm.error = error;
				vm.loadingDisplay=2
			})
		}

		vm.loadUpTimeChart = function (url){
			dataService.getData(vm.parseLink("last_seen",url))
				.then(function (response){
					vm.createUpTimeChartData(response.data);
				}).catch(function (error){
					vm.error = error;
				})
		}

		vm.createUpTimeChartData = function (data){
			var a = [];
			for (d of data) {
				d.value = 1;
				a.push(d);
			}
			setTimeout(function () {
				console.log(a);
				vm.data = a;
			}, 5000);

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

		vm.upChartData = function (url){
			dataService.getData(vm.parseLink("last_seen",url))
				.then(function (response){
					vm.data = ["a","b","c"];
				}).catch(function (error){
					vm.error = error;
					vm.loadingDisplay=2
				})

		}
		vm.parseLink = function (option,url){
			switch (option) {
				case "biotools":
					var res = url.split("/")[5];
					var a = res.split(":")
					$window.open("https://bio.tools/"+a[1]);
					break;
				case "last_seen":
					var a =""
					a = url.split(/.+\/tool\//);
					var res = "https://openebench.bsc.es/monitor/metrics/log/"+a[1]+"/project/website/last_check"
					return res;
					break;
				case option:
					break;
				default:

			}
		}

    };


	toolDetailsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService' ,'$routeParams']



	angular
	.module('elixibilitasApp')
	.controller("toolDetailsController", toolDetailsController);

})();
