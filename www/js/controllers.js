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

.controller('NewsFeedCtrl', function($scope, $state, $ionicModal, $ionicLoading, Category, Location, Activity) {
  // $scope.newsfeeds = Activity.all('newsfeed');
  $scope.newActivityData = {};
  $scope.newsfeeds = [];
  $scope.categories = [];
  $scope.locations = [];
  $scope.isCreating = false;

  Activity.all().then(function(response) {
    $scope.newsfeeds = response.data;
  });

  Category.all().then(function(response) {
    $scope.categories = response.data;
  });

  Location.all().then(function(response) {
    $scope.locations = response.data;
  });

  $ionicModal.fromTemplateUrl('templates/activity/new.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openCreateActivityModal = function() {
    $scope.modal.show();
  }

  $scope.closeCreateActivityModal = function() {
    $scope.modal.hide();
  }

  $scope.createActivity = function() {
    var data = {
      activity: $scope.newActivityData
    }
    $scope.isCreating = true;
    $ionicLoading.show({
      template: 'Creating...'
    });
    Activity.create(data).then(function(response) {
      $scope.isCreating = false;
      $ionicLoading.hide();
      $scope.modal.hide();
    })
  }
})

.controller('HistoryCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
