
// Containing the possible functions of this App.
function App(origin,dest){
    var API_KEY = 'AIzaSyCsbzuJDUEOoq-jS1HO-LUXW4qo0gW9FNs';
    var URL_GEO_CORD ='https://maps.googleapis.com/maps/api/geocode/json?key='+API_KEY;
    var URL_ITINEAIR = 'https://maps.googleapis.com/maps/api/directions/json?key='+API_KEY;
    
    var inputs = {
        origin : {cord : null,adress:null}
        ,destin : {cord : null,adress:null}
    }
    var that = this; // Will  be used in callback methods
    
    // Define all getters and setters but ONLY PUBLIC GETTERS
    
    this.getAdressOrigin = function(){
        return inputs.origin.adress;
    };
    
    
    (function setAdressOrigin(input){
        inputs.origin.adress = input;
        // Get the cord directly from Google Maps
        getGeoCordByAdress(input, function(cord,formattedAddress){
            that.setCordOrigin(cord);
            inputs.origin.adress = formattedAddress;
        })
    })(origin);


    this.getAdressDestination = function(){
        return inputs.origin.destin;
    };
    
    (function setAdressDestination(input){
        inputs.origin.destin = input;
        // Get the cord directly from Google Maps
        getGeoCordByAdress(input, function(cord,formattedAddress){
            that.setCordDestination(cord);
            inputs.origin.destin = formattedAddress;
        });
    })(dest);
    

    this.getCordOrigin = function(cord){
        return inputs.origin.cord;
    };
    
    function setCordOrigin(cord){
        inputs.origin.cord = cord;
    }
    
    
    this.getCordDestination = function(){
        return inputs.origin.cord;
    };
    
    function setCordDestination(cord){
        inputs.origin.cord = cord;
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
    		if(cbDone)	cbDone(data);
    	});
    	reqAjax.fail(function (xhr, textStatus, err) {
    	    debugger
    		if(cbFail)	cbFail(xhr.responseJSON);
    	});
    };
    
    
    function getGeoCordByAdress(adr,cb){
        launchAjaxRequest(URL_GEO_CORD,{'address': adr},function(res){
            cb(res.results[0].geometry)
            console.debug(res.results);
        })
    };
    
    this.getDirectionsFromOriginToDest = function(){
        launchAjaxRequest()
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
        $origin = $('#adress-origin');
        $destination  = $('#adress-dest');
        
        debugger
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