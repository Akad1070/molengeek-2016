
// Containing the possible functions of this App.
function App(origin,dest){
    var API_KEY = 'AIzaSyCsbzuJDUEOoq-jS1HO-LUXW4qo0gW9FNs';
    var URL_GEO_CORD ='https://maps.googleapis.com/maps/api/geocode/json?key='+API_KEY;
    var URL_ITINEAIR = 'https://maps.googleapis.com/maps/api/directions/json?key='+API_KEY;
    
    var that = this; // Will  be used in callback methods
    var _internals = {
        origin : {place_id : null, cord : null,adress:null}
        ,destin : {place_id : null, cord : null,adress:null}
        ,map : null
    };
    
    
    // Define all getters and setters but ONLY PUBLIC GETTERS
    
    this.getAdressOrigin = function(){
        return _internals.origin.adress;
    };
    
    
    (function setAdressOrigin(input){
        _internals.origin.adress = input;
        // Get the cord directly from Google Maps
        getGeoCordByAdress(input, function(cord,formattedAddress){
            setCordOrigin(cord);
            _internals.origin.adress = formattedAddress;
        });
    })(origin); // Self invoking function with params the origin given in new App(orign)


    this.getAdressDestination = function(){
        return _internals.origin.destin;
    };
    
    (function setAdressDestination(input){
        _internals.origin.destin = input;
        // Get the cord directly from Google Maps
        getGeoCordByAdress(input, function(cord,formattedAddress){
            setCordDestination(cord);
            _internals.origin.destin = formattedAddress;
        });
    })(dest);  // Self invoking function with params the dest given in new App(..,dest)
    

    this.getCordOrigin = function(cord){
        return _internals.origin.cord;
    };
    
    function setCordOrigin(cord){
        _internals.origin.cord = cord;
    }
    
    
    this.getCordDestination = function(){
        return _internals.origin.cord;
    };
    
    function setCordDestination(cord){
        _internals.origin.cord = cord;
    };   

    
    
    
    
     
     /**
      * Launch An AJAX Request.
      * 
      */
    function launchAjaxRequest(url,datas,cbDone,cbFail){
    	var reqAjax =  $.ajax({
			url  : url
			,method : 'GET'
			,data : datas
    	});
    
    	reqAjax.done(function (data,status) {
    	    debugger
    		if(cbDone)	return cbDone(data);
    	});
    	reqAjax.fail(function (xhr, textStatus, err) {
    	    debugger
    		if(cbFail)	return cbFail(xhr.responseJSON);
    	});
    };
    
    
    function getGeoCordByAdress(adr,cb){
        launchAjaxRequest(URL_GEO_CORD,{'address': adr},function(res){
            console.debug(res.results)
            cb(res.results[0].geometry.location,res.results[0].formatted_address);
        })
    };
    
    this.calculate = function(){
        
    };
    
    
};





$(function(){
    var app = null,
    $origin, // The input textbox for the origin
    $destination, // The input textbox for the destination
    $btnSelect = $('.btnSend'),
    $frameResult = null; // 
    
    
    
    $btnSelect.click(function(e){
        e.preventDefault() ; // Cancel the default action of the btn
        $origin = $('#adress-origin'); // Get the origin textbox
        $destination  = $('#adress-dest'); // Get the destination textbox
        
        if(!$origin.val()){ // If not text inputed for the origin
            alert('Suggest you to let this app get your current location');
            return false;
        }
        if(!$destination.val()){  // If not text inputed for the origin
            alert('You MUST give me a destination');
            return false;
        }
        
        // Create my App with the origin and the location
        app = new App($origin.val(),$destination.val());
        
        
        // Init the map
        var map = new google.maps.Map($frameResult, {
            origin: app.getCordOrigin(),
            destination : app.getCordDestination(),
            scrollwheel: true,
            zoom: 8
        });
        
        console.debug(map);
        // Depending on the btn selected, change the result frame
        // Populate the switch case
        console.log(e.currentTarget.getAttribute("type"));
        switch(e.currentTarget.getAttribute("type")){
            case 'car':
                
                
                break;
            case '':
                
            
                break;
            
            default :
                
        };
        
        
        return false;
    });
    
    


});