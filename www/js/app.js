angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters', 'ion-datetime-picker'])

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
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

  .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tab-history.html',
          controller: 'HistoryCtrl'
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
