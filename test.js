// use the load event for init code
// the app global variable will be set before this event fires
window.addEventListener("load", function() {
    document.body.addEventListener("touchstart", onTap);
    document.body.addEventListener("touchmove", noAction);
    document.body.addEventListener("touchend", noAction);
    document.body.addEventListener("touchcancel", noAction);
});

function noAction(e) {
    e.preventDefault();
}
                                   
function onTap(e) {
    e.preventDefault();
    var g = app.ctx;
    for(var i = 0, len = e.touches.length; i < len; ++i) {
        var t = e.touches[i];
        var x = t.clientX;
        var y = t.clientY;
        var str = "(" + x + "," + y + ")";
        g.fillText(str, x, y);
    }
}
                                   
function paintGreen() {
    var ctx = app.ctx;
    var w = app.canvas.width;
    var h = app.canvas.height;
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h);   
}
