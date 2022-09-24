

























var osm, osmLink;
osmLink = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmLink,
        maxZoom: 32
    });

var map = L.map('maps',{
    layers: osm,
}).setView([51.445541,-86.447389],4);

var annular = L.annular([51.445541,-86.447389], {
    radius : 2000000,
    innerRadius : 1000000,
    innerRadiusAsPercent: false,
    startAngle : 100,
    stopAngle: 180
}).addTo(map);

console.log(annular);


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














































