// initialize
var canvas = document.createElement("canvas");
canvas.id = 'canvas';
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.appendChild(canvas);
var road1PositionY = 0;
var road2PositionY = -canvas.height;

var ctx = canvas.getContext("2d");

var imageAssets = document.getElementsByClassName("image-assets");
var allAssets = imageAssets[0].children;

var playerObj = new Car();
playerObj.carInstance(canvas);

var totalScore = 0;
var highScore = 0;

// get highscore from localstorage
if (localStorage.getItem('highscore')){
    highScore = localStorage.getItem('highscore');
}
var bullet = false;
var bulletFired = false;
var bulletLoader = 0;
var bulletMoving = false;
var bulletObj;

var scoreBoard = document.getElementById("score");
var highScoreBoard = document.getElementById("high-score");
var startScreen = document.getElementById("start-screen");
var gameOverScreen = document.getElementById("game-over-screen");
var gameOverText = document.getElementById("game-over-text");
var fireBulletText = document.getElementById("fire-bullet-text");
var loading = document.getElementById("loading");

var vehicles;
var gameOver = false;
var startGame = false;
createVehicles();

// function to create vehicle instances
function createVehicles() {
    vehicles = [];
    for (var i=0; i<2; i++){
        vehicles[i] = new Vehicle();
        vehicles[i].vehicleInstance(i, vehicles, allAssets, canvas, playerObj.speed)
    }
}

// draws the canvas
function drawCanvas(){
    scoreCalc();

    // clear canvas every time for redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    drawAndMoveRoad();
    playerObj.drawPlayerCar(ctx, allAssets[0]);

    bulletLogic();

    menuLogic();

    requestAnimationFrame(drawCanvas)
}

// function to display start and gameover menus
function menuLogic(){
    if (!gameOver && startGame){
        if(playerObj.collision(vehicles)){
            gameOver = true;
            createVehicles();

            if (totalScore>localStorage.getItem('highscore')) {
                console.log('highscore')
                localStorage.setItem('highscore', totalScore);
            }

            totalScore = 0;
            bullet = false;
            bulletFired = false;
            bulletMoving = false;
            bulletLoader = 0;
        }

        for (var i=0; i<2; i++){
            vehicles[i].drawVehicle(ctx, i, vehicles, playerObj.speed);
        }
    }

    if (!startGame) {
        startScreen.style.display = "block";
    }

    if(gameOver) {
        fireBulletText.style.display = "none";
        gameOverScreen.style.display = "block";
        gameOverText.innerText = "Your highscore is " + highScore +". Come on! You can beat it. Play again!";
    }
}

// function for the bullet logic
function bulletLogic(){
    if(bulletLoader === 5){
        bullet = true;
        bulletLoader = 0;
        fireBulletText.style.display = "block";
        fireBulletText.innerText = "Press space bar to fire!";
    }

    if(bulletFired){
        bulletObj = new Bullet();
        bulletObj.bulletInit(canvas, playerObj.positionX);
        bulletFired = false;
        bulletMoving = true;
    }

    if(bulletMoving){
        if(bulletObj.positionY >= -bulletObj.sizeY){
            bulletObj.drawBullet(ctx, allAssets[7]);
            (bulletObj.collision(vehicles)) ? bulletMoving = false : 1;
        } else {
            bulletMoving = false;
        }
    }
}

// calculate score and display
function scoreCalc(){
    for (var i=0; i<2; i++){
        if(vehicles[i].positionY>canvas.height + vehicles[i].sizeY){
            totalScore++;
            if(!bullet) {
                bulletLoader++;
            }
        }
    }

    if (totalScore>highScore) highScore = totalScore;

    scoreBoard.innerText = "SCORE: " + totalScore;
    highScoreBoard.innerText = "HIGH SCORE: " + highScore;
}

// function to animate a moving road
function drawAndMoveRoad(){
    road1PositionY += playerObj.speed;
    road2PositionY += playerObj.speed;

    if (road1PositionY > canvas.height){
        road1PositionY = -canvas.height;
        road2PositionY = 0;
    }

    if (road2PositionY > canvas.height){
        road2PositionY = -canvas.height;
        road1PositionY = 0;
    }

    ctx.drawImage(allAssets[1], canvas.width/2-(canvas.width/6), road1PositionY, canvas.width/3, canvas.height);
    ctx.drawImage(allAssets[1], canvas.width/2-(canvas.width/6), road2PositionY, canvas.width/3, canvas.height);
}
window.onload = function(){
    requestAnimationFrame(drawCanvas)
    loading.style.display = "none";
}

// get keydown for user input computation
window.addEventListener('keydown', function(event) {
    const key = event.key;

    scoreBoard.style.display = "block";
    highScoreBoard.style.display = "block";

    if(!startGame) {
        startGame = true;
        startScreen.style.display = "none";
    }

    if (startGame && !gameOver){
        switch(key){
            case "ArrowRight":
                playerObj.switchLane("right");
                break;
            case "ArrowLeft":
                playerObj.switchLane("left");
                break;
            case " ":
                if(bullet){
                    bullet = false;
                    bulletFired = true;
                    fireBulletText.style.display = "none";
                    break;
                }
        }
    }

    if(gameOver && key == "Enter"){
        gameOver = false;
        gameOverScreen.style.display = "none";
        playerObj.speed = 12;
    }
});
