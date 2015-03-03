
function showMainMenu()
{
    app.inMenu = true;
    window.addEventListener("mousedown", closeMainMenu, true);
    drawMainMenu();
}

function closeMainMenu()
{
    app.inMenu = false;
    window.removeEventListener("mousedown", closeMainMenu, true);
}

function drawMainMenu()
{
    app.ctx.save();
        app.ctx.fillStyle = 'black';
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        app.ctx.drawImage(app.cache["asset/bg.png"], 0, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 800, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 0, 800);
        app.ctx.drawImage(app.cache["asset/bg.png"], 800, 800);
        app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 0);
        app.ctx.drawImage(app.cache["asset/bg.png"], 1600, 800);
        app.ctx.fillStyle = 'white';
        app.ctx.textAlign="center";
        app.ctx.font=app.canvas.width/20+"px Arial"; 
        app.ctx.fillText("Khosmood Rising", app.canvas.width / 2, app.canvas.height / 4);
        app.ctx.fillText("Touch anywhere to begin", app.canvas.width / 2, app.canvas.height / 2);
    app.ctx.restore();
}