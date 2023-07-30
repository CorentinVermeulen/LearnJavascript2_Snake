// SNAKE GAME //


var cols = 20;
var rows = 20;
var boxSize = 25;

var head = [10,10];
var body= [];
var direction = [0,0];
var speed = 1;
var food= placeFood();

var score;
var gameOver = false;


window.onload = function(){
    initialize();

    board = document.getElementById("board");
    board.height = rows * boxSize;
    board.width = cols * boxSize;
    context = board.getContext("2d");

    document.addEventListener("keyup", changeDir )

    loop = setInterval(update, 1000 / 10);

}

function initialize(){
    setScore(0);

    if(food[0] === head[0] && food[1] === head[1]){
        food = placeFood();
    }
}

function placeFood(){
    let xFood = Math.floor(Math.random()* cols)  ;
    let yFood = Math.floor(Math.random()* rows)  ;
    return [xFood, yFood];
}

function changeDir(key){
    if( key.code === "ArrowUp" && direction[1] !== 1 ){
        direction = [0,-1];
    }
    if( key.code === "ArrowDown" && direction[1] !== -1){
        direction = [0,1];
    }
    if( key.code === "ArrowLeft" && direction[0] !== 1){
        direction = [-1,0];
    }
    if( key.code === "ArrowRight" && direction[0] !== -1){
        direction = [1,0];
    }
}

function setScore(int){
    score = int;
    document.getElementById("score").innerHTML = `Score: ${score}`;
}
function eaten(){
    setScore(score+1);
    body[body.length] = [food[0], food[1]];
    food = placeFood();

    console.log(body);
}

function endGame(){
    direction = [0,0];
    gameOver = true;
    document.getElementById("score").innerHTML = `GAME OVER! Score: ${score}`;

}

function update(){
    updateSnake();
    if(gameOver){
        clearInterval(loop);
        drawMap("grey");
        drawSnake("red");
        drawFood();
        return;
    }
    else{
        drawMap();
        drawSnake();
        drawFood();
    }

}

function updateSnake(){
    //check for food eaten
    if (head[0] === food[0] && head[1] === food[1] ) {
        eaten();
    }

    // update body
    for(let i =body.length-1; i> 0; i--){
        body[i] = body[i-1];
    }
    if(body.length){
        body[0] = [head[0], head[1]];
    }


    // update head //
    head[0] += direction[0] * speed;
    head[1] += direction[1] * speed;

    // game over conditions
    if(head[0] < 0 || head[1] < 0 || head[0] > cols-1 || head[1] > rows-1){
        endGame();
    }

    for(let i =0; i < body.length; i++){
        if (body[i][0] === head[0] && body[i][1] === head[1]){
            endGame();
        }
    }

}


function drawMap(col="deeppink"){
    // Draw background
    context.fillStyle = col;
    context.fillRect(0,0,board.width, board.height);



    // Draw lines between boxes
    /*
      context.strokeStyle = "black";

      for(let r = 0; r < rows; r++){
          context.lineWidth = 0.5;
          context.moveTo(0,r*boxSize);
          context.lineTo(board.width, r*boxSize);
          context.stroke();
      }
      for(let c = 0; c < cols; c++){
          context.lineWidth = 0.5;
          context.moveTo(c*boxSize, 0);
          context.lineTo(c*boxSize, board.height );
          context.stroke();

      }

    */
}

function drawSnake(col = "Beige"){
    // Draw head
    context.fillStyle = col;
    context.fillRect(head[0] * boxSize, head[1] * boxSize, boxSize, boxSize);
    // Draw snake Body
    context.fillStyle = col;
    for(let bp=0; bp < body.length; bp++){
        context.fillRect(body[bp][0] * boxSize, body[bp][1] * boxSize, boxSize, boxSize);
    }

}

function drawFood(){
    context.fillStyle = "lime"
    context.fillRect(food[0] * boxSize, food[1] * boxSize, boxSize, boxSize);
}



