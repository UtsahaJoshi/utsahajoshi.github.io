function Pipe(index, sizeY) {
    this.sizeY = sizeY;
    this.index = index;
    this.scored = false;

    //position according to index (top-bottom placement)
    if (this.index % 2 === 0) {
        this.positionX = canvas.width + 150 * this.index;
    } else {
        this.positionX = canvas.width + 150 * (this.index-1);
    }

    //draw the pipes
    this.drawPipe = function(){
        var sx;
        var sy;
        var sy2;
        var sWidth;
        var sHeight;
        var sHeight2;
        var dx;
        var dy;
        var dy2;
        var dWidth;
        var dHeight;
        var dHeight2;
        var pipe;
        if (this.index % 2 === 0) {
            sx = 0;
            sy = 200;
            sy2 = 0;
            sWidth = 140;
            sHeight = 5;
            sHeight2 = sHeight + 65;
            dx = this.positionX;
            dy = canvas.height - 100 - this.sizeY;
            dy2 = dy - 20;
            dWidth = 100;
            dHeight = this.sizeY;
            dHeight2 = 30;
            pipe = document.getElementById("pipe-bottom");
        } else {
            sx = 0;
            sy = 200;
            sy2 = 730;
            sWidth = 140;
            sHeight = 5;
            sHeight2 = 70;
            dx = this.positionX;
            dy = 0;
            dy2 = this.sizeY;
            dWidth = 100;
            dHeight = this.sizeY;
            dHeight2 = 30;
            pipe = document.getElementById("pipe-top");
        }
        ctx.drawImage(pipe, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.drawImage(pipe, sx, sy2, sWidth, sHeight2, dx, dy2, dWidth, dHeight2);
        getPositionX();
    }.bind(this);

    //get x position for pipes
    var getPositionX = function(){
        if (this.positionX>-100){
            this.positionX -= playerObj.speed;
        } else {
            this.positionX = canvas.width;
            this.scored = false;
            if (this.index % 2 == 0) {
                this.sizeY = Math.floor(Math.random() * (canvas.height/2.5)) + 50;
                var gap = Math.floor(Math.random() * 100) + 250;
                pipes[this.index+1].sizeY = Math.abs(640 - this.sizeY - gap);
            }
        }
    }.bind(this);
}