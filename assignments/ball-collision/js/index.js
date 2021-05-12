// Create ball class
function Ball(){

    // Function to instantiate a ball with properties
    this.ballInstantiate = function(balls, speed, radius, color) {
        this.radius = radius;
        this.color = color;
        this.balls = balls;
        this.speed = speed;
        this.xspeed = (Math.random() - 0.5) * speed * 2
        this.yspeed = (Math.random() - 0.5) * speed * 2
        this.position = getRandomPosition(this.balls, this.radius);
    }.bind(this);

    // Get a random position for a new ball. Function keep searching for a poisition till the new
    // ball doesn't overlap with any old ones.
    var getRandomPosition = function(balls, radius){
        var positionX = Math.floor(Math.random() * (window.innerWidth-(2*radius))) + radius;
        var positionY = Math.floor(Math.random() * (window.innerHeight-(2*radius))) + radius;
        var balls = balls;
        var radius = radius;
        if (balls.length>1) {
            for (let i = 0; i<balls.length-1; i++){
                var dx = positionX - balls[i].position[0];
                var dy = positionY - balls[i].position[1];
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= balls[i].radius + radius) {
                    let pos = getRandomPosition(balls, radius);
                    return pos
                }
            }
        }
        return [positionX, positionY]
    }.bind(this);

}

// Create canvas and declare as well as define variables
var canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.appendChild(canvas);
document.body.style.overflow = 'hidden';

var ctx = canvas.getContext('2d');
var totalBalls = 1000;
var balls = [];
var colors = ["#2b2b2b", "#ff0000", "#27408b", "#ff00ff", "#8b4513", "#9b9b9b"];
var radius_max = 5; // radius max will actually be RADIUS_MAX + RADIUS_MIN
var radius_min = 2;
var speed_max = 1;  // speed max will actually be RADIUS_MAX + RADIUS_MIN
var speed_min = 1;

// Function that loops the ball movement and drawing on the canvas so that
// the balls get animated
function animationFrames() {
    ballMovement();
    drawCanvas();
    requestAnimationFrame(animationFrames);
}

// Clear the canvas and draw balls with current position
function drawCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i<balls.length; i++){
        ctx.beginPath();
        ctx.arc(balls[i].position[0], balls[i].position[1], balls[i].radius, 0, 2 * Math.PI);
        ctx.fillStyle = balls[i].color;
        ctx.fill();
    }
}

// Move the ball
function ballMovement(){
    for(var i=0; i<balls.length; i++){
        balls[i].position[0] += balls[i].xspeed
        balls[i].position[1] -= balls[i].yspeed
        ballWallCollide(balls[i]);
        collisionDetectionWithBalls(i);
    }
}

// Check if ball hits the walls and behave accordingly
function ballWallCollide(ball){
    if (ball.position[0] <= ball.radius || ball.position[0] >= canvas.width - ball.radius) {
        ball.xspeed *= -1;
        ball.position[0] = ball.position[0] <= ball.radius ? ball.radius : canvas.width - ball.radius;
    }
    if (ball.position[1] <= ball.radius || ball.position[1] >= canvas.height - ball.radius) {
        ball.yspeed *= -1;
        ball.position[1] = ball.position[1] <= ball.radius ? ball.radius : canvas.height - ball.radius;
    }
}

// Ball collision logic
function collisionDetectionWithBalls(index){
    for(var i = 0; i<balls.length; i++){
        if (index != i){
            var dx = balls[i].position[0] - balls[index].position[0];
            var dy = balls[i].position[1] - balls[index].position[1];
            var distance = Math.sqrt(dx * dx + dy * dy);

            // If statement for collision confirmation using distance formula
            if (distance < (balls[index].radius + balls[i].radius)) {
                const xVelocityDiff = balls[index].xspeed - balls[i].xspeed;
                const yVelocityDiff = balls[index].yspeed - balls[i].yspeed;
                const xDist = balls[i].position[0] - balls[index].position[0];
                const yDist = balls[i].position[1] - balls[index].position[1];
                // Prevent overlaps
                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

                    var angle = Math.atan2(dy, dx);
                    var sin = Math.sin(angle);
                    var cos = Math.cos(angle);
    
                    var vx1 = (balls[index].xspeed * cos + balls[index].yspeed * sin);
                    var vy1 = (balls[index].yspeed * cos - balls[index].xspeed * sin);
                    
                    var vx2 = (balls[i].xspeed * cos + balls[i].yspeed * sin);
                    var vy2 = (balls[i].yspeed * cos - balls[i].xspeed * sin);
                    
                    // new xspeed and yspeed assigned after collision computation
                    balls[index].xspeed = vx2 * cos - vy1 * sin;
                    balls[index].yspeed = vy1 * cos + vx2 * sin;
                    balls[i].xspeed = vx1 * cos - vy2 * sin;
                    balls[i].yspeed = vy2 * cos + vx1 * sin;
                }
            }
        }
    }
}

// Create instances of ball
for (var i = 0; i<totalBalls; i++) {
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    var randomSize = Math.floor(Math.random() * radius_max) + radius_min;
    var speed = Math.floor(Math.random() * speed_max) + speed_min; 
    balls[i] = new Ball();
    balls[i].ballInstantiate(balls, speed, randomSize, colors[randomColorIndex]);
}

requestAnimationFrame(animationFrames);


