var map, osm, osmLink, esriWorldImagery;
osmLink = '&copy;<a href="http://www.openstreetmap.org/copyright">OSM</a>';

map = L.map('maps',{
    center : [51.445541,-86.447389],
    zoom: 16
});

osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmLink,
        minZoom: 2,
        maxZoom: 32
}).addTo(map);

esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, GeoEye',
        maxZoom: 32,
        minZoom: 2
}).addTo(map);

L.control.mousePosition({
    position: 'bottomright',
}).addTo(map);

var baseLayers = {
    "Esri World Imagery": esriWorldImagery,
    "OSM": osm,
};

var groupedLayers = {
    "Layers": {
    }
};

L.control.groupedLayers(baseLayers, groupedLayers, { collapsed: false }).addTo(map);

var areaPoup = L.popup({
    closeOnClick: false,
    closeOnEscapeKey: false,
    className: 'area_label'
})

var measureControl = L.control.measure({
    position: 'topleft',
    completedColor: '#C8F2BE',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});

measureControl.addTo(map);

map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircleMarker: true,
    drawPolyline: true,
    drawRectangle: true,
    drawPolygon: true,
    drawCircle: true,
    editMode: true,
    dragMode: true,
    cutPolygon: true,
    removalMode: true,
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

map.on('pm:create', function(e){
    var totLayers;
    var shape = e.shape;
    var layer = e.layer;
    var latlngs_all;
    var area;
    var getRea;
    var content = ''
    if(shape === "Rectangle")
    {
        latlngs_all = layer._latlngs[0];
        area = formatArea(latlngs_all);
        console.log(area);
        //layer.bindPopup(area.toString()).openPopup();
        layer.bindTooltip(area.toString()).openTooltip();
        layer.on('pm:edit', (ef)=>
        {
            latlngs_all = ef.layer._latlngs[0];
            area = formatArea(latlngs_all);
            console.log(area);
            //layer.bindPopup(area.toString()).openPopup();
            layer.bindTooltip(area.toString()).openTooltip();
        });

        layer.on('pm:rotateend', (er)=>
        {
            latlngs_all = er.layer._latlngs[0];
            area = formatArea(latlngs_all);
            console.log(area);
            //layer.bindPopup(area.toString()).openPopup();
            layer.bindTooltip(area.toString()).openTooltip();
        });
    }

    else if (shape === "Polygon")
    {
        latlngs_all = layer._latlngs[0];
        area = formatArea(latlngs_all);
        console.log(area.area);
        console.log(area.areaHa);
        console.log(area.areaMiles);
    }
    else if( shape === "Line")
    {
        latlngs_all = layer._latlngs;
        length = formatLength(latlngs_all);
        layer.bindPopup(length.toString()).openPopup();
        layer.bindTooltip(length.toString()).openTooltip();
        console.log(length);

        layer.on('pm:vertexadded', (ev)=>{
            console.log(ev)
        });
    }
    else if (shape === "Circle")
    {
        var rad = e.layer._mRadius;
        area = getCircleArea(rad);
        getRea = parseFloat(area);
        var areaMiles = (getRea/0.386102).toFixed(5);
        var areaHa = (getRea/100).toFixed(5);
        console.log(getRea);

        var textViews = '<h3>Area Measurement</h3><hr/> <p> Area of '+e.shape.toString()+ ' in k㎡ ' + area.toString()+ '</p>';
            textViews += '<p> Area in Miles² '+areaHa.toString() + '</p>' + '<p> Area in Hectares ' + areaMiles.toString() + '</p>';

        layer.bindPopup(textViews).openPopup();
        layer.bindTooltip(area.toString()).openTooltip();
        console.log(typeof Number(area));

        layer.on('pm:edit', function(e)
        {
            area = getCircleArea(e.layer._mRadius);
            var textViews = '<h3>Area Measurement</h3><hr/> <p> Area of '+e.shape.toString()+ ' in k㎡ ' + area.toString()+ '</p>';
            layer.bindPopup(textViews).openPopup();
            layer.bindTooltip(area.toString()).openTooltip();
        });

        layer.on('pm:dragend', (ed)=> 
        {
            area = getCircleArea(ed.layer._mRadius);
            var textViews = '<h3>Area Measurement</h3><hr/> <p> Area of '+e.shape.toString()+ ' in k㎡ ' + area.toString()+ '</p>';
            layer.bindPopup(textViews).openPopup();
            layer.bindTooltip(area.toString()).openTooltip();
        }); 
    }
    totLayers = L.PM.Utils.findLayers(map).length;
    console.log(totLayers);

   
});



// listen to vertexes being added to currently drawn layer (called workingLayer)
map.on('pm:drawstart', ({ workingLayer }) => {
    workingLayer.on('pm:vertexadded', (e) => {
      console.log(e);
    });
  });

// Get area
function formatArea(polygon) {
    //L.GeometryUtil.geodesicArea(), returns number type data, the unit is square meters, here is a conversion
    var seeArea = L.GeometryUtil.geodesicArea(polygon);
    let area = (seeArea / 10e6).toFixed(3);
    var areaHa = (area * 100);
    var areaMiles = (area/0.386102);

    return {
        area, 
        areaHa,
        areaMiles
    };
}


// Get the length
function formatLength(line) {
    let dis = 0;
    for (let i = 0; i < line.length - 1; i++) {
        let start = line[i];
        let end = line[i + 1];
        dis += L.latLng([start.lat, start.lng]).distanceTo([end.lat, end.lng]);//Calculate the distance between two points and add them up
    }
    return (dis / 10e2).toFixed(2);
}

function getCircleArea(radius){
    var area = Math.PI*(radius*radius);
    var circlearea = (area / 10e6).toFixed(3);
    return circlearea;
}


map.pm.Toolbar.createCustomControl({
    name: 'alertBox',
    block: 'custom',
    className: 'leaflet-pm-icon-marker xyz-class',
    titleL : 'Count Layers',
    onclick: ()=>{
        alert (
            'There are ' + L.PM.Utils.findLayers(map).length + ' layers on the map'
        );
    },
    toggle: false
});

const _actions = [
    {
        text : 'Custom message, with clock event',
        onClick(e){
            alert('click');
        },
        name: 'actionName',
    },
];

map.pm.Toolbar.copyDrawControl('Rectangle', {
    name: 'RectangleCopy',
    block: 'custom',
    title: 'Display text on hover button',
    actions : _actions,
});
map.pm.Draw.RectangleCopy.setPathOptions({ color: 'green'});

map.pm.Toolbar.changeControlOrder(['RectangleCopy']);




map.on('pm:actionclick', function(e){

});


