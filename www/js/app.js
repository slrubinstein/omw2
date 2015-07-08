angular.module('omw', ['ionic', 'starter.controllers', 'starter.services'])

.constant('apiEndpoint', {
  url: /*gulp-replace-apiUrl*/'local'/*end*/
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'components/login/login.html',
    controller: 'LoginCtrl as login'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl as home'
      }
    }
  })

    .state('tab.omw-detail', {
      url: '/home/:omwId',
      views: {
        'tab-home': {
          templateUrl: 'components/home/omw-detail/omw-detail.html',
          controller: 'OmwDetailCtrl as omw'
        }
      }
    })

  .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'components/map/map.html',
          controller: 'MapCtrl'
        }
      }
    })
  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'components/friends/friends.html',
        controller: 'FriendsCtrl as friends'
      }
    }
  })
    .state('tab.friend-detail', {
      url: '/friends/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'components/friends/friend-detail/friend-detail.html',
          controller: 'FriendDetailCtrl as friendDetail'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  $httpProvider.interceptors.push('authInterceptor');
})

.factory('authInterceptor', function($rootScope, $q, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorage.getItem('token')) {
        // config.headers.Authorization = 'Bearer ' + localStorage.getItem('cookie');
        config.headers['Cookie'] = localStorage.getItem('cookie');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/');
        // remove any stale tokens
        localStorage.clear();
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
});
angular.module('omw')
	.factory('dataService', dataService);

function dataService($http, apiEndpoint) {

	return {
		getItems: getItems,
		createItem: createItem
	}

	function getItems() {
		return $http.get(apiEndpoint.url + '/api/items');
	}

	function createItem(item) {
		return $http.post(apiEndpoint.url + '/api/items', item);
	}
}
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicSlideBoxDelegate, $http) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

angular.module("omw").run(["$templateCache", function($templateCache) {$templateCache.put("templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n\n\n");
$templateCache.put("templates/tab-account.html","<ion-view view-title=\"Account\">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model=\"settings.enableFriends\">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-dash.html","<ion-view view-title=\"Dashboard\">\n  <ion-content class=\"padding\">\n    <div class=\"list card\">\n      <div class=\"item item-divider\">Recent Updates</div>\n      <div class=\"item item-body\">\n        <div>\n          There is a fire in <b>sector 3</b>\n        </div>\n      </div>\n    </div>\n    <div class=\"list card\">\n      <div class=\"item item-divider\">Health</div>\n      <div class=\"item item-body\">\n        <div>\n          You ate an apple today!\n        </div>\n      </div>\n    </div>\n    <div class=\"list card\">\n      <div class=\"item item-divider\">Upcoming</div>\n      <div class=\"item item-body\">\n        <div>\n          You have <b>29</b> meetings on your calendar tomorrow.\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>");
$templateCache.put("templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"Status\" icon-off=\"ion-ios-pulse\" icon-on=\"ion-ios-pulse-strong\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Chats Tab -->\n  <ion-tab title=\"Chats\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n    <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Account Tab -->\n  <ion-tab title=\"Account\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n");
$templateCache.put("components/friends/friends.html","<ion-view view-title=\"Friends\">\n  <ion-content>\n  	<ul class=\"list\">\n		  <a href=\"#/tab/friends/{{friend.id}}\"\n		  	 class=\"item item-icon-left item-icon-right\"\n		  	 ng-repeat=\"f in friends.friends\">\n		    <i class=\"icon ion-home\"></i>\n		    	{{f.username}}\n		    <i class=\"icon ion-ios-navigate\"></i>\n		  </a>\n		</ul>\n  </ion-content>\n</ion-view>");
$templateCache.put("components/login/login.html","<ion-view view-title=\"Login\">\n  <ion-content>\n    <h1>Main</h1>\n    <button ng-click=\"login.login()\">Log in</button>\n    <button ng-click=\"login.go()\">state go</button>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("components/signin/signin.html","");
$templateCache.put("components/map/map.html","<ion-view view-title=\"Map\">\n  <ion-content>\n  	<h1>map</h1>\n  </ion-content>\n</ion-view>");
$templateCache.put("components/home/home.html","<ion-view view-title=\"Home\">\n  <ion-content>\n  	<ul class=\"list\">\n		  <a href=\"#/tab/home/{{omw.id}}\"\n		  	 class=\"item item-icon-left item-icon-right\"\n		  	 ng-repeat=\"omw in home.omws track by $index\">\n		    <i class=\"icon ion-home\"></i>\n		    	{{omw.to}}\n		    <i class=\"icon ion-ios-navigate\"></i>\n		  </a>\n		</ul>\n  </ion-content>\n</ion-view>");
$templateCache.put("components/friends/friend-detail/friend-detail.html","<ion-view view-title=\"\">\n  <ion-content class=\"padding\">\n    <p>\n    	friend details\n    </p>\n    <p>{{friendDetail.friend}}</p>\n    <button ng-click=\"friendDetail.sendOmw()\">Send an OMW</button>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("components/home/omw-detail/omw-detail.html","<ion-view view-title=\"\">\n  <ion-content class=\"padding\">\n    <p>\n    	omw details\n    </p>\n  </ion-content>\n</ion-view>\n");}]);
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
'use strict';

angular.module('omw')
	.controller('MapCtrl', MapCtrl);

MapCtrl.$inject = [];

function MapCtrl() {

}
'use strict';

app.controller('SigninCtrl', SigninCtrl);

SigninCtrl.$inject = [];

function SigninCtrl() {
	console.log('home ctrl');
}
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
