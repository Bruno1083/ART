angular.module('starter.controllers', [])

.controller('MapaCtrl', function($scope, $ionicModal, $rootScope, myApi, $ionicPopup) {

  $scope.logado = false;

  $scope.$on('$ionicView.enter', function(e) {

    if( !$scope.logado){
      $scope.modal.show();
      $scope.logado = true;
    }    
  });
  
  // tela de login
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };




  // mapa
  var div = document.getElementById('mapa');
  div.style.height = $('#mapa').parent().height() + 'px';

  // opcoes do mapa
  var mapOptions = {
      center: {lat: -8.0631941, lng: -34.8739779},
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      clickableIcons: false,
      // styles: myStyles
  };

  // carrega
  var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);


  // carrega os mudeus
  myApi.getMuseus().then( function(locais){
    // marcadores
    for (var i = 0; i < locais.length; i++) {
      ( function(){
        var local = locais[i];
        
        var marker = new google.maps.Marker({
          position: {lat: Number(local.latitude), lng: Number(local.longitude)},
          map: map,
          title: local.nome
        });

        // click
        marker.addListener('click', function() {
          $ionicPopup.alert({ title: local.nome, template: local.logradouro + '<br>' + local.telefone});
          // $scope.abrir('#/...');
        });
      })();
    } // end for
  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
