var mapObjectTest = new TheMapTest('themap',[51.445541,-86.447389],32,4);
mapObjectTest.initialize();
mapObjectTest.drawCircles();
//mapObjectTest.map.pm.enableGlobalEditMode();

L.control.ruler().addTo(mapObjectTest.map);


function logEvent(e){
    console.log(e);
}

function removeLayers (){
    layers.eachLayer(function(layer){
        if (layer instanceof L.Polyline  )
            {
                layers.removeLayer(layer);
            }
    });
}
mapObjectTest.map.on('pm:drawstart',function(e){
    removeLayers();    
});


var defaultMarker;
var map = mapObjectTest.map;



var table = document.getElementById("table_coords");
var coords, radius,txt,coord,centerCoords;
mapObjectTest.map.on('click', (e) => {
    table.innerHTML = '';
    txt = '';
    txt = '<tr><td>' +e.latlng.lat + '</td>' + '<td>' + e.latlng.lng + '</td></tr>';
    table.innerHTML = txt;
}); 


var layers = L.layerGroup().addTo(mapObjectTest.map);
mapObjectTest.map.on('pm:create',function(e){
  
    var rect_array = new Array();
    var array_markers = new Array();
    if(table.children){
        table.innerHTML = '';
    }
    var layer = e.layer;
    var shape2 = e.shape;
    
    if(shape2 === 'Circle'){
        var center, outer;
        //logEvent(e);
        center = e.layer._latlng;

        outer = e.layer.pm._hiddenPolyCircle._latlngs[0][1];
        var arrs = new Array();
        arrs.push([[78,90], [-21, 30]]);
        console.log(L.latLng(arrs[0][0], arrs[0][1]));
        radius = layer._mRadius;
        //console.log(radius);
        var rad2 = center.distanceTo(outer);
        
        var perp = L.GeometryUtil.destination(center, 90, radius);
        //console.log(perp);
        //console.log(perp.distanceTo(center));
        //console.log(center);
        layer.on('pm:edit',function(ev){
            logEvent(ev);
        });

        layer.on('pm:dragend', function (ey) {
            logEvent(ey);
        });

        /**
         * radius = e.layer._mRadius;
        centerCoords = e.layer._latlng; 
        txt = '<tr><td>' + radius+ '</td>' +
                   '<td>' + centerCoords.lat + '</td>'+
                    '<td>'+centerCoords.lng + '</td>'+'</tr>';
        table.innerHTML = txt;

       array_markers.push( [centerCoords.lat,centerCoords.lng], radius);
       console.log(array_markers[1]);
       

        layer.on('pm:edit',function(ev){
            logEvent(ev);
            if(table.hasChildNodes() == true){
                table.innerHTML = '';
            }
            txt = '<tr><td>' + ev.layer._mRadius + '</td>' +
                   '<td>' + ev.layer._latlng.lat + '</td>'+
                    '<td>'+ev.layer._latlng.lng + '</td>'+'</tr>';
            table.innerHTML = txt;
        });

        layer.on('pm:dragend', function (ey) {
            if (table.children) {
                table.innerHTML = '';
            }
            txt = '<tr><td>' + ey.layer._mRadius + '</td><br>' +
                '<td>' + ey.layer._latlng + '</td></tr>';
            table.innerHTML = txt;
        });
         */

        
    }

    if(shape2 === 'Rectangle') {
        var test_array = new Array();
        logEvent(e);
        if(table.hasChildNodes() == true){
            table.innerHTML = '';
        }
        txt ='';
        for(var i = 0; i < layer._latlngs[0].length; i++){
            txt += '<tr><td>'+ layer._latlngs[0][i].lat + '</td><br>' + 
                   '<td>'+ layer._latlngs[0][i].lng+ '</td></tr>';

            //var lat_lng = [layer._latlngs[0][i].lat,layer._latlngs[0][i].lng];
            defaultMarker = L.marker([layer._latlngs[0][i].lat , layer._latlngs[0][i].lng]); 
            //array_markers.push(defaultMarker);
            
        }
       
        var m1 = L.marker( [e.layer._latlngs[0][0].lat, e.layer._latlngs[0][0].lng ]);
        test_array.push(m1);
        var m2 = L.marker([e.layer._latlngs[0][2].lat, e.layer._latlngs[0][2].lng]);
        test_array.push(m2);

        //console.log(test_array);

        rect_array.push(layer._bounds.getNorthEast() , layer._bounds.getSouthWest())
        var ist = new L.marker([layer._bounds.getSouth(), layer._bounds.getWest()]).addTo(mapObjectTest.map);
        var snd = new L.marker([layer._bounds.getNorth(), layer._bounds.getEast()]).addTo(mapObjectTest.map);
        var newMarkers = [];
        newMarkers.push(ist);
        newMarkers.push(snd);
        //console.log(newMarkers);
        array_markers = [];
        for (var k = 0; k < rect_array.length; k ++){
            defaultMarker = L.marker([rect_array[k].lat, rect_array[k].lng]);
            array_markers.push(defaultMarker);
        }
        //console.log(array_markers);
        var lats, longs,point;
        for (var i = 0; i < array_markers.length; i++){
            point = array_markers[i].getLatLng();
            point.lat = point.lat.toFixed(4);
            point.lng = point.lng.toFixed(4);
            //console.log(point.lat , point.lng);
        }
        
        table.innerHTML = txt;
        //console.log(point);
        //console.log(array_markers);
        //console.log(array_markers[0]);

        layer.on('pm:edit', function (ev) {
            txt = '';
            for (var i = 0; i < ev.layer._latlngs[0].length; i++) {
                //console.log(ev.layer._latlngs[0][i].lat);
                txt += '<tr><td>' + ev.layer._latlngs[0][i].lat + '</td><br>' +
                    '<td>' + ev.layer._latlngs[0][i].lng + '</td></tr>';
            }
            table.innerHTML = txt;
            
        });

        layer.on('pm:dragend',function(ey){
            txt = '';
            for(var i =0; i < ey.layer._latlngs[0].length; i++){
                txt += '<tr><td>'+ ey.layer._latlngs[0][i].lat + '</td><br>' + 
                       '<td>'+ ey.layer._latlngs[0][i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
            ey.stopImmediatePropagation;
        });
    } 

    if(shape2 === 'Polygon'){
        array_markers = [];
        if(table.hasChildNodes() == true){
            table.innerHTML = '';
        }
        txt = '';
        for(var i = 0; i < layer._latlngs[0].length; i++){
            txt += '<tr><td>'+ layer._latlngs[0][i].lat + '</td><br>' + 
                   '<td>'+ layer._latlngs[0][i].lng+ '</td></tr>';

            defaultMarker = new L.marker([layer._latlngs[0][i].lat, layer._latlngs[0][i].lng]);
            array_markers.push(defaultMarker);       
        }
        //console.log(array_markers[0]);
        table.innerHTML = txt;
        //console.log(e.marker._latlngs.length);
        //console.log(e);
        layer.on('pm:edit', function (ev) {
            array_markers = [];
            txt = '';
            for (var i = 0; i < ev.layer._latlngs[0].length; i++) {
                //console.log(ev.layer._latlngs[0][i].lat);
                txt += '<tr><td>' + ev.layer._latlngs[0][i].lat + '</td><br>' +
                    '<td>' + ev.layer._latlngs[0][i].lng + '</td></tr>';

                defaultMarker = L.marker([layer._latlngs[0][i].lat, layer._latlngs[0][i].lng]);
                array_markers.push(defaultMarker);       
            }
            table.innerHTML = txt;
            console.log(array_markers[0]);
        });

        layer.on('pm:drag',function(ex){
            logEvent(ex);
        })
        layer.on('pm:dragend',function(ey){
            txt = '';
            for(var i =0; i < ey.layer._latlngs[0].length; i++){
                txt += '<tr><td>'+ ey.layer._latlngs[0][i].lat + '</td><br>' + 
                       '<td>'+ ey.layer._latlngs[0][i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
            logEvent(ey);
        });

        layer.on('pm:rotateend',function(er){
            txt = '';
            for(var i =0; i < er.layer._latlngs[0].length; i++){
                txt += '<tr><td>'+ er.layer._latlngs[0][i].lat + '</td><br>' + 
                       '<td>'+ er.layer._latlngs[0][i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
        });
    }

    if(shape2 === 'Line'){
        if(table.hasChildNodes() == true){
            table.innerHTML = '';
        }
        txt = '';

        for (var i =0; i < layer._latlngs.length; i++ ){
            txt += '<tr><td>'+ layer._latlngs[i].lat + '</td><br>' + 
            '<td>'+ layer._latlngs[i].lng+ '</td></tr>';

            var lat_lngs = [layer._latlngs[i].lat,layer._latlngs[i].lng];
            //console.log(layer._latlngs[0].lat);
            defaultMarker = new L.marker(lat_lngs);
            array_markers.push(defaultMarker);
        }
        //console.log(e.layer._latlngs.length);
        table.innerHTML = txt;
        console.log(array_markers[0]);

        layer.on('pm:edit',function(ev){
            txt = '';
            for (var i =0; i < ev.layer._latlngs.length; i++ ){
                txt += '<tr><td>'+ ev.layer._latlngs[i].lat + '</td><br>' + 
                '<td>'+ ev.layer._latlngs[i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
        });

        layer.on('pm:dragend',function(ey){
            txt = '';
            for (var i =0; i < ey.layer._latlngs.length; i++ ){
                txt += '<tr><td>'+ ey.layer._latlngs[i].lat + '</td><br>' + 
                '<td>'+ ey.layer._latlngs[i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
        });

        layer.on('pm:rotateend',function(er){
            txt = '';
            for (var i =0; i < er.layer._latlngs.length; i++ ){
                txt += '<tr><td>'+ er.layer._latlngs[i].lat + '</td><br>' + 
                '<td>'+ er.layer._latlngs[i].lng+ '</td></tr>';
            }
            table.innerHTML = txt;
        });
        
        layer.addTo(layers);
        layers.eachLayer( function (layer){
            layer.bindPopup('Hello');
        });
    }
   

    if(shape2 === 'Marker'){
        mapObjectTest.map.on('pm:drawstart',(e) => {
            mapObjectTest.map.eachLayer( (layer) => {
                if(layer instanceof L.Marker){
                    mapObjectTest.map.removeLayer(layer);
                }
            });
        });
        logEvent(e);
        table.innerHTML = '';
        txt = '';
        coord = e.layer._latlng;
        txt = '<tr><td>'+ coord.lat + '</td><br>' + 
                   '<td>'+ coord.lng+ '</td></tr>';
        table.innerHTML = txt;
        defaultMarker = new L.marker([coord.lat,coord.lng]);
        mapObjectTest.array_markers.push(defaultMarker);

        //console.log(defaultMarker.getLatLng());

        //console.log(mapObjectTest.array_markers);
        point_ = mapObjectTest.array_markers[0]._latlng['lat'];
        //console.log(point_);
        //point=point_.lat;
        //console.log(point);

       
    } 
   
    if(shape2 === 'CircleMarker'){
        coord = e.layer._latlng;
        txt +=  '<tr><td>'+ coord.lat + '</td><br>' + 
                '<td>'+ coord.lng+ '</td></tr>';
        table.innerHTML = txt;
    }
});

var bounds = [[57,-50], [61, -61]];
var rest_shape = L.rectangle(bounds, {color: 'red', pmIgnore: false}).addTo(mapObjectTest.map);
var layer_ = rest_shape;


layer_.on('pm:edit', function(e){
    console.log(e);
});

layer_.on('pm:dragend', function(el){
    console.log(el);
});

layer_.on('pm:rotateend', function(err){
    console.log(err);
});

//console.log(rest_shape);

function findDistance( lat1, lat2, lon1, lon2)
{
    const R = 6371e3;
    const Ф1 = lat1 * (Math.PI / 180); 
    const Ф2 = lat2 * (Math.PI / 180);
    const ΔФ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 -lon1)  * (Math.PI / 180);

    const a = Math.sin( ΔФ / 2 ) * Math.sin( ΔФ / 2) + Math.cos( Ф1 ) * Math.cos( Ф2 ) * Math.sin( Δλ / 2) * Math.sin( Δλ / 2);
    const c = 2 * Math.atan2 ( Math.sqrt (a), Math.sqrt( 1 - a ));
    const d = R * c;
    return d;
}

var dist = findDistance(51.445541,50.445541, -86.447389, -87.447389 );
//console.log(dist);

var options = {
    position: 'topright',            // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
    unit: 'kilometres',             // Default unit the distances are displayed in. Values: 'kilometres', 'landmiles', 'nauticalmiles'
    useSubunits: true,              // Use subunits (metres/feet) in tooltips if distances are less than 1 kilometre/landmile
    clearMeasurementsOnStop: false,  // Clear all measurements when Measure Control is switched off
    showBearings: false,            // Whether bearings are displayed within the tooltips
    bearingTextIn: 'In',            // language dependend label for inbound bearings
    bearingTextOut: 'Out',          // language dependend label for outbound bearings
    tooltipTextFinish: 'Click to <b>finish line</b><br>',
    tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
    tooltipTextMove: 'Click and drag to <b>move point</b><br>',
    tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
    tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
                                    // language dependend labels for point's tooltips
    measureControlTitleOn: 'Turn on PolylineMeasure',   // Title for the Measure Control going to be switched on
    measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the Measure Control going to be switched off
    measureControlLabel: '&#8614;', // Label of the Measure Control (Unicode symbols are possible)
    measureControlClasses: [],      // Classes to apply to the Measure Control
    showClearControl: true,        // Show a control to clear all the measurements
    clearControlTitle: 'Clear Trajectories', // Title text to show on the Clear Control
    clearControlLabel: '&times',    // Label of the Clear Control (Unicode symbols are possible)
    clearControlClasses: [],        // Classes to apply to Clear Control
    showUnitControl: false,         // Show a control to change the units of measurements
    unitControlUnits: ["kilometres", "landmiles", "nauticalmiles"],
                                    // measurement units being cycled through by using the Unit Control
    unitControlTitle: {             // Title texts to show on the Unit Control
        text: 'Change Units',
        kilometres: 'kilometres',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
    },
    unitControlLabel: {             // Unit symbols to show in the Unit Control and measurement labels
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'mi',
        nauticalmiles: 'nm'
    },
    unitControlClasses: [],         // Classes to apply to the Unit Control
    tempLine: {                     // Styling settings for the temporary dashed line
        color: '#00f',              // Dashed line color
        weight: 2                   // Dashed line weight
    },          
    fixedLine: {                    // Styling for the solid line
        color: '#006',              // Solid line color
        weight: 2                   // Solid line weight
    },
    startCircle: {                  // Style settings for circle marker indicating the starting point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#0f0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    intermedCircle: {               // Style settings for all circle markers between startCircle and endCircle
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#ff0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    currentCircle: {                // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f0f',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    endCircle: {                    // Style settings for circle marker indicating the last point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f00',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
};

var curveTrajectories = L.control.polylineMeasure(options);
curveTrajectories.addTo(mapObjectTest.map);

var path = L.curve([
    "Q",[48.896961, -92.35253],
        [40.896961, -76.35253]
]);
function getBearing(){
    var first = L.latLng(50.54138, 28.52050);
    var second = L.latLng(53.54136, 18.52050);
    var bearing = L.GeometryUtil.bearing(first, second);
    return bearing;
}

var angle = getBearing();;

function interpolateLine(){
    var angle = getBearing();
    var initial = L.latLng([50.54138, 28.52050]);
    destination = L.GeometryUtil.destination(initial, angle, 10000);
    return {destination, initial};
}

if(layers.getLayers().length < 1){
    console.log(layers.getLayers());
}