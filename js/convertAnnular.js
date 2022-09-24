function getVertex(c1,c2,radius,angle){
    return [c1 + Math.cos(angle) * radius , c2 + Math.sin(angle) * radius];
}

/**
 * 
 * @param {*} canvas            string, the id of the canvas element
 * @param {*} x                 x  coordinate of the radius
 * @param {*} y                 y coordinate of the radius
 * @param {*} innerRadius       radius of the smaller circle
 * @param {*} outerRadius       radius of the larger circle
 * @param {*} startAngle        start angle of drawing the arc in radians
 * @param {*} endAngle           end angle of drawing the arc in radians
 */

function annularDrawer(canvas,x, y, innerRadius, outerRadius, startAngle, endAngle){
    var canva = document.getElementById(canvas);
    const ctx = canva.getContext('2d');
    var coords1 = getVertex(x, y, innerRadius,endAngle);
    var coords2 = getVertex(x, y, outerRadius, startAngle);
    
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle, endAngle, true);
    ctx.lineTo(coords1[0], coords1[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, innerRadius, endAngle, startAngle, false);
    ctx.lineTo(coords2[0], coords2[1]);
    ctx.stroke();
}
var osm, osmLink;
osmLink = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmLink,
        maxZoom: 32
    });

var map = L.map('maparea').setView([51.445541,-86.447389],4);


var val1 = annularDrawer("myCanvas",200,200, 80, 120,-0.3, -2.8);


var createAnnular = function(){
    
}

var p = layer._point, 
    r = Math.max(Math.round(layer._radius),1),
    r2 = Math.max(Math.round(layer._radiusY),1) || r,
    arc = 'a' + r + ',' + r2 + '0 1,0';
