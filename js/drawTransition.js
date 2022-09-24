var ClothoidCurve = function(radius, radialAcc, velocity, x1, y1, xi, yi, x2, y2){
    this.radius = radius;
    this.radialAcc = radialAcc;
    this.velocity = velocity;
    this.x1 = x1;
    this.y1 = y1;
    this.xi = xi;
    this.yi = yi;
    this.y2 = y2;
    this.x2 = x2;
};

ClothoidCurve.prototype.getTransitionLength = function(){
    var v3 = Math.round(Math.pow(this.velocity, 3),3);
    var αR = this.radialAcc * this.radius;
    var transLength = v3 / αR;
    return transLength; 
};


ClothoidCurve.prototype.getBearing = function(startX, startY, endX, endY){
    var bearing = L.GeometryUtil.bearing([startX, startY],[endX, endY]);
    return bearing;
};

ClothoidCurve.prototype.getTangentialAngle = function(){
    var transLength = this.getTransitionLength;
    var tangentialAngle = transLength / (2 *this.radius);
    return tangentialAngle;
};

ClothoidCurve.prototype.getShift = function(){
    var transitionLength = this.getTransitionLength();
    var shift = Math.pow(transitionLength, 2) / (24 * this.radius);
    return shift;
}

ClothoidCurve.prototype.getC = function(){
    let transLength = this.getTransitionLength();
    var C = (transLength /2) - (Math.pow(transLength, 3))/ (240 * Math.pow(this.radius, 3));
    return C;
}

ClothoidCurve.prototype.getCircularArc = function(){
    var bearingA = this.getBearing(this.x1, this.y1, this.x1, this.yi );
    var bearingB = this.getBearing(this.xi, this.yi, this.x2, this.y2);
    var diff_β = Math.max(bearingA, bearingB) - Math.min(bearingA, bearingB);
    var tangentialAngle = this.getTangentialAngle();
    var arcLength = this.radius * (diff_β - 2 * tangentialAngle);
    return arcLength;
}

var startTangent, intersectionPoint, endTangent;

// compute bearing from start tangent to intersection point, and also compute bearing from intersection point to the end tanget
function getBearing(x1, y1, x2, y2){

}


// compute bearing from intersetion point to end tangent 



function getTransitionLength(radius,radialAcc, velocity ){
    var v3 = Math.round(Math.pow(velocity, 3),3);
    var αR = radialAcc * radius;
    var transLength = v3 / αR;
    return transLength; 
}

function getTangentialAngle(radius ){
    var transitionLength = getTransitionLength()
    
    var tangentialAngle = (transitionLength / 2) * radius;
    return tangentialAngle;
}

function computeC (transitionLength, radius){
    var div = transitionLength/2;
    var cubics = Math.pow(transitionLength, 2) / (24 * radius) ;
    var C = div - cubics;
    return C;
}


function getArcLength(radius, tangentialAngle){
    var subtractor  = 28 - 2 * tangentialAngle;


}

function computeShift(transitionLength, radius){
    var lenSquared = Math.pow(transitionLength, 2);
    var shift = lenSquared / (24 * radius);
    return shift;
}


function computeAngleT1 (){

}

function computeAngleT2() {

}

function computeAngleT3() {

}






function computeC (){

}

function computeRadiusCoords() {

}
