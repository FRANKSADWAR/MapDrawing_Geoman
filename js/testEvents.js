TheMapTest.prototype.return_coordinates = function ()
{
    var coordinates = new Array();
    if(this.array_markers != null){
        for (let i = 0; i < this.array_markers.length; i ++)
        {
            var point = this.array_markers[i]._latlng;
            point.lat = this.fix_lat(point.lat);
            point.lng = this.fix_lon(point.lng);
            point.lat = (Number(point.lat.toFixed(this.decimal_precision)));
            point.lng = (Number(point.lng.toFixed(this.decimal_precision)));
            coordinates.push(point);
        }
    }

    var success = true;
    var error = "";
    if((this.array_marker.length < 2) && ((this.type == "polyline") || (this.type == "polygon") || (this.type == "rectangle") || (this.type == "circle")  || (this.type == "cylinder"))){
        success = false;
        error = this.MapStruct.MapPickerErrorPoints;
    }
    return {
        success : success,
        coordinates: coordinates,
        error: error, 
        GridJsonData : this.GridJsonData
    };
   
};


const cmSizer = function(cols){
    this.cols = cols || 1;
    this.ctr = 0;
    this.n = document.createElement("table");
    this.crow = document.createElement("tr");
    this.n.appendChild(this.crow);

}

var box = new cmSizer(1);

function Matrix()
{
    this.r = 0,
    this.c = 0,
    this.M = [],
    this.Name = "";
}
var altitude, coordinates;
if(coordinates.length >  2){
    const Mat = new Matrix();
    Mat.Name = "Rectangle";
    Matrix.M = altitude ? [ [coordinates[0].lat , coordinates[0].lng , altitude], [coordinates[2].lat , coordinates[2].lng , altitude] ] : [];
}



const getMethod = function(obj){
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
        function(item){
            typeof obj[item] === 'function'
        }
    )
}

const getMethods = (obj) => Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(item => typeof obj[item] === 'function');









var createdLayers = L.featureGroup().addTo(mapObjectTest.map);

function logEvent(e){
    console.log(e);
}

function removeLayers (){
    mapObjectTest.map.eachLayer(function(layer){
        if (layer instanceof L.Path  )
            {
                mapObjectTest.map.removeLayer(layer);
            }
    });
}

mapObjectTest.map.on('pm:drawstart',function(e){
    logEvent(e);
    removeLayers();
});


var markerCheck = L.marker([51.445541,-86.447389],{pmIgnore: false});
var _latlng = [];
var defaultMarker;
var map = mapObjectTest.map;

mapObjectTest.map.eachLayer(function(layer){
    if(layer instanceof L.Path){
        mapObjectTest.map.removeLayer(layer);
    }
});

var table = document.getElementById("table_coords");
var coords, radius,txt,coord,centerCoords;
mapObjectTest.map.on('click', (e) => {
    console.log(e.latlng);
    table.innerHTML = '';
    txt = '';
    txt = '<tr><td>' +e.latlng.lat + '</td>' + '<td>' + e.latlng.lng + '</td></tr>';
    table.innerHTML = txt;
}); 

mapObjectTest.map.on('pm:create',function(e){
    var point_;
    var rect_array = new Array();
    var array_markers = new Array();
    if(table.children){
        table.innerHTML = '';
    }
    var layer = e.layer;
    var shape2 = e.shape;
    
    if(shape2 === 'Circle'){
        //logEvent(e);
        radius = e.layer._mRadius;
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
        //console.log(layer.toGeoJSON());
        //console.log(layer.getLatLng());

        layer.on('pm:drag',function(ed){
            //logEvent(ed);
        });
        layer.on('pm:update',function(eu){
            //logEvent(eu);
        });

        layer.on('pm:markerdragend',function(mde){
            //console.log(mde);
        });
       

        layer.on('pm:dragend', function (ey) {
            //logEvent(ey);
            if (table.children) {
                table.innerHTML = '';
            }
            txt = '<tr><td>' + ey.layer._mRadius + '</td><br>' +
                '<td>' + ey.layer._latlng + '</td></tr>';
            table.innerHTML = txt;
        });

        
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

        console.log(test_array);

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
        //console.log(array_markers[0]._latlng);
        table.innerHTML = txt;
        console.log(e.marker._latlngs.length);
        console.log(e);
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
            console.log(array_markers[0]._latlng);
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

        //console.log(layer._latlngs[0]);
        logEvent(e);

        for (var i =0; i < layer._latlngs.length; i++ ){
            txt += '<tr><td>'+ layer._latlngs[i].lat + '</td><br>' + 
            '<td>'+ layer._latlngs[i].lng+ '</td></tr>';

            var lat_lngs = [layer._latlngs[i].lat,layer._latlngs[i].lng];
            console.log(layer._latlngs[0].lat);
            defaultMarker = new L.marker(lat_lngs);
            array_markers.push(defaultMarker);
        }
        console.log(e.layer._latlngs.length);
        table.innerHTML = txt;
        console.log(array_markers);

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
        })
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

        console.log(defaultMarker.getLatLng());

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



function getDistance(){

}

function getBearing(){
    var marker1 = L.marker([51.445541,-86.447389]);
    var marker2 = L.marker([50.445541,-87.447389]);
    //var j = L.GeometryUtil.distance(marker1.getLatLng(), marker2.getLatLng());
    //var lens = L.GeometryUtil.length([51.445541,-86.447389], [50.445541,-87.447389]);
    //console.log(j);
    //console.log(lens);

}

function findDistance( lat1, lat2, lon1, lon2)
{
    const R = 6371e3;
    const Ф1 = lat1 * (Math.PI / 180); 
    const Ф2 = lat2 * (Math.PI / 180);
    const ΔФ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 -lon1)  * (Math.PI / 180);

    const a = Math.sin( ΔФ / 2 ) * Math.sin( ΔФ / 2) + Math.cos( Ф1 ) * Math.cos( Ф2 ) * Math.sin( Δλ / 2) * Math.sin( Δλ / 2);
    const c = 2 * Math.atan2( Math.sqrt (a), Math.sqrt( 1 - a ));
    const d = R * c;
    return d;
}

var dist = findDistance(51.445541,50.445541, -86.447389, -87.447389 );
console.log(dist);


getBearing();