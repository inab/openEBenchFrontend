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
	function statsController ($scope, $http, $window, $rootScope, $anchorScroll, $location, $q ,dataService, errorService,$interval){

		var vm = this;

		vm.loadingDisplay = 0;
		vm.typeArray = [];
		vm.statistics = [];


		var url = 'https://elixir.bsc.es/tools/statistics/';
		dataService.getData(url)
			.then(function (response){
				vm.orderStats(response.data);
			}).catch(function(error){
				// vm.createMsg(error);
				vm.error = error;
				vm.loadingDisplay = 2;
			});

		vm.orderStats = function (statistics){

			for (var stats in statistics) {
				var tt = new Tooltype();
				tt.construct(stats,statistics[stats].total,statistics[stats].operational,statistics[stats].total-statistics[stats].operational);
				// console.log(tt);
				vm.statistics.push(tt);
			}
			vm.do();
		}

		vm.do = function () {
		   	//Chart 1
			vm.chart1= new Chart();
			var object = vm.statistics;
			var ope = [];
			var notOpe = [];
			var labels = [];
			var data = [];
			var total = [];
			var o = 0;
			var no = 0;
			var options = {
				title: {
					display: false
				},
				// tooltips: {
					// enabled:false,
		            // custom: function(tooltipModel) {
		                // Tooltip Element
		        //         var tooltipEl = document.getElementById('chartjs-tooltip');
				//
		        //         // Create element on first render
		        //         if (!tooltipEl) {
		        //             tooltipEl = document.createElement('div');
		        //             tooltipEl.id = 'chartjs-tooltip';
		        //             tooltipEl.innerHTML = "<table></table>"
		        //             document.body.appendChild(tooltipEl);
		        //         }
				//
		        //         // Hide if no tooltip
		        //         if (tooltipModel.opacity === 0) {
		        //             tooltipEl.style.opacity = 0;
		        //             return;
		        //         }
				//
		        //         // Set caret Position
		        //         tooltipEl.classList.remove('above', 'below', 'no-transform');
		        //         if (tooltipModel.yAlign) {
		        //             tooltipEl.classList.add(tooltipModel.yAlign);
		        //         } else {
		        //             tooltipEl.classList.add('no-transform');
		        //         }
				//
		        //         function getBody(bodyItem) {
		        //             return bodyItem.lines;
		        //         }
				//
		        //         // Set Text
		        //         if (tooltipModel.body) {
		        //             var titleLines = tooltipModel.title || [];
		        //             var bodyLines = tooltipModel.body.map(getBody);
				//
		        //             var innerHtml = '<thead>';
				//
		        //             titleLines.forEach(function(title) {
		        //                 innerHtml += '<tr><th>' + title + '</th></tr>';
		        //             });
		        //             innerHtml += '</thead><tbody>';
				//
		        //             bodyLines.forEach(function(body, i) {
		        //                 var colors = tooltipModel.labelColors[i];
		        //                 var style = 'background:' + colors.backgroundColor;
		        //                 style += '; border-color:' + colors.borderColor;
		        //                 style += '; border-width: 2px';
		        //                 var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
		        //                 innerHtml += '<tr><td>' + span + body + '</td></tr>';
		        //             });
		        //             innerHtml += '</tbody>';
				//
		        //             var tableRoot = tooltipEl.querySelector('table');
		        //             tableRoot.innerHTML = innerHtml;
		        //         }
				//
		        //         // `this` will be the overall tooltip
		        //         var position = this._chart.canvas.getBoundingClientRect();
				//
		        //         // Display, position, and set styles for font
		        //         tooltipEl.style.opacity = 1;
		        //         tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
		        //         tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
				// 		tooltipEl.style.fontFamily = tooltipModel._fontFamily;
		        //         tooltipEl.style.fontSize = tooltipModel.fontSize;
		        //         tooltipEl.style.fontStyle = tooltipModel._fontStyle;
		        //         tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
		        //     }
				// },
				tooltips : {
					titleFontSize : 26,
					bodyFontSize : 20,
					bodySpacing : 4,
				},
				legend: {display: true, position: 'bottom'},
				scales: {
					xAxes: [{
						stacked: true,
					}],
					yAxes: [{
						stacked: true,
					}],

				},
			};
			object.sort(function (a,b){
				return b.total-a.total;
			})
			for (var b of object){
				if(b.total>100){
					labels.push(b.type.toUpperCase());
					ope.push(b.operational);
					notOpe.push(b.notOperational);
				} else {
					o = o+b.operational;
					no = no+b.notOperational;
				}
				// total.push(b.total);
			}
			ope.push(o);
			notOpe.push(no);
			labels.push("OTHERS");
			data.push(ope,notOpe);
			vm.chart1.construct("bar",labels,data,['Operational', 'Not Operational'],['#45b7cd', '#ff6384',"#ffffff"],options)
			vm.loadingDisplay=1;
		}



		$scope.$watch(()=>vm.type, function(newValue, oldValue){
			if (newValue !== oldValue) {
				for (var j of vm.statistics) {
					Object.keys(j).forEach(function(key) {
						  if (j[key] == newValue) {
						    vm.chart1.setData([j.operational,j.notOperational]);
						  }
					});
				}
			}
		});


		vm.options = {legend: {display: true, position: 'bottom'}};

		/**
		@name createMsg
		@description creates div with error message
		@version 1.0
		@author Vicky Sundesha
		@return messageToDisplay this is the the code that is displayed when there is an error
		*/
		vm.createMsg = function (code){
			console.log(code);
			vm.loadingDisplay = 2;
			vm.message = errorService.error(code);
		}







};
		statsController.$inject = ['$scope','$http', '$window','$rootScope','$anchorScroll', '$location', '$q' ,'dataService', 'errorService', '$interval']

	angular
	.module('elixibilitasApp')
	.controller("statsController", statsController)



})();
