angular.module('starter.controllers', [])

.controller('LoginCtrl', function($q, $scope, $state, $ionicLoading, UserService) {
  $scope.loginData = {};

  $scope.login = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Logging in...</span>'
    });
    UserService.login($scope.loginData).then(function(response) {
      window.localStorage.api_key = response.data.api_key;
      var profileInfo = response.data;
      UserService.setUser({
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : profileInfo.image
      });
      $ionicLoading.hide();
      $state.go('tab.newsfeed')
    });
  }

  //***************
  window.localStorage.clear()
  //facebookConnectPlugin.browserInit(625749530914767, "");
  // var fbLoginSuccess = function(response) {
  //   if (!response.authResponse){
  //     fbLoginError("Cannot find the authResponse");
  //     return;
  //   }
  //
  //   var authResponse = response.authResponse;
  //
  //   getFacebookProfileInfo(authResponse)
  //   .then(function(profileInfo) {
  //     // For the purpose of this example I will store user data on local storage
  //     UserService.setUser({
  //       authResponse: authResponse,
  //       userID: profileInfo.id,
  //       name: profileInfo.name,
  //       email: profileInfo.email,
  //       picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
  //     });
  //
  //     UserService.saveAccount(UserService.getUser());
  //     $ionicLoading.hide();
  //     $state.go('tab.newsfeed');
  //   }, function(fail){
  //     // Fail get profile info
  //     console.log('profile info fail', fail);
  //   });
  // };
  //
  // // This is the fail callback from the login method
  // var fbLoginError = function(error){
  //   console.log('fbLoginError', error);
  //   $ionicLoading.hide();
  // };
  //
  // // This method is to get the user profile info from the facebook api
  // var getFacebookProfileInfo = function (authResponse) {
  //   var info = $q.defer();
  //
  //   facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
  //     function (response) {
  //       info.resolve(response);
  //     },
  //     function (response) {
  //       info.reject(response);
  //     }
  //   );
  //   return info.promise;
  // };
  //
  // //This method is executed when the user press the "Login with facebook" button
  // $scope.facebookSignIn = function() {
  //   facebookConnectPlugin.getLoginStatus(function(success){
  //     $ionicLoading.show({
  //       template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Logging in...</span>'
  //     });
  //     console.log('success', success);
  //     if(success.status === 'connected'){
  //       // The user is logged in and has authenticated your app, and response.authResponse supplies
  //       // the user's ID, a valid access token, a signed request, and the time the access token
  //       // and signed request each expire
  //       console.log('getLoginStatus', success.status);
  //
  //       // Check if we have our user saved
  //       var user = UserService.getUser('facebook');
  //
  //       if(!user.userID){
  //         getFacebookProfileInfo(success.authResponse)
  //         .then(function(profileInfo) {
  //           // For the purpose of this example I will store user data on local storage
  //           UserService.setUser({
  //             authResponse: success.authResponse,
  //             userID: profileInfo.id,
  //             name: profileInfo.name,
  //             email: profileInfo.email,
  //             picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
  //           });
  //           $ionicLoading.hide();
  //           UserService.saveAccount(UserService.getUser());
  //         }, function(fail){
  //           // Fail get profile info
  //           console.log('profile info fail', fail);
  //         });
  //       }else{
  //         $ionicLoading.hide();
  //         UserService.saveAccount(UserService.getUser());
  //       }
  //     } else {
  //       // If (success.status === 'not_authorized') the user is logged in to Facebook,
  //       // but has not authenticated your app
  //       // Else the person is not logged into Facebook,
  //       // so we're not sure if they are logged into this app or not.
  //
  //       console.log('getLoginStatus', success.status);
  //
  //       // Ask the permissions you need. You can learn more about
  //       // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
  //       facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  //     }
  //   });
  // };
})

.controller('ActivityCtrl', function($scope, $state, $ionicHistory, $ionicLoading, Activity) {
  $scope.isLoading = true;
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Loading...</span>'
  });
  Activity.show(parseInt($state.params.id)).then(function(response) {
    $scope.activity = response.data;
    $scope.isLoading = false;
    $ionicLoading.hide();
  })
})

.controller('NewsFeedCtrl', function($scope, $state, $ionicModal, $ionicLoading, Category, Location, Activity, UserService) {
  if(!window.localStorage.getItem('api_key')) { $state.go('login');}
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Loading news feed...</span>'
  });
  // $scope.newsfeeds = Activity.all('newsfeed');
  $scope.newActivityData = {};
  $scope.newsfeeds = [];
  $scope.categories = [];
  $scope.locations = [];
  $scope.isCreating = false;
  $scope.selectedCategory = '0';

  $scope.doRefresh = function() {
    Activity.all().then(function(response) {
      $scope.newsfeeds = response.data;
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.join = function(activity) {
    console.log(activity);
    console.log(UserService.getUser());
    var data = {
      activity_id: activity.id,
      joiner_id: UserService.getUser().userID
    }
    Activity.join(data).then(function(response) {
      console.log(response);
    });
  }

  Activity.all().then(function(response) {
    $scope.newsfeeds = response.data;
    $ionicLoading.hide();
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

  $scope.updateFeeds = function () {
    Activity.all($scope.selectedCategory).then(function(response) {
      $scope.newsfeeds = response.data;
    });
  }

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
      template: '<ion-spinner></ion-spinner>&nbsp;&nbsp;&nbsp; <span style="vertical-align: super">Creating...</span>'
    });
    Activity.create(data).then(function(response) {
      $scope.isCreating = false;
      $ionicLoading.hide();
      $scope.modal.hide();
    })
  }
})

.controller('HistoryCtrl', function($scope) {
})

.controller('ProfileCtrl', function($scope, UserService, Activity) {
  $scope.currentUser = UserService.getUser();
  $scope.doRefresh = function() {
    Activity.mine().then(function(response) {
      $scope.currentUser.activities = response.data;
      $scope.$broadcast('scroll.refreshComplete');
    })
  }
  Activity.mine().then(function(response) {
    $scope.currentUser.activities = response.data;
  })
  console.log($scope.currentUser);
});
