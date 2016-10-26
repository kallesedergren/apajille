$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $("#testi2").show();
        });
    $("#testi2").click(function(e) {
       $("#testi2").hide();
        $("#testi2").css("display", "none");
       $("#wrapper").toggleClass("toggled");
    });
});



// this will be called from html
function getLocation() {
    // try HTML5 gelocation
    if (navigator.geolocation) {
        // get current position
        navigator.geolocation.getCurrentPosition(showPosition, handleError); 
    } else {
        $("#location").text("Your browser doesn't support geolocation.");
    }
}

// show current position
function showPosition(position) {
    
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    $("#location").text("Latitude:" + pos.lat+ " and Longitude:" + pos.lng);
    // map
    var map = new google.maps.Map(document.getElementById('map'), 
    {
        center: pos, 
        zoom:7
    }
                                 );
    //marker
    var marker = new google.maps.Marker(
    {
        position:pos,
        map:map,
        title:"Äänekoski"
    }
    );
    //info window contenet string
    var contentString = '<div id="infocontent">' +
                        '<h1>This should be Äänekoski</h1>'+
                        '<div id="bodyContent">'+
                        '<p>.... some html story here</p>'+
                        '</div>'+
                        '</div>';
    // info window
    var infoWindow = new google.maps.InfoWindow(
    {
        content: contentString    
    }
    );
    // add event listener to marker
    marker.addListener("click",function() {
        infoWindow.open(map,marker);
    });
    
    
}

// show error
function handleError(error) {
  if (error.code == error.PERMISSION_DENIED) { 
    $("#location").text("Permission denied by the user.");
  } 
  else if (error.code == error.POSITION_UNAVAILABLE) {
    $("#location").text("Position is unavailable");
  } 
  else if (error.code == error.TIMEOUT) { 
    $("#location").text("Position can't be found - timeout.");
  }
  else {
    $("#location").text("Unknow error has happend");
  }
}



