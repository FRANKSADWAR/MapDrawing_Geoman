

function annularSector ( path, options ){
    var opts = optionsWithDefaults(options);
    var p = [ // points
        [ opts.cx + opts.r2 * Math.cos(opts.startRadians), 
          opts.cy + opts.r2 * Math.sin(opts.startRadians)],
        [ opts.cx + opts.r2 * Math.cos(opts.closeRadians),
          opts.cy + opts.r2 * Math.sin(opts.closeRadians)],
        [ opts.cx + opts.r1 * Math.cos(opts.closeRadians),
          opts.cy + opts.r1 * Math.sin(opts.closeRadians)],
        [ opts.cx + opts.r1 * Math.cos(opts.startRadians),
          opts.cy + opts.r1 * Math.sin(opts.startRadians)],   
    ];

    var angleDiff = opts.closeRadians - opts.startRadians;
    var largeArc = (angleDiff % (Math.PI * 2)) > Math.PI ? 1 : 0;
    var cmds = [];
    cmds.push("M" + p[0].join());
    cmds.push("A" + [opts.r2, opts.r2, 0, largeArc, 1, p[1]].join());
    cmds.push("L" + p[2].join());
    cmds.push("A" + [opts.r1, opts.r1, 0 , largeArc, 0, p[3]].join());
    cmds.push("z");
    path.setAttribute('d', cmds.join(' '));

    function optionsWithDefaults(o){
        var o2 = {
            cx           :   o.centerX || 0,
            cy           :   o.centerY || 0,
            startRadians :  (o.startDegrees || 0) * Math.PI/180,
            closeRadians :  (o.endRadians || 0) * Math.PI/180,
        };

        var t = o.thickness !== undefined ? o.thickness : 100;
        if( o.innerRadius !== undefined)
        {
            o2.r1 = o.innerRadius;

        }
        else if (o.outerRadius !== undefined)
        {
            o2.r1 = o.outerRadius - t;
        }
        else {
            o2.r1 = 200 - t;
        }
        if (o.outerRadius !== undefined)
        {
            o2.r2 = o.outerRadius;
        }
        else 
        {
            o2.r2 = o2.r1 + t
        }
        if (o2.r1 < 0)
        {
            o2.r1 = 0;
        }
        if (o2.r2 < 0)
        {
            o2.r2 = 0;
        }
        return o2;
    }
}


//draw();
//drawFace();
//drawAnnulus();

annularDrawer("myCanvas",200,200, 80, 120,-0.3, -2.8);

function draw(){
    const canvas = document.getElementById("myCanvas");
    if (canvas.getContext){
        const ctx = canvas.getContext('2d');
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
    }
}


function drawTraings(){
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.lineTo(530,150);
    ctx.lineTo(150, 530);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(540, 150);
    ctx.lineTo(540, 540);
    ctx.lineTo(150, 540);
    ctx.closePath();
    ctx.stroke();
}


function drawFace(){
    const canvas = document.getElementById('myCanvas');
    if(canvas.getContext){
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 0, Math.PI*2, true); // outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // smiley mouth
        ctx.moveTo(65 ,65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); //left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // right eye
        ctx.stroke(); //stroke a path with an outline
    }
}


function drawCurves(){
    const canvas = document.getElementById('myCanvas');
    if(canvas.getContext){
        const ctx = canvas.getContext('2d');
        ctx.moveTo(30,30);
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 3; j++){
                ctx.beginPath();
                const x = 25 + j * 50;
                const y = 25 + i * 50;
                const radius = 20;
                const startAngle = 0;
                const endAngle = Math.PI + (Math.PI * j) / 2;
                const counterclockwise = i % 2 !==0;
                ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
                
                if(i > 1){
                    ctx.stroke();
                    ctx.strokeStyle='blue';
                }
                else {
                    ctx.stroke();
                    ctx.strokeStyle='green';
                    
                }
            }
        }
    }
}


function drawAnnulus(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    
    const x = 250;
    const y = 250;

    var coord1 = getVertex(x, y, 60, -2.8);
    var coord2 = getVertex(x, y, 100, -0.3);
    console.log(coord1);
    console.log(coord2);

    ctx.beginPath();
    ctx.arc(x, y, 100, -0.3, -2.8, true);
    ctx.lineTo(coord1[0],  coord1[1]);  // Right here:  How can I create this line joining the arcs at each end i.e the vertex of the annular
    
    ctx.stroke();
    ctx.beginPath();
    
    ctx.arc(x,y, 60, -2.8, -0.3, false);
    ctx.lineTo(coord2[0], coord2[1]);                   // Right here: How can I create this line joining the arcs at each end i.e the vertex of the annular
    ctx.stroke();
}

function getVertex(c1,c2,radius,angle){
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
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

