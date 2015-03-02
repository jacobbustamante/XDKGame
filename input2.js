var keys = new Array(200);
var mouseButtons = new Array(20);
var mousePos = {
    x: 0,
    y: 0
};
for (var i = 0; i < keys.length; ++i) {
    keys[i] = false;
}
for (var i = 0; i < mouseButtons.length; ++i) {
    mouseButtons[i] = false;
}

function updatePlayerShip() {
    var velX = 0
    var velY = 0;
    var shipDir = app.camera.screenToWorld(mousePos)
    this.angle = Math.atan2(shipDir.x - this.x, shipDir.y + this.y);
    if (keys[32] || mouseButtons[1]) {
        this.fireWeapon();
    }
    // w
    if (keys[87] && !mouseButtons[3]) {
        velY += 1;
    }
    // a
    if (keys[65] && !mouseButtons[3]) {
        velX += -1;
    }
    // s
    if (keys[83] && !mouseButtons[3]) {
        velY += -1;
    }
    // d
    if (keys[68] && !mouseButtons[3]) {
        velX += 1;
    }
    
    if (mouseButtons[3]) {
        velX += Math.sin(this.angle);
        velY -= Math.cos(this.angle);
    }
    
    var vec = new b2Vec2(velX, velY);
    
    vec.Normalize();
    vec.op_mul(this.topSpeed);
    this.vx = vec.get_x();
    this.vy = vec.get_y();
}

document.addEventListener("mousewheel", zoomCamera, false);
document.addEventListener("DOMMouseScroll", zoomCamera, false);
 


//app.canvas.addEventListener("keydown", registerKey, true);
window.addEventListener("keydown", registerKey, true);
window.addEventListener("keyup", deregisterKey, true);
window.addEventListener("mousemove", registerMousePos, true);
window.addEventListener("mousedown", registerMouseDown, true);
window.addEventListener("mouseup", deregisterMouseDown, true);
window.addEventListener("contextmenu", noAction, false);

function noAction(e) {
    e.preventDefault();
    return false;
}

window.addEventListener("touchstart", noAction);
window.addEventListener("touchmove", noAction);
window.addEventListener("touchend", noAction);
window.addEventListener("touchcancel", noAction);

function setupInput() {
    
}

function zoomCamera(e) {
    var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (mouseButtons[2]) {
        e.preventDefault();
        return;
    }
    if (delta > 0) {
        app.camera.PixelsToMeters = (app.camera.PixelsToMeters/1.05);
    }
    else {
        app.camera.PixelsToMeters = (app.camera.PixelsToMeters*1.05);
    }
}

function updateMousePos(canvas) {
    var rect = canvas.getBoundingClientRect();
    mousePosPixel = {
        x: mousePos.x - rect.left,
        y: canvas.height - (mousePos.y - rect.top)
    };
    //mousePos = app.camera.screenToWorld(mousePosPixel);
}

function registerMousePos(e) {
    //e.preventDefault();
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    updateMousePos(app.canvas);
}

function registerMouseDown(e) {
    e.preventDefault();
    mouseButtons[e.which] = true;
    
}

function deregisterMouseDown(e) {
    e.preventDefault();
    mouseButtons[e.which] = false;
}

function registerKey(e) {
    
    keys[e.which] = true;
    if (e.repeat) {
        e.preventDefault();
    }
}

function deregisterKey(e) {
    keys[e.which] = false;
    if (e.repeat) {
        e.preventDefault();
    }
}

