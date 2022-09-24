var osm, osmLink;
osmLink = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmLink,
        maxZoom: 32
    });

var map = L.map('maps',{
    layers: osm,
}).setView([51.445541,-86.447389],4);



