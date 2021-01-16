
const canvas=document.getElementById('mycanvas');
const c=canvas.getContext('2d');
class SnakePart{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
}

// snake variables
let speed=7;
let tileCount=20;
let tileSize=canvas.width/tileCount-2;
let x=10;
let y=10;



let dx=0;
let dy=0;
const snakeParts=[];
let tailLength=2;
// Food variables
let x1=5;
let y1=5;


let score=0;
const gulpSound=new Audio("Gulp1.mp3");
const gameOverSound=new Audio("gameover.wav");
function drawGame(){
    changeSnakePosition();
    let result=isGameOver();
    if(result){
        return;
    }
   
    clearScreen();
 
    drawFoodCollision();
    drawFood();
    drawSnake();
    drawScore();
    if(score>2){
        speed=11;
    }
    if(score>5){
        speed=15;
    }
    

    

    setTimeout(drawGame,1000/speed);
}
function isGameOver(){
    let gameOver=false;
   
    // game start
    if(dx === 0 && dy ===0){
        return false;
    }
    // walls
    if(x<0){
        gameOver=true;
    }
    else if(x === tileCount){
        gameOver=true;
    }

    else if(y < 0){
        gameOver=true;
    }
    else if(y < 0){
        gameOver=true;
    }
    else if (y === tileCount){
        gameOver=true;
    }
    

// snake crash your own body
for(let i=0;i < snakeParts.length; i++){
    let part=snakeParts[i];
    if(part.a === x && part.b === y){
        gameOver=true;
        break;
        
    }
    
}

    if(gameOver){
        // c.fillStyle="white";
        c.font="50px Verdana";
        var gradient=c.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.3","blue");
        gradient.addColorStop("0.5","red");
        gradient.addColorStop("0.7","green");
        gradient.addColorStop("1","brown");
        c.fillStyle=gradient;
        c.fillText("Game Over!",canvas.width/6.5,canvas.height/2)
        gameOverSound.play();
    }
    
return gameOver;


}



function drawScore(){
    c.fillStyle='white';
    c.font="15px Verdana";
    c.fillText(" Score : " +score, canvas.width-70,20);
    
}


function clearScreen(){
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height);
}
function drawSnake(){
    

     c.fillStyle='green';
     for(let i=0;i<snakeParts.length;i++){
         let part=snakeParts[i];
         c.fillRect(part.a*tileCount,part.b*tileCount,tileSize,tileSize);
     }
     snakeParts.push(new SnakePart(x,y));
     if(snakeParts.length>tailLength){
         snakeParts.shift();
     }

     c.fillStyle="orange";
     c.fillRect(x*tileCount,y*tileCount,tileSize,tileSize);
}
function changeSnakePosition(){
    x=x+dx;
    y=y+dy;
}

function drawFood(){
    c.fillStyle='red';
    c.fillRect(x1*tileCount,y1*tileCount,tileSize,tileSize);
}
function drawFoodCollision(){
    if(x1 == x && y1 == y){
        x1=Math.floor(Math.random()*tileCount);
        y1=Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}
window.addEventListener('keydown' ,keyDown);
function keyDown(event){
    //up
if(event.keyCode ==38){
    if(dy==1)
    return;
    dy=-1;
    dx=0;
}
// down
if(event.keyCode ==40){
    if(dy==-1)
    return;
    dy=1;
    dx=0;
}
//left
if(event.keyCode ==37){
    if(dx==1)
    return;
    dy=0;
    dx=-1;
}
//right
if(event.keyCode ==39){
    if(dx==-1)
    return;
    dy=0;
    dx=1;
}

}

drawGame();