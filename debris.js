function Debris(x, y) {
    GameType.call(this, "DEBRIS", true);
    this.x = x;
    this.y = y;
    var sprite = Math.random() < 0.5 ? "asset/debris.png" : "asset/moon.png";
    AnimatedImage.call(this, app.cache[sprite], 1, 1);
    this.update = function(){};
    this.updateCurrentFrame = function() { return true; };
}