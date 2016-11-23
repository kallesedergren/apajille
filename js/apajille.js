$(document).ready(function() {
    console.log( "ready!" );
    
    $(".openbtn").click(function() {
        $("#mySidenav").css("width", "250px"); 
    });
    
    $(".closebtn").click(function() {
        $("#mySidenav").css("width", "0px"); 
    });
    
    $("#usrsrc").click(function(e) {
        $(this).closest('form').find("input[type=text], textarea").val("");
    });
    
    $("#kalapaikkatoggle").click(function() {
        $("#kalalaji").toggle(); 
    });
    
    $("#maakuntatoggle").click(function() {
        $("#maakunta").toggle(); 
    });
    
    $(".dropdown").click(function(e) {
        $(".dropdown-menu").toggle(); 
    });
    
    $('.dropdown-menu').click(function(event){
     event.stopPropagation();
    });
    
    $("#kalapaikkatoggle, #maakuntatoggle").mouseenter(function() {
        $(this).css("color", "red"); 
    });
    $("#kalapaikkatoggle, #maakuntatoggle").mouseleave(function() {
        $(this).css("color", "black"); 
    });
    
    $("#ilmoitukset").click(function() {
        $("#ilmoituksetdiv").toggle(); 
    });
    
    $("#logout").click(function() {
        $("#logoutconfirm, #logouty, #logoutn").show();
    });
    $("#logoutn").click(function() {
        $("#logoutconfirm, #logouty, #logoutn").hide(); 
    });
    
    $("#salas, #nm, #sposti, #pk").click(function(e) {
         $(this).val("");
    });
    $("#muokkaus, #peruuta").click(function() {
        $("#muokkausdiv").toggle();
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



