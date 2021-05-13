function Car(){
    this.carInstance = function(canvas){
        this.playerLane = [false, true, false]
        this.sizeX = canvas.width/16;
        this.sizeY = canvas.width/10;
        this.positionX = canvas.width/2-(canvas.width/34);
        this.lanePositions = {
            0: canvas.width/2-(canvas.width/7.8),
            1: canvas.width/2-(canvas.width/34),
            2: canvas.width/2+(canvas.width/15.2)
        }
        this.positionY = canvas.height - (this.sizeY+this.sizeY/10);
        this.speed = 8;
    }.bind(this);

    this.switchLane = function(laneDirection){
        switch(laneDirection){
            case "right":
                for(var i = 0; i<this.playerLane.length; i++){
                    if(this.playerLane[i] && i != 2){
                        this.playerLane[i] = false;
                        this.playerLane[i+1] = true;
                        return;
                    }
                }
                break;
            case "left":
                for(var i = 0; i<this.playerLane.length; i++){
                    if(this.playerLane[i] && i != 0){
                        this.playerLane = this.playerLane;
                        this.playerLane[i] = false;
                        this.playerLane[i-1] = true;
                        return;
                    }
                }
                break;
        }
    }.bind(this);

    this.drawPlayerCar = function(ctx, asset){
        setPlayerCarNewPos();
        ctx.drawImage(asset, this.positionX, this.positionY, this.sizeX, this.sizeY);
    }.bind(this);

    this.collision = function(vehicles){
        for(var i=0; i<vehicles.length;i++){
            if (this.positionX < vehicles[i].lanePositions[vehicles[i].lane] + (vehicles[i].sizeX-25) &&
                    this.positionX + (this.sizeX-25) > vehicles[i].lanePositions[vehicles[i].lane] &&
                    this.positionY < vehicles[i].positionY + (vehicles[i].sizeY-25) &&
                    this.positionY + (this.sizeY-25) > vehicles[i].positionY) {
                        return true;
             }
        }
    }.bind(this);

    var setPlayerCarNewPos = function(){
        var moveTo = this.playerLane.indexOf(true);
        this.speed = this.speed + 0.005;
        if (this.speed > 25) this.speed = 25;
    
        if (this.positionX < this.lanePositions[moveTo]){
            this.positionX += this.speed * 2;
            if (this.positionX > this.lanePositions[moveTo]){
                this.positionX = this.lanePositions[moveTo];
            }
        } else if (this.positionX > this.lanePositions[moveTo]){
            this.positionX -= this.speed * 2;
            if (this.positionX < this.lanePositions[moveTo]){
                this.positionX = this.lanePositions[moveTo];
            }
        }
    
    }.bind(this);
}