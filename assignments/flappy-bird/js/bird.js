function Bird(speed){
    this.speed = speed;
    this.sizeX = 50;
    this.sizeY = 40;
    var jumpHeight = 60;
    var currentFrame = 0;
    this.gravity = 2;
    this.birdAnimationState = [false, true, false];
    this.hoverState = true;
    this.positionX = canvas.width/2.5;
    this.positionY = canvas.height/2.5;
    var hoverTopY = canvas.height/2.5 - 7;
    var hoverBottomY = canvas.height/2.5 + 7;
    var hoverUp = true;
    var targetPositionY = this.positionY;
    var jump = false;
    var jumpAcceleration = 2;
    this.gameOver = false;
    var currentFrameData = {c: 1, r: 0, h: 64, w: 92}
    var timeElapse = 0;
    var angle = 0;

    // on click jump
    this.birdMovement = function() {  
        targetPositionY = this.positionY - jumpHeight;
        jump = true;
        jumpAcceleration += 2
        angle = -45*Math.PI/180;
    }

    //draw bird every frame
    this.drawBird = function(){
        timeElapse++;
        var bird = document.getElementById("bird");
        var canvasBird = document.createElement("canvas");
        var ctx2 = canvasBird.getContext("2d");
        canvasBird.height = 2*this.sizeY;
        canvasBird.width = 2*this.sizeX;
        canvas.appendChild(canvasBird);

        var animState = this.birdAnimationState.indexOf(true);
        var cropPosX;
        switch(animState){
            case 0:
                cropPosX = 0;
                break;
            case 1:
                cropPosX = 90;
                break;
            case 2:
                cropPosX = 185;
                break;
        }
        
        getPositionY();

        //get sprite
        (timeElapse> 2 && !this.hoverState) ? currentFrameData = getCurrentFrame(bird) : 0;
        ctx2.clearRect(0, 0, canvasBird.width, canvasBird.height);
        var translateX= (canvasBird.width/2);
        var translateY= (canvasBird.height/2);
        ctx2.translate(translateX,translateY);
        ctx2.rotate(angle); /* rotate on click */
        ctx2.drawImage(bird, currentFrameData.c * currentFrameData.w, currentFrameData.r * currentFrameData.h, currentFrameData.w, currentFrameData.h, 0, 0, this.sizeX, this.sizeY);
        ctx.drawImage(canvasBird, this.positionX - this.sizeX, this.positionY, 2*this.sizeX, 2*this.sizeY)
    }.bind(this);

    //get current frame from spritesheet
    var getCurrentFrame = function(sprite) {
        timeElapse = 0;
        let numColumns = 3;
        let numRows = 1;

        let frameWidth = sprite.width / numColumns;;
        let frameHeight = sprite.height / numRows;;

        currentFrame++;

        let maxFrame = numColumns * numRows - 1;
        if (currentFrame > maxFrame){
            currentFrame = 0;
        }

        let column = currentFrame % numColumns;
        let row = Math.floor(currentFrame / numColumns);

        return {c: column, r: row, h: frameHeight, w: frameWidth}
    }

    //update Y position
    var getPositionY = function(){
        if(this.hoverState && hoverUp && this.positionY < hoverTopY) {
            hoverUp = false;
        }

        if(this.hoverState && !hoverUp && this.positionY > hoverBottomY) {
            hoverUp = true;
        }

        if (jump && targetPositionY < this.positionY) {
            this.positionY -= jumpAcceleration;
            this.gravity = 0;
        } else if(jump && targetPositionY >= this.positionY) {
            targetPositionY = this.positionY;
            jump = false;
            angle = 0;
            jumpAcceleration = 2;
            this.gravity = 2;
        }

        if (!jump && this.gravity<3) {
            this.gravity += 0.1;
        }
        if (!this.hoverState) {
            this.positionY += this.gravity;
        }

        if (this.positionY > canvas.height - 180){
            this.positionY = canvas.height - 180;
            this.gameOver = true;
        }

        if (this.positionY < 0){
            targetPositionY = 0;
            this.positionY = 0;
        }

        if(this.hoverState && hoverUp) {
            this.positionY -= 0.8;
        } else if(this.hoverState && !hoverUp) {
            this.positionY += 0.8;
        }
    }.bind(this);

    //reset player variables
    this.resetPlayer = function(){
        hoverUp = true;
        targetPositionY = this.positionY;
        jump = false;
        angle = 0;
        jumpAcceleration = 2;
        this.gravity = 2;
        this.birdAnimationState = [false, true, false];
        this.hoverState = true;
        this.positionX = canvas.width/2.5;
        this.positionY = canvas.height/2.5;
        this.gameOver = false;
    }

    //collision with pipes
    this.collisionDetection = function(){
        var posXCollide;
        var posYCollide;
        for(var i=0; i<4; i++){
            if (i%2 == 0){
                posXCollide = this.positionX > pipes[i].positionX - 40 && this.positionX < pipes[i].positionX + 100;
                posYCollide = this.positionY>canvas.height - 150 - pipes[i].sizeY - 40 && this.positionY<canvas.height - 120;
            } else {
                var posXCollide = this.positionX > pipes[i].positionX - 40 && this.positionX < pipes[i].positionX + 100;
                var posYCollide = this.positionY>0 && this.positionY<pipes[i].sizeY;
            }
            if (posXCollide && posYCollide)
            {
                this.gameOver = true;
            }
        }
    }
}