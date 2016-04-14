angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('activity-details', {
      url: '/activity/:id',
      templateUrl: 'templates/activity/details.html',
      controller: 'ActivityCtrl'
    })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.newsfeed', {
    url: '/newsfeed',
    views: {
      'tab-newsfeed': {
        templateUrl: 'templates/tab-newsfeed.html',
        controller: 'NewsFeedCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.find = function (id) {
  return this.filter(function(a){
    if(a.id === id) { return a;}
  }).first()
};
