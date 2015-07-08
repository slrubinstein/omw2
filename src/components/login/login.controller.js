angular.module('omw')

.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state', '$timeout', 'userService'];

function LoginCtrl($scope, $state, $timeout, userService) {
	var vm = this;

	vm.go = go;
	vm.login = login;

	function login() {
  	var view = window.open('http://sleepy-ridge-8181.herokuapp.com/', '_blank', 'location=yes');
  	view.addEventListener('loadstop', retrieveCookie);
  	view.addEventListener('exit', windowClose);

    function retrieveCookie() {
      view.executeScript({code: 'document.URL'}, function(url) {
        var _url = url.toString();
          view.executeScript({code: 'document.cookie'}, function(cookie) {
            saveCookie(cookie);
          })
      })
		}

    // clean up listeners on window close
    function windowClose(event) {
      view.removeEventListener('loadstop', retrieveCookie);
      view.removeEventListener('exit', windowClose);
    }
  }

  function saveCookie(cookie) {
    vm.cookie = cookie;
    console.log('cookie', cookie)
    console.log('cookie 0', cookie[0])
    var token = cookie[0].slice(11);
    console.log('token', token)
    // localStorage.setItem('cookie', cookie);
    localStorage.setItem('cookie', cookie[0]);

    // var a = localStorage.getItem('cookie')
    var b = localStorage.getItem('cookie')
    // console.log('a', a)
    console.log('b', b)
    $scope.$apply();
  }


  function setCookie() {
    vm.storedCookie = localStorage.getItem('token');
  }

	function go() {
		$state.go('tab.home')
	}
}