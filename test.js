// use the load event for init code
// the app global variable will be set
window.addEventListener("load", function() {
    paintGreen();
});

function paintGreen() {
    var ctx = app.ctx;
    var w = app.canvas.width;
    var h = app.canvas.height;
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h);   
}
