/**
 * 
 *  ---- THE MAP OBJECT, METHODS AND THE EVENTS ASSOCIATED WITH IT --------- ****
 * 
 * @param {*} container       Defines the HTML div element containing the map object
 * @param {*} center          Defines the center of the map in lat, lng
 * @param {*} maxZoom         Defines the maximum zoom extent of the map object
 * @param {*} initialZoom     Defines the initial zoon, or default zoom of the map object
 * 
 * The object has been coded in a prototypical nature of javascript, and  then objects inheriting from TheMapTest, can 
 * access methods defined via its prototype. 
 */

var TheMapTest = function (container,center,maxZoom,initialZoom ){
    this.container = container;
    this.center = center;
    this.initialZoom = initialZoom;
    this.maxZoom = maxZoom;
    this.map = null;
    this.baseLayers = null;
    this.groupedLayers = null;
    this.array_markers = new Array(); 
};

TheMapTest.prototype.initialize = function(){
    var osm, osmLink, esriWorldImagery;
    osmLink = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmLink,
        maxZoom: this.maxZoom,
    });

    esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, GeoEye',
        maxZoom: this.maxZoom,
    });

    // here, combine the map layers into an array https://leafletjs.com/reference.html#map-option
    this.mapLayers = [osm, esriWorldImagery];
    this.map = L.map(this.container, {
        layers: this.mapLayers,
        keyboard: true,
    }).setView(this.center, this.initialZoom);

   
    this.map.on('measurestart', function(e){
        console.log(e);
    });

    L.PM.setOptIn(false);


    // add functionality for the mouse position to the map    
    L.control.mousePosition({
        position: 'bottomright',
    }).addTo(this.map);


    // GPS LOCATOR with leaflet locate ---> later development should adopt HTML5 geolocation API if needed
    var locateControl = L.control.locate({
        position: "bottomright",
        drawCircle: true,
        follow: true,
        setView: true,
        keepCurrentZoomLevel: true,
        markerStyle: {
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.8
        },
        circleStyle: {
            weight: 1,
            clickable: false
        },
        strings: {
            title: "Current location",
            popup: "You are within {distance} {unit} from this point",
            outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
        },
        locateOptions: {
            maxZoom: 18,
            watch: true,
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    });

    // add the locate to the map
    locateControl.addTo(this.map);


    // function to add the base layers into the map after drawing them -----> more modification needed

    this.baseLayers = {
        "Esri World Imagery": esriWorldImagery,
        "OSM": osm,
    }
    this.groupedLayers = {
        "Layers": {
        }
    }
    L.control.groupedLayers(this.baseLayers, this.groupedLayers, { collapsed: false }).addTo(this.map);


};

TheMapTest.prototype.addDrawingControls = function(){
        this.map.pm.addControls({
            position: 'topleft',
            drawMarker: false,
            drawCircleMarker: true,
            drawPolyline: true,
            drawRectangle: true,
            drawPolygon: true,
            drawCircle: true,
            editMode: true,
            dragMode: true,
            cutPolygon: false,
            removalMode: false,
            rotateMode: true,
            drawControls: true,
            editControls: true,
            customControls: true,
            optionsControls: true,
            pinningControls: true,
            snappingOption: true,
            splitMode: false,
            scaleMode: false,
            oneBlock: true
    });
    
    this.map.pm.toggleGlobalEditMode();
};


TheMapTest.prototype.drawPolygons = function(){
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: true,
        drawCircle: false,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: true,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: false
    });

    
   
};

TheMapTest.prototype.drawCircles = function(){
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: true,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: true,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: true
    });
     
   

};

TheMapTest.prototype.drawMarkers = function(){
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: true,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: false,
        editMode: false,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: false,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: true
    });
    
};

TheMapTest.prototype.drawRectangle = function(){
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: true,
        drawPolygon: false,
        drawCircle: false,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: true,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: false
    });

   
    
};

TheMapTest.prototype.drawPolyline= function(){
    this.map.pm.toggleGlobalEditMode();
    
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: true,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: false,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: true,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: true
    });
   this.map.pm.toggleGlobalDragMode();
   
    
};

TheMapTest.prototype.drawCircleMarker = function(){
    this.map.pm.addControls({
        position: 'topleft',
        drawMarker: false,
        drawCircleMarker: true,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        drawCircle: false,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
        removalMode: false,
        rotateMode: true,
        drawControls: true,
        editControls: true,
        customControls: true,
        optionsControls: true,
        pinningControls: true,
        snappingOption: true,
        splitMode: true,
        scaleMode: true,
        oneBlock: false
    });
   

};

/***
 * Quadratic and cubic berzier curves drawings, the marker are added to the map first and then the latLng position of the marker are used to compute the curves
 * Leaflet curves plugin was used : https://github.com/elfalem/Leaflet.curve
 * 
 *
*/
TheMapTest.prototype.drawBerzierCurves = function(){
    var map = this.map;
    var _curveLayer = L.layerGroup();  
    _curveLayer.addTo(this.map);
    var markerOne, markerTwo, markerThree;
    var selectedPoint;
    
    // check for any markers present in the map
    // add markers and use them for computing the berzier curves

    markerOne = L.marker([51.85253, -98.61972], {
        pmIgnore: false,
        draggable: true
    }).on('dragend', function (ef) {
        _curveLayer.clearLayers();
        selectedPoint = ef.target.getLatLng();
        drawCurvePath(selectedPoint, markerTwo.getLatLng(), markerThree.getLatLng());    
    }).addTo(this.map);
    console.log(markerOne.getLatLng());

    //console.log(markerOne);
    markerTwo = L.marker([47.81315, -76.73819], {
        draggable: true
    }).on('dragend', function (el) {
        _curveLayer.clearLayers();
        selectedPoint = el.target.getLatLng();
        drawCurvePath(markerOne.getLatLng(), selectedPoint, markerThree.getLatLng());
    }).addTo(this.map);


    markerThree = L.marker([48.896961, -92.35253], {
        draggable: true
    }).on('dragend', (em) => {
        _curveLayer.clearLayers();
        selectedPoint = em.target.getLatLng();
        drawCurvePath(markerOne.getLatLng(), markerTwo.getLatLng(), selectedPoint);
    }).addTo(this.map);


    var arrayTest = [markerOne, markerTwo, markerThree];
    var hold_array = new Array();
    for (var i = 0; i < arrayTest.length; i++){
        hold_array.push([arrayTest[i]._latlng.lat, arrayTest[i]._latlng.lng]) 
    }
    console.log(hold_array);
    var poly = new  L.Polyline(hold_array,{color:'red'});
    poly.addTo(this.map);



    function drawCurvePath(point1, point2, point3){
        var path = L.curve(['M', [ point1.lat , point1.lng ],
                            'Q', [ point2.lat,  point2.lng ],
                                 [ point3.lat,  point3.lng ] 
                                ],{pmIgnore : false});
        
        var pathCoordinates = path.getLatLngs();  
        _curveLayer.addLayer(path).addTo(map);     
    }

    // Draw a quadratic curve using this function, on drag of each marker
    var pathOne = L.curve( [  'M',[51.85253, -98.61972],
					   'Q',[56.46249048388979,-91.214388],
						   [54.00776876193478, -83.829566116168] ]);
    //console.log(pathOne);                       
};
TheMapTest.prototype.tracePath = function(){
        var path = L.curve([
            'M', [53.54136296522163, 18.520507812500004],
            
        'C',    [50.54136296522163, 28.520507812500004],
                [48.45835188280866, 33.57421875000001],
                [53.16106, 24.520507812500004],
        ]);
        path.addTo(this.map);
}




