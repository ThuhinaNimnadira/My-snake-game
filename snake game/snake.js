// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;
var score = 0;

var snakeBody = []; // Corrected snakeBoody to snakeBody
// food
var foodX;
var foodY;

var gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 1000 / 10); // 10 frames per second
}

function update() {
    if (gameOver) {
        return;
    }
     
    //Clear the board
    context.fillStyle = "black";
    context.fillRect(0,0,board.width, board.height);

     // Display the score on the canvas
    context.fillStyle = " white";
    context.font = "20px Arial"
    context.fillText("Score: "+ score,10,20);

    // Food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // If snake eats food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // Grow the snake
        score++;//  Increase the score
        placeFood(); // Place new food
    }

    // Move the snake's body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move the snake's head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Snake collision detection (with walls)
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over!");
    }

    // Snake collision detection (with itself)
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!");
        }
    }

    // Draw the snake
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Place the food randomly
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

