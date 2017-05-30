angular.module('starter.services', [])

.factory('myApi', function($http, $q, $ionicLoading){

  var monumentos = [];

  function getMuseus(){
    var defferred = $q.defer();
    $ionicLoading.show({ template : '<ion-spinner></ion-spinner>'});
    
    // var time = new Date().getTime();
    $http.get("http://dados.recife.pe.gov.br/api/action/datastore_search?resource_id=97ab18da-f940-43b1-b0d4-a9e93e90bed5&limit=30").success(function(data) {
            monumentos = data.result.records;
            defferred.resolve(monumentos);
            $ionicLoading.hide();
    });

    return defferred.promise;
  };


  function getMonumento(i){
    if (typeof monumentos[i] !== 'undefined')
      return monumentos[i];
    else
      return false
  };


  return {
          getMuseus: getMuseus,
          getMonumento: getMonumento
        };

})

;
