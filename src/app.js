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