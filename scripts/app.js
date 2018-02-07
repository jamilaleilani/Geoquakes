// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


$(document).ready(function() {

  console.log("Let's get coding!");
  // CODE IN HERE!

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 8,
  });

  var SanFran = new google.maps.Marker({
    position: {lat: 37.78, lng: -122.44},
    map: map,
    title: "SF"
  })

  $.ajax({

    method: "GET",

    url: weekly_quakes_endpoint,

    success: function(response) {
      console.log(response.features);
      $(response.features).each(function() {
        var title = this.properties.title;
        var timeSince = ((Date.now() - this.properties.time) / 3600000).toFixed(1);
        var quakeMarker = new google.maps.Marker({
          position: {lat: this.geometry.coordinates[1], lng: this.geometry.coordinates[0]},
          map: map,
          title: title,
          icon: "images/earthquake.png"
        });
        console.log(timeSince);
        $("#info").html($("#info").html() + "<p>Title: " + title + " / " + timeSince + " hours ago");
      })
    },

    error: function() {
        alert("There was an error getting data.");
    }

  });

});
