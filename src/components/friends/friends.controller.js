'use strict';

angular.module('omw')
	.controller('FriendsCtrl', FriendsCtrl);

FriendsCtrl.$inject = [];

function FriendsCtrl() {
	var vm = this;

	vm.friends = [];

	var friend1 = {
		lastName: 'R',
		username: 'steve',
		location: {},
		firstName: 'Steve'
	}

	var friend2 = {
		lastName: 'S',
		username: 'SamS',
		location: {},
		firstName: 'Sam'
	}

	vm.friends.push(friend1);
	vm.friends.push(friend2);
}