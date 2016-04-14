var server_url = 'http://26d973b2.ngrok.io'

angular.module('starter.services', [])

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
