function setupInput() {
    var _done = 2;
    
    function onImgLoad(e) {
        if(--_done == 0) {
            afterImgLoad();
        }
    }
    
    var dpadBase = new Image();
    var dpadMove = new Image();

    
    dpadBase.addEventListener("load", onImgLoad);
    dpadMove.addEventListener("load", onImgLoad);
    
    dpadBase.src = "asset/dpadBase.png";
    dpadMove.src = "asset/dpadMove.png";
    
    function afterImgLoad() {
        
    }
    
    function Dpad(x, y) {
        this.x = x;
        this.y = y;
        
        this.fx = x;
        this.fy = y;

        this.touchDist = 25;
        this.update = function() {};


        function _render() {
            app.ctx.drawImage(dpadBase, this.x, this.y);
            var tx = this.x;
            var ty = this.y;
            this.x = this.fx;
            this.y = this.fy;
            app.ctx.drawImage(dpadMove, this.x, this.y);
            this.x = tx;
            this.y = ty;
        }
        
        function touchMove(x, y) {
            if (x > this.x) {
                this.fx = Math.min(this.x + this.touchDist, x);
            }
            else if (x  < this.x) {
                this.fx = Math.max(this.x - this.touchDist, x);
            }
            else {
                this.fx = x;
            }
            
            if (y > this.y) {
                this.fy = Math.min(this.y + this.touchDist, y);
            }
            else if (y  < this.y) {
                this.fy = Math.max(this.y - this.touchDist, y);
            }
            else {
                this.fy = y;
            }
        }
        
        function _distance(x, y) {
            var dy = this.y - y;
            var dx = this.x - x;
            var dist = Math.sqrt(dy*dy + dx*dx);
            app.player.speed = Math.min(dist, this.touchDist);
            return dist;
        }
        
        function _theta(x, y) {
            var theta = Math.atan2(this.y - y, this.x - x);
            app.player.theta = (180/Math.PI) * theta;
        }
        
        function onTouchMove(e) {
            
        }
        
        this.distance = _distance.bind(this);
        this.render = _render.bind(this);
        
    }

    
    var dPads = new Array(2);
    
    function startTap(e) {
        e.preventDefault();
        console.log(e);
        var g = app.ctx;
        for(var i = 0, len = e.touches.length; i < len; ++i) {
            var t = e.touches[i];
            var x = t.clientX;
            var y = t.clientY;
            var dpad = new Dpad(x, y);
            if (x < app.canvas.width/2) {
                dPads[0] = dpad;
            }
            else {
                dPads[1] = dpad;
            }
            app.actors.push(dpad);
        }
    }
    
    
}
function onTap(e) {
                e.preventDefault();
                var g = app.ctx;
                for(var i = 0, len = e.touches.length; i < len; ++i) {
                    var t = e.touches[i];
                    var x = t.clientX;
                    var y = t.clientY;
                    v//ar str = "(" + x + "," + y + ")";
                    //g.fillText(str, x, y);
                    if (e.x <=(app.canvas.width / 2))
                        player.x -= 25;
                    else
                        player.x += 25;
                }
            }

