
function polarToCartesian(centerX, centerY, radius, angleInDegrees){
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function drawAnnular(x, y, innerRadius, outerRadius, startAngle, endAngle){
    var innerStart = polarToCartesian(x,y,innerRadius, endAngle);
    var innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
    var outerStart = polarToCartesian(x, y, outerRadius, endAngle);
    var outerEnd = polarToCartesian(x, y, outerRadius, startAngle);

    var largeArcFlag = (endAngle - startAngle) <= 180 ? "0" : "1";

    var d = [
        "M", outerStart.x , outerStart.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "L", outerStart.x, outerStart.y, "Z"
    ].join(" ");

    return d;
}

var path = drawAnnular(390, 190, 50, 120, 360, 400);
document.getElementById("path").setAttribute("d", path);
