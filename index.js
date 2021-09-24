let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('src/food.mp3');
const moveSound = new Audio('src/move.mp3');
const musicSound = new Audio('src/music.mp3');
const gameOverSound = new Audio('src/gameover.mp3');
// let cvs = document.getElementById("board");
// let ctx = cvs.getContext("2d");
// let foodImg = new Image();
// foodImg.src = "food.jpg"
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
        { x: 15, y: 15 }
    ]
    // food = { x: 6, y: 7 };
let a = 2;
let b = 16;
food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

let score = 0;
let highScore = localStorage.getItem("highScore");

if (highScore === null) {
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
    highScoreVal = JSON.parse(highScore)
    HighscoreBox.innerHTML = "Highscore :" + highScoreVal;
}
// console.log("helooooo")

function game(ctime) {
    window.requestAnimationFrame(game);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sa) {
    for (let index = 1; index < snakeArr.length; index++) {
        if (sa[index].x === sa[0].x && sa[index].y === sa[0].y) {
            return true;
        }
    }
    if (sa[0].x >= 18 || sa[0].x <= 0 || sa[0].y >= 18 || sa[0].y <= 0) {
        return true;
    }

    return false;


}

function gameEngine() {
    musicSound.play();

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {
            x: 0,
            y: 0
        }
        alert("GAME OVER 🤑 .Press any key to play again !! ");
        snakeArr = [
            { x: 15, y: 15 }
        ]
        musicSound.play();
        score = 0;
    }

    //  snake eat the food then
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            HighscoreBox.innerHTML = "Highscore :" + highScoreVal;

        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // snake movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = {...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add("head");

        if (index === 0) {
            faceElement = document.createElement("img");
            faceElement.src = "src/snakeFACE.png";
            faceElement.style.gridRowStart = e.y;
            faceElement.style.gridColumnStart = e.x;
            faceElement.classList.add("head");
            board.appendChild(faceElement);
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

    })
    foodElement = document.createElement("img");
    foodElement.src = "src/food.jpg";
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
    // ctx.drawImage(foodImg, 0, 0, 1, 1, food.y, food.x, 1, 1);

}

musicSound.play();
window.requestAnimationFrame(game);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;

            break;
        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;

            break;
        case "ArrowLeft":
            console.log("arrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;

            break;
        case "ArrowRight":
            console.log("arrowRight");
            inputDir.x = 1;
            inputDir.y = 0;

            break;
        default:
            break;



    }

});
