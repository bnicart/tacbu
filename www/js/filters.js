angular.module('starter.filters', [])
.filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow()
  }
})
