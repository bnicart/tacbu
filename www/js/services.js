var server_url = 'http://tacbu.herokuapp.com'
var server_url = 'http://26d973b2.ngrok.io'
angular.module('starter.services', [])
.service('UserService', function($http, $state) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  var saveAccount = function(userInfo){
    console.log('saveAccount', userInfo);
    $http.post(server_url + "/api/v1/sessions",userInfo).then(function(response){
      window.localStorage.api_key = response.data.api_key;
      $state.go('tab.newsfeed')
    })
  };

  var login = function(data) {
    return $http.post(server_url + "/api/v1/sessions", data);
  }

  return {
    getUser: getUser,
    setUser: setUser,
    saveAccount: saveAccount,
    login: login
  };
})

.factory('httpRequestInterceptor', function() {
  return {
    request: function(config) {
      config.headers['Authorization'] = window.localStorage.getItem('api_key')
      return config;
    }
  }
})

.factory('Category', function($http) {
  function all() {
    return $http.get(server_url + '/api/v1/categories');
  }
  var service = {
    all: all
  }

  return service;
})

.factory('Location', function($http) {
  function all() {
    return $http.get(server_url + '/api/v1/locations');
  }
  var service = {
    all: all
  }

  return service;
})

.factory('Activity', function($http) {

  function create(data) {
    return $http.post(server_url + '/api/v1/activities', data)
  }

  function all(data) {
    return $http.get(server_url + '/api/v1/activities', data);
  }

  function show(id) {
    return $http.get(server_url + '/api/v1/activities/' + id);
  }

  var service = {
    create: create,
    all: all,
    show: show
  }
  return service;
})
