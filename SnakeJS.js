// Game Constants & Variable

let inputDir = {x: 0, y: 0}; // inputDir-input Direction
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('Chase.mp3');
let lastPaintTime = 0;
let speed = 2;
let score = 0;
let snakeRotation = 0;
let j = 0;
let a = 2, b = 16, x, y;
let execute = true;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 3, y: 5};
var key;

// Game Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < (1/speed))
    {
        return;
    }
    // console.log(currentTime);
    lastPaintTime = currentTime;
    // musicSound.play();
    gameEngine();

}


function isCollide(snakeArray)
{
    //if snake collide with himself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y ){
            return true;
        }   
    }
    //if you collide with wall
    if((snakeArray[0].x >=18 || snakeArray[0].x <= 0 || snakeArray[0].y >=18 || snakeArray[0].y <= 0))
    {
        return true;
    }
    return false;
}

function gameEngine()
{

    //Part 1 Updating the snake variable and food
    //Part 2 Display the Snake and food
    
    //Part 1: Updating The Snake Array and Other things
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. \nYour Score is  :  "+ score * 10+"\nPress any key to Play again! ");
        snakeArr = [{x: 13, y: 15}]; // to reset and play again we are resetting an array
        score = 0;
        speed = 2;
        scoreBox.innerHTML="Score :  00";
        document.getElementById('board').style.background = 'linear-gradient(to left,rgb(112, 219, 104), rgb(0, 255, 238))';
    }

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        // score +=1;
        if(score*10 <= 100)
        {
            speed = 2;
            score += 2;
        }
        else if(score*10 <= 500)
        {
            speed = 5;
            score += 4;
            document.getElementById('board').style.background = 'linear-gradient(rgb(234, 120, 120), white)';
            // document.getElementById('food').style.background = ''
        }
        else if( score*10 <= 1000)
        {
            speed = 8;
            document.getElementById('board').style.background = 'linear-gradient(to left,rgb(104, 219, 156), rgb(225, 225, 161))';
            score += 7.5;
        }
        else if( score*10 <= 2000)
        {
            document.getElementById('board').style.background = 'linear-gradient(rgb(234, 120, 120), white)';
            
            speed = 12;
            score += 10;
        }
        else if(score*10 < 5000)
        {
            document.getElementById('board').style.background = 'linear-gradient(to left,rgb(104, 219, 156), rgb(225, 225, 161))';
            
            speed = 14;
            score += 20;
        }
        else if( score*10 < 10000)
        {
            document.getElementById('board').style.background = 'linear-gradient(rgb(234, 120, 120), white)';
            
            speed = 17;
            score += 50;
        }
        else 
        {
            document.getElementById('board').style.background = 'linear-gradient(to left,rgb(104, 219, 156), rgb(225, 225, 161))';
            
            speed = 20;
            score += 50;
        }


        scoreBox.innerHTML="Score :  " + score*10;
        if(score > highScorevalue)
        {
            highScorevalue = score;
            localStorage.setItem("highScore", JSON.stringify(highScorevalue));
            highScoreBox.innerHTML = "High Score :  " + highScorevalue*10 ;
        }
        snakeArr.unshift({x: (snakeArr[0].x + inputDir.x),  y: (snakeArr[0].y + inputDir.y)});// shifting each element ahead
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())} // Making new food after eating old food
    }

    //Speed Variation

    // Moving the Snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};// same as snakeArr[i+1] = snakeArr[i]; the only diff is that it create a shallow copy of arr[i+1] at arr[i] not referencing it if we did like this snakeArr[i+1] = snakeArr[i]; then it referencing to the snakearr[i+1] so changes made in arr[i+1] then it also affects arr[i];    
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    //Part 2 :

    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((element, index)=>{
        snakeElement = document.createElement('div'); //creating div tag in html using javascript

        snakeElement.style.gridRowStart = element.y; // yth Row position
        snakeElement.style.gridColumnStart = element.x;// xth column position
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');// Class as snakebody
        }
        board.appendChild(snakeElement);
    })


    //Display the food

    foodElement = document.createElement('div'); //creating div tag in html using javascript
    foodElement.classList.add('food');// Class as food
    foodElement.style.gridRowStart = food.y; // yth Row position
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
}


// Main logic Starts here


let highScore = localStorage.getItem("highScore");
if(highScore===null)// agar highscore present nai hain to usko set kardo 0
{
    highScorevalue = 0;
    localStorage.setItem('highScore', JSON.stringify(highScorevalue)); // now highScore is a localstorage variable apply set or get to access it
}
else{
    highScorevalue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score : "+ highScore *10;
}



window.requestAnimationFrame(main);
//e stands for event
window.addEventListener('keydown', (event) =>{
    if(event.key==="ArrowUp" || event.key==="ArrowDown" || event.key==="ArrowLeft" || event.key==="ArrowRight")
    {
        j = 0;
    }
    while(j<1)
    {
        if(event.key==="ArrowUp" || event.key==="ArrowDown" || event.key==="ArrowLeft" || event.key==="ArrowRight")
        {
            musicSound.play();
        }
        j++;
    }

    inputDir = {x: 0, y: 0};

    switch (event.key) {
        case "ArrowUp":
            snakeRotation = 0;
            console.log("Arrowup");
            p = 0;
            q = -1;
            break;
        case "ArrowDown":
            snakeRotation = 180;
            console.log("ArrowDown")
            p = 0;
            q = 1;
            break;
        case "ArrowRight":
            snakeRotation += 90;
           
            console.log("ArrowRight")
            p = 1;
            q = 0;
            break;
        case "ArrowLeft":
            snakeRotation -= 90;
           
            console.log("ArrowLeft")
            p = -1;
            q = 0;
            break;
        default:
            break;
    }
    inputDir.x = p;
    inputDir.y = q;
    
})


