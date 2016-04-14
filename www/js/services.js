angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Activity', function() {
  var newsfeed_items = [
    { id: 1, organizer: 'Marimar', category: 'Basketball', date: moment(), location: 'Makati', looking_for: 'Female', title: 'Basketball Buddy hahahahahahahahah', description: 'Laru laro lang', status: 'pending' },
    { id: 2, organizer: 'Demi', category: 'Tennis', date: moment().add(1, 'hours'), location: 'Pasig', looking_for: 'Male', title: 'Tennis Buddy', description: 'Laru laro lang', status: 'pending' },
    { id: 3, organizer: 'Beli', category: 'Movie', date: moment().add(2, 'hours'), location: 'Pasay', looking_for: 'Female', title: 'Movie Buddy', description: 'Laru laro lang', status: 'pending' },
    { id: 4, organizer: 'Mark', category: 'Badminton', date: moment().add(1, 'days'), location: 'Taguig', looking_for: 'Male', title: 'Badminton Buddy', description: 'Laru laro lang', status: 'pending' }
  ];

  function newsfeed() {
    return newsfeed_items;
  }

  function all(data) {
    return []
  }

  function show(id) {
    return newsfeed_items.find(id)
  }

  var service = {
    newsfeed: newsfeed,
    all: all,
    show: show
  }
  return service;
})
