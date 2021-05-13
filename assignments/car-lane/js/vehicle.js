function Vehicle(){
    //initialize vehicle object with variables
    this.vehicleInstance = function(index, vehicles, asset, canvas, speed){
        this.asset = asset;
        this.speed = speed;
        this.lane = Math.floor(Math.random() * 3);
        this.sizeX = canvas.width/14;
        this.sizeY = canvas.width/8;
        this.hasVehicleBelow = false;
        this.positionY = -this.sizeY * (Math.floor(Math.random()*2)+3)
        this.canvas = canvas;
        this.randomAssetIndex = Math.floor(Math.random()*5) + 2;
        this.lanePositions = {}
        this.sizeX = canvas.width/14;
        this.sizeY = canvas.width/8;
        this.score = 0;
        this.lanePositions = {
            0: canvas.width/2-(canvas.width/7.5),
            1: canvas.width/2-(canvas.width/30),
            2: canvas.width/2+(canvas.width/15.5)
        }

        //get new position if spawn collision
        this.collisionBetweenVehicles(index, vehicles)
    }.bind(this);

    //function to detect collision while spawning and re-spawn
    this.collisionBetweenVehicles = function(index, vehicles){
            for(var i=0; i<vehicles.length;i++){
                if ((i != index) && this.lanePositions[this.lane] < vehicles[i].lanePositions[vehicles[i].lane] + vehicles[i].sizeX &&
                    this.lanePositions[this.lane] + this.sizeX > vehicles[i].lanePositions[vehicles[i].lane] &&
                    this.positionY < vehicles[i].positionY + vehicles[i].sizeY &&
                    vehicles[i].positionY + vehicles[i].sizeY > vehicles[i].positionY) {
                        (this.lane !== 2) ? this.lane = 2 : this.lane = Math.floor(Math.random()*2)
                        this.positionY = -this.sizeY * (Math.floor(Math.random()*2)+4)
                 }
            }
    }.bind(this);

    //draw vehicle to the canvas
    this.drawVehicle = function(ctx, index, vehicles){
        if(this.positionY>this.canvas.height + this.sizeY){
            this.positionY = -this.sizeY * (Math.floor(Math.random()*3)+1)
            this.lane = Math.floor(Math.random() * 3);
            this.randomAssetIndex = Math.floor(Math.random()*5) + 2;
            this.collisionBetweenVehicles(index, vehicles)
        }

        ctx.drawImage(this.asset[this.randomAssetIndex], this.lanePositions[this.lane], this.positionY, this.sizeX, this.sizeY);
        this.positionY += this.speed;
        if (this.speed>25) this.speed = 25;
    }.bind(this);
}