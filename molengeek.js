var map;
var panelDetails;
var initialize;
var calculate;
var direction;
var latLngBxl;

initialize = function(){
  latLngBxl = new google.maps.LatLng(50.850, 4.317); // It's Molenbeek Coord
  map = new google.maps.Map(document.getElementById('map'), {
    zoom      : 14, 
    center    : latLngBxl, 
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type of map {HYBRID, ROADMAP, SATELLITE, TERRAIN}
    maxZoom   : 20
  });
  panelDetails    = document.getElementById('panel_details');
  
  var marker = new google.maps.Marker({
    position : latLngBxl,
    map      : map,
    title    : "Molenbeek"
  });
  
  var contentMarker = [
      '<div id="containerTabs">',
        '<div id="tabs">',
          '<ul>',
            '<li><a href="#tab-1"><span>Lorem</span></a></li>',
            '<li><a href="#tab-2"><span>Ipsum</span></a></li>',
            '<li><a href="#tab-3"><span>Dolor</span></a></li>',
          '</ul>',
          '<div id="tab-1">',
            '<h3>Bxl</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget dignissim magna. Ut imperdiet cursus purus auctor imperdiet. Nulla imperdiet. </p>',
          '</div>',
          '<div id="tab-2">',
           '<h3>Aliquam vestibulum</h3><p>Lorem ipsum dolor sit amet.</p>',
          '</div>',
          '<div id="tab-3">',
            '<h3>Pretium suscipit</h3><ul><li>Lorem</li><li>Ipsum</li><li>Dolor</li><li>Amectus</li></ul>',
          '</div>',
        '</div>',
      '</div>'
  ];

  var infoWindow = new google.maps.InfoWindow({
    content  : contentMarker,
    position : latLngBxl
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map,marker);
  });
  
  google.maps.event.addListener(infoWindow, 'domready', function(){ 
    $("#tabs").tabs();
  });
  
  
  direction = new google.maps.DirectionsRenderer({
    map   : map,
    panel : panelDetails // where to display the instructions
  });

};

calculate = function(){
    var originAddress = document.getElementById('address-origin').value;
    var destAddress   = document.getElementById('address-destination').value;
    if(originAddress && destAddress){
        var request = {
            origin      : originAddress,
            destination : destAddress,
            travelMode  : google.maps.DirectionsTravelMode.WALKING // How to get there ?
        }
        
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status){ // Send a request to gest the direction
          //console.log(response);
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Draw the direction on the map with all steps
            }
        });
    }else{
      alert("Must have some address !")
    }
};

initialize();
