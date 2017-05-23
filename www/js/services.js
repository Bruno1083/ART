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


.factory('myApi', function($http, $q, $ionicLoading){

  function getMuseus(){
    var defferred = $q.defer();
    $ionicLoading.show({ template : '<ion-spinner></ion-spinner>'});
    
    // var time = new Date().getTime();
    $http.get("http://dados.recife.pe.gov.br/api/action/datastore_search?resource_id=97ab18da-f940-43b1-b0d4-a9e93e90bed5&limit=30").success(function(data) {
            defferred.resolve(data.result.records);
            $ionicLoading.hide();
    });

    return defferred.promise;
  };


  return {getMuseus: getMuseus};

})

;
