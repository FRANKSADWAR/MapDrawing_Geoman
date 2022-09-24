function mycanvaDraw(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;
    var strokewidth=10;
    var cx=cw/2;
    var cy=ch/2;
    var PI=Math.PI;
    var radius=Math.min(cw,ch)/2-strokewidth/2;
    ctx.lineWidth=strokewidth;
    ctx.lineCap='butt';
    ctx.beginPath();
    ctx.arc(cx,cy,radius,-PI*3/4,-PI/16);
    ctx.strokeStyle='mediumVioletRed';
    ctx.stroke();
}

function drawEulerSpiral(canvas, T, N, scale) {
    ctx = canvas.getContext("2d");
    var dx, dy, t=0, prev = {x:0, y:0}, current;
    var dt = T/N;
    ctx.beginPath();
    while (N --) {
       dx = Math.cos(t*t) * dt;
       dy = Math.sin(t*t) * dt;
       t += dt;
       current = {
          x: prev.x + dx,
          y: prev.y + dy
       };
       ctx.lineTo(current.x*scale, current.y*scale);
       prev = current;
    }
    ctx.stroke();
}

drawEulerSpiral(document.getElementById("canvas"), 1.4 , 9000, 600);
