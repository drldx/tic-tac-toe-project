function GameBoard(){
  const board = [];
  //2d array
  for(let i = 0; i < 3; i++){
    board[i] = [];
    for(let j = 0; j < 3; j++){
        board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const drawToken = (row, col, player) => {
    if(board[row][col].getValue() !== ''){
      console.log("returning");
      return 1;
    }else{
      board[row][col].addToken(player);
    } 
  }

  const printBoard = ()=> {
    const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
    console.log(boardWithCellValues);
  }
  return {
          getBoard,
          drawToken,
          printBoard
        };
}

function Cell(){
  let value = "";
  const addToken = (player) => {
    value = player;
  }
  const getValue = () => value; 
      
  return {getValue, addToken};
}

function GameController(playerOneName = "Player one", playerTwoName = "Player Two"){
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: "O"
    },
    {
      name: playerTwoName,
      token: "X"
    }
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer; 

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  };

  const printNewRound = () => {
    board.printBoard();
  }

  const playRound = (row, col) => {

    const res = board.drawToken(row, col, getActivePlayer().token);
    if(res === 1){
      console.log("already taken, play again");
      return;
    }else{
      //check winner
      switchPlayerTurn();
      printNewRound();
    }
  }
  

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard
  }
}

function displayController(){
  const game = GameController();

  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = ()=>{
    boardDiv.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn!`;

    board.forEach((row, index) => {
      const rowIndex = index;
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = index;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    });
  }

  function clickHandler(e){
    const rowIndex = e.target.dataset.row;
    const colIndex = e.target.dataset.column;

    if(!rowIndex || !colIndex) return;

    game.playRound(rowIndex, colIndex);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

displayController();