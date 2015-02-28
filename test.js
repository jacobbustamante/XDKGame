// use the load event for init code
// the app global variable will be set
window.addEventListener("load", function() {
    paintGreen();
    
    // Testing a mouse click
    player_ship_img.src = "asset/ShipPlaceHolderPlaceHolder.png";
    app.canvas.addEventListener("mousedown", placeShip);
    
    // Testing a key press
    document.addEventListener("keydown", moveShip);
});

function paintGreen() {
    var ctx = app.ctx;
    var w = app.canvas.width;
    var h = app.canvas.height;
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h);   
}


// Testing a mouse click
var player_ship_img = new Image();
var player_ship = {x:0, y:0};

function placeShip(e) {
    var ctx = app.ctx;

    ctx.drawImage(player_ship_img, e.x - (player_ship_img.width / 2), e.y - (player_ship_img.height / 2));
    player_ship.x = e.x - (player_ship_img.width / 2);
    player_ship.y = e.y - (player_ship_img.height / 2);
}

function moveShip(e) {
    var ctx = app.ctx;
    
    paintGreen();
    switch(e.which) {
        case 87: // w
            player_ship.y -= 25;
            break;
        case 83: // s
            player_ship.y += 25;
            break;
        case 65: // a
            player_ship.x -= 25;
            break;
        case 68: // d
            player_ship.x += 25;
            break;
        default:
            break;
    }
    
    ctx.drawImage(player_ship_img, player_ship.x, player_ship.y);
}

