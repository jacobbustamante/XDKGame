// use the load event for init code
// the app global variable will be set before this event fires
window.addEventListener("load", function() {
    //paintGreen();

    document.body.addEventListener("touchstart", onTap);
    document.body.addEventListener("touchmove", noAction);
    document.body.addEventListener("touchend", noAction);
    document.body.addEventListener("touchcancel", noAction);
    
    // Testing a key press or mouse click
    player_ship_img.src = "asset/ShipPlaceHolderPlaceHolder.png";
    bullet_img.src = "asset/ShipPlaceHolderPlaceHolder.png";
    power_ship_img.src = "asset/PowerShip.png";
    power_ship_img.onload = function() {
        power_ship_animated.initAnimatedImage(power_ship_img, 6, 1);
    }
    document.addEventListener("keydown", moveShip);
    app.canvas.addEventListener("mousedown", placeShip);
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


// Testing a mouse click or key press
var player_ship_img = new Image();
var player_ship = {x:0, y:0};
var bullet_img = new Image();
var bullet = {x:0, y:0};
var power_ship_img = new Image();
var power_ship = {x:0, y:0};
var power_ship_animated = new AnimatedImage();

function placeShip(e) {
    var ctx = app.ctx;

    ctx.drawImage(power_ship_img, e.x - (player_ship_img.width / 2), e.y - (player_ship_img.height / 2));
    power_ship.x = e.x - (power_ship_img.width / 2);
    power_ship.y = e.y - (power_ship_img.height / 2);
    bullet.x = player_ship.x;
    bullet.y = player_ship.y + 45;
}

function moveShip(e) {
    var ctx = app.ctx;
    
    //paintGreen();
    switch(e.which) {
        case 87: // w
            power_ship.y -= 25;
            break;
        case 83: // s
            power_ship.y += 25;
            break;
        case 65: // a
            power_ship.x -= 25;
            break;
        case 68: // d
            power_ship.x += 25;
            break;
        default:
            break;
    }
    
    
    //ctx.drawImage(player_ship_img, player_ship.x, player_ship.y);
    //ctx.drawImage(power_ship_img, 0,0, power_ship_img.width, power_ship_img.height, power_ship.x, power_ship.y,power_ship_img.width * 1, power_ship_img.height * 1);
    power_ship_animated.drawAnimatedImage(ctx, power_ship.x, power_ship.y);
    //ctx.drawImage(bullet_img, bullet.x, bullet.y);
}

