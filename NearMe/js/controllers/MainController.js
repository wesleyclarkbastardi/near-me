app.controller('MainController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  const buildGeoUrl = function(lat, lng) {
    return "https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=5000&gscoord=" + lat + "%7C" + lng + "&gslimit=30&format=json";
  }

  $scope.center = {
    lat: 40.741934,
    lng: -74.004897,
    zoom: 17
  };

  $http.jsonp($sce.trustAsResourceUrl(buildGeoUrl($scope.center.lat, $scope.center.lng))).then(function (response) {
    $scope.geodata = response.data;
    $scope.mapMarkers = geodataToMarkers($scope.geodata);
  });  
  
  const getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  const showPosition = function(position) {
    $scope.center.lat = position.coords.latitude;
    $scope.center.lng = position.coords.longitude;
    $http.jsonp($sce.trustAsResourceUrl(buildGeoUrl($scope.center.lat, $scope.center.lng))).then(function (response) {
    $scope.geodata = response.data;
    $scope.mapMarkers = geodataToMarkers($scope.geodata);
  });
  }

  let coordinateButton = document.getElementById("coordinate-button");
  coordinateButton.addEventListener("click", function() {
      getLocation();
  });  
}]);