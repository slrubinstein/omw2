'use strict';

var app = angular.module('omw')
	.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['dataService', 'userService'];

function HomeCtrl(dataService, userService) {
	var vm = this;

	vm.omws = [];

	activate();
	// fakeData();

	function activate() {
		dataService.getOmws()
		.then(function(res) {
			vm.omws = res.data;
		}, function(err) {
			console.log(err);
		});
	}

	// function fakeData() {
	// 	var omw1 = {
	// 	  "to": "home",
	// 	  "id": 1,
	// 	  "eta": 10,
	// 	  "confirmed": "string",
	// 	  "expired": "string",
	// 	  "transitType": "train",
	// 	  "created": new Date,
	// 	  "from": "work",
	// 	  "destination": {
	// 	  	name: 'home',
	// 	  	latLng: [41, 70]
	// 	  }
	// 	}
	// 	var omw2 = {
	// 	  "to": "pizza",
	// 	  "id": 2,
	// 	  "eta": 15,
	// 	  "confirmed": "string",
	// 	  "expired": "string",
	// 	  "transitType": "foot",
	// 	  "created": new Date,
	// 	  "from": "gym",
	// 	  "destination": {
	// 	  	name: 'Antonios',
	// 	  	latLng: [41, 70]
	// 	  }
	// 	}
	// 	vm.omws.push(omw1);
	// 	vm.omws.push(omw2);
	// }
}