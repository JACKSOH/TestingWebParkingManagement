
var ec, Ecanvas = false;
var mouseOnCanvas = false; // get mouse pointer location (x,y)
var rects = [];
var isDragging = false;
var EcanvasWidth = 0;
var EcanvasHeight = 0;
var drag = false;
var startX;
var startY;
var touch;
var touchNo;

var x = 75;
var y = 50;

var initX = 20;
var initY = 20;

init();
class rectanagle {
    constructor(x, y, w, h, touch) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
}
Ecanvas.onmousedown = mouseDown;
Ecanvas.onmouseup = mouseUp;
Ecanvas.onmousemove = mouseMove;

function draw() {
    ec.clearRect(0, 0, EcanvasWidth, EcanvasHeight);
    rects.forEach(function (entry) {
        rectForEditor(entry.x, entry.y, entry.w, entry.h);
    });
    document.getElementById("message").innerHTML = rects[0].x;
}
function init() {
    touch = false;
    touchNo = 0;
    Ecanvas = document.getElementById("canvas");
    EcanvasHeight = Ecanvas.height;
    EcanvasWidth = Ecanvas.width
    ec = Ecanvas.getContext("2d"); //ec stand for editor canvas
    return setInterval(draw, 1);
}
function mouseDown(e) {
    
    mouseOnCanvas = new getMousePos(Ecanvas, e);
    var mx = mouseOnCanvas.x;
    var my = mouseOnCanvas.y;
    startX = mx;
    startY = my;
    dragok = true;
    
}
function mouseUp(e) {
    dragok = false;
    touch = false;
    touchNo = null;
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function mouseMove(e) {
    mouseOnCanvas = new getMousePos(Ecanvas, e);
    var mx = mouseOnCanvas.x;
    var my = mouseOnCanvas.y;
    var dx = mx - startX;
    var dy = my - startY;
    //document.getElementById("message").innerHTML = mouseOnCanvas.x;

    if (dragok) {
        
       
        if (touch) { //got touch
            rects[touchNo].x += dx;
            rects[touchNo].y += dy;
                
        } else { //no touch
            
            for (var i = 0; i < rects.length; i++) {
                var r = rects[i];
                if (mx > r.x && mx < r.x + r.w && my > r.y && my < r.y + r.h) {
                    r.x += dx;
                    r.y += dy;
                    touch = true;
                    touchNo = i;
                }
            }
        }


    }
    startX = mx;
    startY = my;

}
function addRect() {
    let r = new rectanagle(initX, initY, 40, 40);
    initX += 40;
    initY += 40;
    rects.push(r);
    document.getElementById("message").innerHTML = r.x;
}

function rectForEditor(x, y, width, height) {
    ec.beginPath();
    ec.lineWidth = "6";
    ec.strokeStyle = "red";
    ec.rect(x, y, width, height);
    ec.stroke();
}
