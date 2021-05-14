var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var background = document.getElementById("background");
var ground = document.getElementById("ground");

var groundPosX = [];

var restart = document.getElementById("restart");
var scoreBoard = document.getElementById("score-board");


var playerObj = new Bird(2);
var pipes = [];

var score = 0;
var highScore = localStorage.getItem('highscore') || 0;

for (var i = 0; i < 2; i++) {
    var size1 = Math.floor(Math.random() * (canvas.height / 2.5)) + 50;
    var gap = Math.floor(Math.random() * 100) + 250;
    var size2 = Math.abs(640 - size1 - gap);
    var index1 = 2 * i;
    var index2 = 2 * i + 1;
    pipes[index1] = new Pipe(index1, size1);
    pipes[index2] = new Pipe(index2, size2);
}

var mouseClickPos = [];

// draws canvas and maintains the game loop
function drawCanvas() {
    if (!playerObj.gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height - 100);
        drawAnimatingGround();
        if (!playerObj.hoverState) {
            drawPipes();
            playerObj.collisionDetection();
            scoreUpdate();
            ctx.font = "50px Flappy";
            ctx.fillStyle = "white";
            ctx.fillText(score, canvas.width / 2, 160);
        }
        playerObj.drawBird();
    } else {
        (score === highScore) ? localStorage.setItem('highscore', highScore) : 1;
        gameOverMenu();
    }
    mouseClickPos = [];
    requestAnimationFrame(drawCanvas);
}

//update the score
function scoreUpdate() {
    for (var i = 0; i < 4; i++) {
        if (playerObj.positionX > pipes[i].positionX && !pipes[i].scored) {
            score = score + 0.5; //since there are two pipe objects
            pipes[i].scored = true;
        }
    }
    (score > highScore) ? highScore = score : 1;
}

//draw the pipes
function drawPipes() {
    for (var i = 0; i < 2; i++) {
        var index1 = 2 * i;
        var index2 = 2 * i + 1;
        pipes[index1].drawPipe()
        pipes[index2].drawPipe()
    }
}

//game over menu
function gameOverMenu() {
    var x = canvas.width / 2 - 100;
    var y = canvas.height / 2 - 200;

    ctx.drawImage(scoreBoard, x, y, 200, 200);
    ctx.font = "30px Flappy";
    ctx.fillStyle = "white";
    ctx.fillText(score, canvas.width / 2 - 10, 210);
    ctx.fillText(highScore, canvas.width / 2 - 15, 285);
    ctx.drawImage(restart, x, y + 220, 200, 50);


    if (mouseClickPos[0] >= x && mouseClickPos[0] <= x + 200 && mouseClickPos[1] >= y + 220 && mouseClickPos[1] <= y + 270) {
        playerObj.resetPlayer();
        this.score = 0;
        for (var i = 0; i < 4; i++) {
            pipes[i].scored = false;
            if (i % 2 === 0) {
                pipes[i].positionX = canvas.width + 150 * i;
                pipes[i].sizeY = Math.floor(Math.random() * (canvas.height / 2.5)) + 50;
                var gap = Math.floor(Math.random() * 100) + 250;
                pipes[i + 1].sizeY = Math.abs(640 - pipes[i].sizeY - gap);
            } else {
                pipes[i].positionX = canvas.width + 150 * (i - 1);
            }
        }
    }

}

//animating ground
function drawAnimatingGround() {
    for (var i = 0; i < canvas.width / 30 + 1; i++) {
        (!groundPosX[i] && groundPosX[i] !== 0) ? groundPosX[i] = (i * 30) : groundPosX[i] -= playerObj.speed;
        if (groundPosX[i] < -30) {
            groundPosX[i] = groundPosX[i] + canvas.width + 30;
        }
        ctx.drawImage(ground, groundPosX[i], canvas.height - 100, 30, 100);
    }
}

requestAnimationFrame(drawCanvas);

// click listener for user input
canvas.addEventListener('click', function (e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    mouseClickPos = [x, y];

    if (!playerObj.gameOver) {
        playerObj.hoverState = false;
        playerObj.birdMovement();
    }
})