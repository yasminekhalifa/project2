var queryUrl = "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.geojson"


d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});


function createFeatures(sensordata) {

  console.log(sensordata)
  
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + "This Bay is Currently" +
      "</h3><hr><p>" + (feature.properties.status) + "</p>");
  }

 
  
  var earthquakes = L.geoJSON(sensordata, {
    onEachFeature: onEachFeature

  });


  createMap(earthquakes);
}

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Satellitte": darkmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      -37.09, -144.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });


  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
