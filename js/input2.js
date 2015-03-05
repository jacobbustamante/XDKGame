function setupInput(){
    var _lastEvent = getTimeStamp();
    var _lastUpdate = 0;
    var _lastPlayer = null;
    
    var _keys = new Array(200); fillFalse(_keys);
    var _mouseButtons = new Array(20); fillFalse(_mouseButtons);
    var _mousePos = { x: app.canvas ? app.canvas.width/2 : 0, y: 0 };
    
    var _fireWeaponKeys = makeCharCodeArray("", 32);
    var _moveLeft = makeCharCodeArray("a", 37)
    var _moveUp = makeCharCodeArray("w", 38);
    var _moveRight = makeCharCodeArray("d", 39);
    var _moveDown = makeCharCodeArray("s", 40);
    var _powerChange = makeCharCodeArray("j");
    var _plasmaChange = makeCharCodeArray("i");
    var _spreadChange = makeCharCodeArray("k");
    var _waveChange = makeCharCodeArray("l");
    var _getPointsSon = makeCharCodeArray("t");
    var _toggleAutoFire = makeCharCodeArray("r");

    var _lastChangeTime = 0;
    var _changeDelay = 2000;
    var _autoFireOn = false;
    var _lastAutoFireChangeTime = 0;
    
    
    window.changePlayer = function(type) {
        app.cache["asset/ControlNewShip.wav"].play();
        if(type == "Power")
            app.player = new PowerShip(app.player.x, app.player.y);
        if(type == "Plasma")
            app.player = new PlasmaShip(app.player.x, app.player.y);
        if(type == "Spread")
            app.player = new SpreadShip(app.player.x, app.player.y);
        if(type == "Wave")
            app.player = new WaveShip(app.player.x, app.player.y);
        app.player.update =  updatePlayerShip;
        _lastChangeTime = getTimeStamp();
    }
    
    window.updatePlayerShip2 = function() {
        if (isKeyDown(_fireWeaponKeys) || _mouseButtons[1]) {
            this.fireWeapon();
        }
        this.aimTarget = app.camera.screenToWorld(_mousePos);
        if (_mouseButtons[3]) {
            this.navTarget = this.aimTarget;
        }
        this.aimAtTarget();
        this.moveToNavTarget();
        
    }
    
    window.updatePlayerShip = function() {
        var velX = 0
        var velY = 0;
        //tested
        var shipDir = app.camera.screenToWorld(_mousePos);
        app.player.angle = Math.atan2(app.player.x - shipDir.x, shipDir.y - app.player.y);

        if (isKeyDown(_fireWeaponKeys) || _mouseButtons[1]) {
            this.fireWeapon();

        }
        if (isKeyDown(_moveUp) && !_mouseButtons[3]) {
            velY += 1;
        }
        if (isKeyDown(_moveLeft) && !_mouseButtons[3]) {
            velX += -1;
        }
        if (isKeyDown(_moveDown) && !_mouseButtons[3]) {
            velY += -1;
        }
        if (isKeyDown(_moveRight) && !_mouseButtons[3]) {
            velX += 1;
        }

        if (_mouseButtons[3]) {
            velX -= Math.sin(this.angle);
            velY += Math.cos(this.angle);
        }

        if (isKeyDown(_toggleAutoFire)) {
            if (getTimeStamp() > _lastAutoFireChangeTime + 500) {
                _lastAutoFireChangeTime = getTimeStamp();
                _autoFireOn = !_autoFireOn;
            }
        }
        if (_autoFireOn)
        {
            this.fireWeapon();
        }

        /*
        if (isKeyDown(_powerChange)) {
            if (getTimeStamp() > _lastChangeTime + _changeDelay) {
                changePlayer("Power");
                this.update = function(){};
            }
        }
        if (isKeyDown(_plasmaChange)) {
            if (getTimeStamp() > _lastChangeTime + _changeDelay) {
                changePlayer("Plasma");
                this.update = function(){};
            }
        }

        if (isKeyDown(_spreadChange)) {
            if (getTimeStamp() > _lastChangeTime + _changeDelay) {
                changePlayer("Spread");
                this.update = function(){};
            }
        }
        if (isKeyDown(_waveChange)) {
            if (getTimeStamp() > _lastChangeTime + _changeDelay) {
                changePlayer("Wave");
                this.update = function(){};
            }
        }

        if (isKeyDown(_getPointsSon)) {
            app.score++; 
            console.log(app.score);
        }
        */

        var vec = new b2Vec2(velX, velY);

        vec.Normalize();
        vec.op_mul(this.topSpeed);
        this.vx = vec.get_x();
        this.vy = vec.get_y();

        _lastPlayer = this;
        _lastUpdate = _lastEvent;
    }
    
    document.addEventListener("mousewheel", zoomCamera, false);
    document.addEventListener("DOMMouseScroll", zoomCamera, false);
    
    window.addEventListener("keydown", registerKey, true);
    window.addEventListener("keyup", deregisterKey, true);
    window.addEventListener("mousemove", registerMousePos, true);
    window.addEventListener("mousedown", registerMouseDown, true);
    window.addEventListener("mouseup", deregisterMouseDown, true);
    window.addEventListener("contextmenu", noAction, false);

    window.addEventListener("touchstart", noAction);
    window.addEventListener("touchmove", noAction);
    window.addEventListener("touchend", noAction);
    window.addEventListener("touchcancel", noAction);
    
    function noAction(e) {
        e.preventDefault();
        return false;
    }
    
    function zoomCamera(e) {
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) {
            app.camera.PixelsPerMeter = (app.camera.PixelsPerMeter/1.05);
        }
        else {
            app.camera.PixelsPerMeter = (app.camera.PixelsPerMeter*1.05);
        }
    }

    function registerMousePos(e) {
        _mousePos.x = e.clientX;
        _mousePos.y = e.clientY;
        _lastEvent = e.timeStamp ? e.timeStamp : getTimeStamp();
    }

    function registerMouseDown(e) {
        e.preventDefault();
        _mouseButtons[e.which] = true;
        _lastEvent = e.timeStamp ? e.timeStamp : getTimeStamp();
    }

    function deregisterMouseDown(e) {
        e.preventDefault();
        _mouseButtons[e.which] = false;
        _lastEvent = e.timeStamp ? e.timeStamp : getTimeStamp();
    }

    function registerKey(e) {
        _keys[e.which] = true;
        if (e.repeat) {
            e.preventDefault();
        }
        else {
            _lastEvent = e.timeStamp ? e.timeStamp : getTimeStamp();
        }
    }

    function deregisterKey(e) {
        _keys[e.which] = false;
        if (e.repeat) {
            e.preventDefault();
        }
        else {
            _lastEvent = getTimeStamp();
        }
    }
    
    function makeCharCodeArray(str) {
        str = str.toUpperCase();
        var len = str.length + arguments.length - 1;
        var arr = new Array(len);
        var i = 0;
        
        for (; i < str.length; ++i) {
            arr[i] = str.charCodeAt(i);
        }
        
        var k = 1;
        while (i < len) {
            arr[i++] = arguments[k++];
        }
        
        return arr;
    }
    
    function isKeyDown(arrCodes) {
        var len = arrCodes.length;
        var i = 0;
        while (i < len) {
            if (_keys[arrCodes[i++]]) {
                return true;
            }
        }
        return false;  
    }
    
    function fillFalse(arr) {
        var len = arr.length;
        var i = 0;
        while (i < len) {
            _keys[i++] = false;
        }
    }
    
    function getTimeStamp() {
        return (new Date()).getTime();
    }   
}



