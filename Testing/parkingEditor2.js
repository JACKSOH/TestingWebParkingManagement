
var Ecanvas, Ccanvas = false; // canvas objects
var inEcanvas = false; //check whether the comp dragg
var del = false;
var delHover = false;
var ec, cc = false; //canavas with context objects
var startX, startY;
var draggedComp = [];
var comps = [];
var isDragging = false;
var mouseOnCanvas; // declare mouse on which cavas
var mx, my;//declare mouse location X and Y
var compStartX, compStartY; //declare componenet origina location
var overCC = false;; // over component canvas?
var selectedComp, selectEditComp; // index of the Component selecting
var EcanvasWidth, EcanvasHeight, CcanvasWidth, CcanvasHeight;



class component {
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;

    }
}
class basic extends component {
    constructor(x, y, w, h, name, imagePath) {
        super(x, y, w, h, name);

        this.imagePath = imagePath;
    }
}
class slot extends component {
    constructor(x, y, w, h, name, quantity) {

        super(x, y, w, h, name);

        this.quantity = quantity;
    }
}


init();
setInterval(drawComponent, 10);
setInterval(drawEditor, 10);
Ecanvas.onmousedown = mouseDown;
Ecanvas.onmouseup = mouseUp;
Ecanvas.onmousemove = mouseMove;
Ecanvas.onmouseout = mouseOut;
Ccanvas.onmousedown = mouseDown;
Ccanvas.onmouseup = mouseUp;
Ccanvas.onmousemove = mouseMove;
Ccanvas.onmouseout = mouseOut;
function init() {
    var exit = new basic(40, 20, 50, 40, "exit", "");
    var entry = new basic(40, 80, 50, 40, "entry", "");
    var block = new basic(150, 20, 50, 40, "Blockage", "");
    comps.push(exit);
    comps.push(entry);
    comps.push(block);
    Ecanvas = document.getElementById("editCanvas");
    EcanvasHeight = Ecanvas.height;
    EcanvasWidth = Ecanvas.width;
    ec = Ecanvas.getContext("2d"); //ec stand for editor canvas

    Ccanvas = document.getElementById("compCanvas");
    CcanvasWidth = Ccanvas.width;
    CcanvasHeight = Ccanvas.height;
    cc = Ccanvas.getContext("2d"); //cc stand for comp canvas

}

function rectForCC(x, y, w, h, name) {//for Component canvas

    cc.beginPath();
    cc.lineWidth = "3";
    cc.strokeStyle = "red";
    cc.rect(x, y, w, h);
    cc.font = "10px Arial";
    cc.fillText(name, (x + 10), (y + h) + 10);
    cc.stroke();
}
function drawComponent() {

    cc.clearRect(0, 0, CcanvasWidth, CcanvasHeight);
    for (var i = 0; i < comps.length; i++) {
        var c = comps[i];
        rectForCC(c.x, c.y, c.w, c.h, c.name);
    }
}
function rectForEC(x, y, w, h, name) { //for Editor Canvas

    ec.beginPath();
    ec.lineWidth = "3";
    ec.strokeStyle = "red";
    ec.font = "10px Arial";
    ec.fillText(name, x + (w / 2), y + (h / 2));
    ec.rect(x, y, w, h);
    ec.stroke();
}
function drawEditor() {
    ec.clearRect(0, 0, EcanvasWidth, EcanvasHeight);
    for (var i = 0; i < draggedComp.length; i++) {
        var c = draggedComp[i];
        rectForEC(c.x, c.y, c.w, c.h, c.name);
    }
    if (isDragging) { // draw the cancel button if the comp start dragging
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 100, 100, 150, 110, 0, 0, 300, 220);
        }
        img.src = "img/icons8-delete-50.png";
        if (delHover) {
            alert(img.background);
        }
       
        del = { x: 10, y: 10, w: 50, h: 50 };
        ec.drawImage(img, del.x, del.y, del.w, del.h);
        
    }
}

function getMousePos(canvas, evt) { // get mouse position in canvas
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseDown(e) {
    if (e.target.id === "compCanvas") { //check box in comp canvas
        mouseOnCanvas = new getMousePos(Ccanvas, e);
        mx = mouseOnCanvas.x;
        my = mouseOnCanvas.y;
        startX = mx;
        startY = my;
        for (var i = 0; i < comps.length; i++) {//check collife any component
            var c = comps[i];
            if (mx > c.x && mx < c.x + c.w && my > c.y && my < c.y + c.h) {
                compStartX = c.x;
                compStartY = c.y;
                isDragging = true;
                //add to dragged component
                var newComp = new basic(40, 40, c.w, c.h, c.name);
                draggedComp.push(newComp);
                selectedComp = i;
            }
        }

    } else if (e.target.id === "editCanvas") {//for editor

        mouseOnCanvas = new getMousePos(Ecanvas, e);
        mx = mouseOnCanvas.x;
        my = mouseOnCanvas.y;
        startX = mx;
        startY = my;
        for (var i = 0; i < draggedComp.length; i++) {
            var c = draggedComp[i];
            if (mx > c.x && mx < c.x + c.w && my > c.y && my < c.y + c.h) {
                showDelete();
                isDragging = true;
                //add to dragged component
                selectEditComp = i;
            }
        }
    }


}
function mouseUp(e) {

    if (e.target.id === "compCanvas") { //check box in comp canvas


        comps[selectedComp].x = compStartX;
        comps[selectedComp].y = compStartY;

        isDragging = false;
        selectedComp = false;

    } else if (e.target.id === "editCanvas") {
        mouseOnCanvas = new getMousePos(Ecanvas, e);
        mx = mouseOnCanvas.x;
        my = mouseOnCanvas.y;

        if (mx > del.x && mx < del.x + del.w && my > del.y && my < del.y + del.h) {
            var selName = draggedComp[selectEditComp].name; // save the selected dragged component name before it deleted
            draggedComp.splice(selectEditComp, 1);
            alert(selName + " has been deleted.");

        }
        isDragging = false;
        selectEditComp = false;

    }


}
function mouseOut(e) {

    if (e.target.id === "compCanvas") {
        comps[selectedComp].x = compStartX;
        comps[selectedComp].y = compStartY;

        isDragging = false;
        selectedComp = false;
    } else if (e.target.id === "editCanvas") {

    }
}
function mouseMove(e) {

    if (isDragging) {
        if (e.target.id === "compCanvas") { //move the selected in canvas
            mouseOnCanvas = new getMousePos(Ccanvas, e);
            mxt = mouseOnCanvas.x;
            myt = mouseOnCanvas.y;
            var dx = mxt - startX; // distance of the mouse move
            var dy = myt - startY;
            comps[selectedComp].x += dx;
            comps[selectedComp].y += dy;
          
           



        } else if (e.target.id === "editCanvas") {

            mouseOnCanvas = new getMousePos(Ecanvas, e);
            mxt = mouseOnCanvas.x;
            myt = mouseOnCanvas.y;

            var dx = mxt - startX; // distance of the mouse move
            var dy = myt - startY;
            draggedComp[selectEditComp].x += dx;
            draggedComp[selectEditComp].y += dy;
            document.getElementById("message").innerHTML = dx;
            if (mxt > del.x && mxt < del.x + del.w && myt > del.y && myt < del.y + del.h) {
                alert();
                delHover = true;
            } else {
                delHover = false;
            }
        }

        startX = mxt;
        startY = myt;
    }
}
function showDelete() {


}

