angular.module('starter.services', [])

.factory('httpRequestInterceptor', function() {
  return {
    request: function(config) {
      config.headers['Authorization'] = 'elims06:CAACEdEose0cBAH2aKftGQ2DUQZBrkKemL5fUIF2zaVFlMKxdsyiU1ETN1CmahDyngw3oE6cf6yMzmjA83pfT45jiaEpRoZBBLEzCB7pamCfJmvpwuBl3GNywyQDrFyNVUqM8ZBE4OUGAxUSZCy1q0Krsmop69R3OAGnpiCBk3Ff6UWXNX1t2rz71uJTWQKZBebGVE40MRYAZDZD'
      return config;
    }
  }
})

.factory('Category', function($http) {
  function all() {
    return $http.get('http://26d973b2.ngrok.io/api/v1/categories');
  }
  var service = {
    all: all
  }

  return service;
})

.factory('Location', function($http) {
  function all() {
    return $http.get('http://26d973b2.ngrok.io/api/v1/locations');
  }
  var service = {
    all: all
  }

  return service;
})

.factory('Activity', function($http) {

  function create(data) {
    return $http.post('http://26d973b2.ngrok.io/api/v1/activities', data)
  }

  function all(data) {
    return $http.get('http://26d973b2.ngrok.io/api/v1/activities', data);
  }

  function show(id) {
    return newsfeed_items.find(id)
  }

  var service = {
    create: create,
    all: all,
    show: show
  }
  return service;
})
