/*-----------------------------------------------------------------------------
 * Variables
 *----------------------------------------------------------------------------- 
 */

var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenHeight;
var screenWidth;
/*-----------------------------------------------------------------------------
 * Game Code
 *-----------------------------------------------------------------------------
 */
gameInitialize();
snakeInitialize();
foodInitialize();
snakeUpdate();
setInterval(gameLoop, 1000/15);
/*-----------------------------------------------------------------------------
 * Snake Functions
 *-----------------------------------------------------------------------------
 */
function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", snakeMovement)
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(63, 227, 34)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "right";
    
    for(var index = snakeLength - 1; index >= 0; index--) {
        snake.push( {
            x: index,
            y: 0
        }) ;
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize) ;
    }
}

function snakeUpdate(snakeHeadX, snakeHeadY) {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if(snakeDirection == "right") {
        snakeHeadX++;
    }
    else if(snakeDirection == "down") {
        snakeHeadY++;
    }
    else if(snakeDirection == "up") {
        snakeHeadY--;
    }
    else if(snakeDirection == "left") {
        snakeHeadX--;
    }
    
    checkFoodCollision(snakeHeadX, snakeHeadY);
    checkWallCollision(snakeHeadX, snakeHeadY);
    
    var snakeTail = snake.pop() ;
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

function snakeMovement(event) {
    if (event.keyCode == '38'){
        //up
        snakeDirection = "up";
    }
    else if (event.keyCode == '40') {
        //down
        snakeDirection = "down";
    }
    else if (event.keyCode == '39') {
        //right
        snakeDirection = "right";
    }
    else if (event.keyCode == '37') {
        //left
        snakeDirection = "left";
    }
}
/*-----------------------------------------------------------------------------
 * Food Functions
 *-----------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

    function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
        
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
/*------------------------------------------------------------------------------
 * Input Functions
 * -----------------------------------------------------------------------------
 */

function keyboardHandler(event) {
    console.log(event);
    //Prevents the snake from going back on itself
    if(event.keyCode == 39 && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if(event.keyCode == 40 && snakeDirection != "up") {
        snakeDirection = "down";
    }
    else if(event.keyCode == 37 && snakeDirection !=" right") {
        snakeDirection = "left";
    }
    else if(event.keyCode == 38 && snakeDirection != "down") {
        snakeDirection = "up";
    }
}

/*------------------------------------------------------------------------------
 * Collision Handler
 *------------------------------------------------------------------------------
 */

function checkFoodCollision(snakeHeadX,snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
    }
}
function checkWallCollision(snakeHeadX, snakeHeadY){
    if(snakeHeadX * snakeSize >= screenWidth) {
        console.log("Wall Collision");
    }
}