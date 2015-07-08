'use strict';

angular.module('omw')
	.controller('FriendDetailCtrl', FriendDetailCtrl);

FriendDetailCtrl.$inject = ['dataService'];

function FriendDetailCtrl(dataService) {
	var vm = this;
	var friend1 = {
		lastName: 'R',
		username: 'steve',
		location: {},
		firstName: 'Steve'
	}

	vm.friend = friend1;
	vm.sendOmw = sendOmw;




	function sendOmw(friend) {
		dataService.sendFriendOmw(vm.friend.username)
		.then(function(response) {
			console.log('response', response);
		}, function(error) {
			console.log('Error', error);
		});
	}

}