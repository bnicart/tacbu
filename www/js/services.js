var server_url = 'http://tacbu.herokuapp.com'
angular.module('starter.services', [])
.service('UserService', function($http) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  var saveAccount = function(userInfo){
    $http.post(server_url + "/api/v1/sessions",userInfo).then(function(response){
      console.log(response);
    })
  };

  return {
    getUser: getUser,
    setUser: setUser,
    saveAccount: saveAccount
  };
})

.factory('httpRequestInterceptor', function() {
  return {
    request: function(config) {
      config.headers['Authorization'] = '123'
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
