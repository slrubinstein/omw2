angular.module('omw')

.factory('userService', userService);

function userService() {

	var session = {id: []}

	return {
		session: session,
		setSession: setSession
	}

	function setSession(id) {
		session.id.push(id);
	}

}