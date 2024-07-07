const boxes = document.querySelectorAll(".box");
//returns a NodeList
const gameStatus = document.querySelector(".game-status");
const newGameBtn = document.querySelector(".btn");
let currentPlayer="X";
gameStatus.innerText=`Current Player is ${currentPlayer}`
let count = 0;
let gameGrid;
//array of winning positions
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//traverse nodelist
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(currentPlayer=="X"){
            box.innerText="X";
            currentPlayer="O";
            gameStatus.innerText=`Current Player is ${currentPlayer}`
        }
        else{
            box.innerText="O";
            currentPlayer="X";
            gameStatus.innerText=`Current Player is ${currentPlayer}`
        }
        box.style.pointerEvents = "none";
        count++;
        let isWinner = checkWinner();
    
        if (count === 9 && !isWinner) {
          gameDraw();
        }
    })
})
const checkWinner = () => {
    for (let pattern of winningPositions) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            boxes[pattern[0]].classList.add("win");
            boxes[pattern[1]].classList.add("win");
            boxes[pattern[2]].classList.add("win");
          showWinner(pos1Val);
          return true;
        }
      }
    }
};
const disableBoxes = () => {
  boxes.forEach((box)=>{
    box.style.pointerEvents = "none";
  })
};
const gameDraw = () => {
    gameStatus.innerText = `Game was a Draw.`;
    newGameBtn.classList.add("active");
};
const showWinner=(winnerplayer)=>{
  gameStatus.innerText = `Winner is player ${winnerplayer}`;
  disableBoxes();
  newGameBtn.classList.add("active");
}
const newGame=()=>{
  currentPlayer="X";
  gameStatus.innerText = `Current player is ${currentPlayer}`;
  count=0;
  for (let box of boxes) {
    box.style.pointerEvents = "all";
    box.innerText = "";
    box.classList.remove("win");
  }
  newGameBtn.classList.remove("active");
}
newGameBtn.addEventListener("click",newGame)