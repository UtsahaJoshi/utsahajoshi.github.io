function Bullet(){

    //initial bullet with variables
    this.bulletInit = function(canvas, positionX){
        this.positionX = positionX;
        this.sizeX = canvas.width/20;
        this.sizeY = canvas.width/15;
        this.positionY = canvas.height;
        this.speed = 30;
    }

    //draw the bullet on the canvas
    this.drawBullet = function(ctx, asset){
        ctx.drawImage(asset, this.positionX, this.positionY, this.sizeX, this.sizeY);
        this.positionY -= this.speed;
    }

    //check for vehicle collision with bullet
    this.collision = function(vehicles){
        for(var i=0; i<vehicles.length;i++){
            if (this.positionX < vehicles[i].lanePositions[vehicles[i].lane] + (vehicles[i].sizeX-25) &&
                    this.positionX + (this.sizeX-25) > vehicles[i].lanePositions[vehicles[i].lane] &&
                    this.positionY < vehicles[i].positionY + (vehicles[i].sizeY-25) &&
                    this.positionY + (this.sizeY-25) > vehicles[i].positionY) {
                        vehicles[i].lane = Math.floor(Math.random()*2)
                        vehicles[i].positionY = -vehicles[i].sizeY * (Math.floor(Math.random()*5)+3)
                        vehicles[i].collisionBetweenVehicles(i, vehicles)
                        return true;
             }
        }
    }
}