angular.module('starter.controllers', [])

.controller('LoginCtrl', function($q, $scope, $state, $ionicLoading, UserService) {
  //facebookConnectPlugin.browserInit(625749530914767, "");
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });


      UserService.saveAccount(profileInfo);
      $ionicLoading.hide();
      $state.go('tab.newsfeed');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('tab.newsfeed');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          UserService.saveAccount(success.authResponse);
          $state.go('tab.newsfeed');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})

.controller('ActivityCtrl', function($scope, $state, $ionicHistory, Activity) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  Activity.show(parseInt($state.params.id)).then(function(response) {
    $scope.activity = response.data;
  })
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
  console.log($ionicLoading);

  $scope.createActivity = function() {
    var data = {
      activity: $scope.newActivityData
    }
    $scope.isCreating = true;
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Creating...</span>'
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
