'use strict';

var app = angular.module('omw')
	.controller('OmwDetailCtrl', OmwDetailCtrl);

OmwDetailCtrl.$inject = ['$routeParams', 'dataService'];

function OmwDetailCtrl($routeParams, dataService) {
	var vm = this;

	vm.omw = {};
	vm.omwId = $routeParams.omwId;

	activate();

	function activate() {
		dataService.getOmwDetails(vm.omwId)
		.then(function(res) {
			vm.omw = res.data;
		}, function(err) {
			console.log(err);
		});
	}

}
