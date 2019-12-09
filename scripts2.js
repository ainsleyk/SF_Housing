var map2 = L.map('map2').setView([37.748, -122.433], 11);

var redlineMap =  L.tileLayer('https://api.mapbox.com/styles/v1/ainsleykm/ck3yv1fvu0mb71cplzo6yuk1k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        minZoom: 12,
  })
  .addTo(map2);

  var buyoutMap =   L.tileLayer('https://api.mapbox.com/styles/v1/ainsleykm/ck3yv19ia0dcj1cnre206di6k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ', {
      attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          minZoom: 12,
    })
    .addTo(map2);

  $.getJSON("buyouts.geojson",function(data){
    var buyouts =  L.geoJson(data,{
          style: function(feature){
      var fillColor,
          grade = feature.properties.Join_Count;
      if (grade > 35 ) fillColor = "#DC1C13";
      else if ( grade > 18 ) fillColor = "#EA4C46";
      else if ( grade > 8 ) fillColor = "#F07470";
      else if ( grade > -1 ) fillColor = "#F6BDC0";
      else fillColor = "black";  // no data
      return { color: "#999", weight: 1, fillColor:fillColor, fillOpacity: 0 };
    },
    onEachFeature: function (feature,layer){
      layer.bindPopup('<b>' + "Number of Buyouts: " + '</b>' +  feature.properties.Join_Count)
    }
  }).addTo(map2);
  });

  L.control.sideBySide(redlineMap, buyoutMap).addTo(map2);
