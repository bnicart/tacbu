angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function() {
    console.log("LOGIN!")
    $state.go('tab.newsfeed')
  }
})

.controller('ActivityCtrl', function($scope, $state, $ionicHistory, Activity) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.activity = Activity.show(parseInt($state.params.id))
})

.controller('NewsFeedCtrl', function($scope, $state, Activity) {
  // $scope.newsfeeds = Activity.all('newsfeed');
  $scope.newsfeeds = Activity.newsfeed();
  console.log($scope.newsfeeds);
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
