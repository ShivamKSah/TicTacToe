// Variables
let currentPlayer;
let grid;

let playerTextClass = document.querySelector(".currentPlayer");
let newGameButton = document.querySelector(".btn");
let boxes = document.querySelectorAll(".gridItems");

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Game Initialization
function gameInitialisation(){
    currentPlayer = "X";
    grid = ["","","","","","","","",""]; 
    playerTextClass.innerHTML = `Current Player - ${currentPlayer}`;
    newGameButton.classList.remove('active');
    for(let eachBox of boxes){
        eachBox.innerHTML = "";
        eachBox.classList.remove('win');
        eachBox.setAttribute("style","pointer-events:all");
    }
}

gameInitialisation();

function afterWinning(){
    playerTextClass.innerHTML = `Player - ${currentPlayer} won`;
    for(let box of boxes){
        box.setAttribute("style","pointer-events:none");
    }
    newGameButton.classList.add('active');
}

function handleDraw(){
    playerTextClass.innerHTML = `It's a Tie!`;
    newGameButton.classList.add('active');
}

// Check if someone has won
function isWon(){
    for(let index of winningPositions){
        if((grid[index[0]] == "X" && grid[index[1]] == "X" && grid[index[2]] == "X") || 
           (grid[index[0]] == "O" && grid[index[1]] == "O" && grid[index[2]] == "O")){
            boxes[index[0]].classList.add('win');
            boxes[index[1]].classList.add('win');
            boxes[index[2]].classList.add('win');
            return true;
        }
    }
    return false;
}

// Check if the game is a draw
function isDraw(){
    return grid.every(cell => cell !== "");
}

// Swap turns
function swapTurns(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
}

// Handle clicks
function handleClick(index){
    if(grid[index] === ""){
        grid[index] = currentPlayer;
        boxes[index].innerHTML = currentPlayer;
        if(isWon()){
            afterWinning();
        } else if (isDraw()) {
            handleDraw();
        } else {
            swapTurns();
            playerTextClass.innerHTML = `Current Player - ${currentPlayer}`;
        }
    }
}

// New Game Button Event Listener
newGameButton.addEventListener('click', () => {
    gameInitialisation();
});

// Add click event listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});
