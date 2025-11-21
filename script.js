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

function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){
  const board = GameBoard();
  let round = 0;

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

  const setPlayers = (one, two) => {
    players[0].name = one;
    players[1].name = two;
  }

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  };

  const printNewRound = () => {
    board.printBoard();
  }

  const checkGameStatus = () => {
    const boardStatus = board.getBoard().map(row => row.map(cell => cell.getValue()));
    const j = 0;

    for(let i = 0; i < 3; i++){
      if((boardStatus[i][j] === ("X") && boardStatus[i][j+1] === ("X") && boardStatus[i][j+2] === ("X")) || 
        (boardStatus[i][j] === ("O") && boardStatus[i][j+1] === ("O") && boardStatus[i][j+2] === ("O")) ||

        (boardStatus[j][i] === ("X") && boardStatus[j+1][i] === ("X") && boardStatus[j+2][i] === ("X")) ||
        (boardStatus[j][i] === ("O") && boardStatus[j+1][i] === ("O") && boardStatus[j+2][i] === ("O")) ){

        console.log("match found");
        return 1;
      }
      else{
        console.log("no match found")
      }
    }

    if((boardStatus[j][j] === ("X") && boardStatus[j+1][j+1] === ("X") && boardStatus[j+2][j+2] === ("X") || 
       (boardStatus[j][j] === ("O") && boardStatus[j+1][j+1] === ("O") && boardStatus[j+2][j+2] === ("O") ||

       boardStatus[j][j+2] === ("X") && boardStatus[j+1][j+1] === ("X") && boardStatus[j+2][j] === ("X")) ||
       boardStatus[j][j+2] === ("O") && boardStatus[j+1][j+1] === ("O") && boardStatus[j+2][j] === ("O")) ){

      console.log('match found '+ getActivePlayer().name);
      return 1;
    }
  }

  const playRound = (row, col) => {

    const res = board.drawToken(row, col, getActivePlayer().token);
    if(res === 1){
      console.log("already taken, play again");
      return;
    }else{
      //check winner
      ++round;

      let res = checkGameStatus();
      if(res === 1){
        console.log('game over');
        return 1;
      }else if(round === 9 && res === undefined){
        console.log("its a tie");
        return 2;
      }else{
        console.log(round);
        switchPlayerTurn();
        printNewRound();
      } 
    }
  }

  const setRound = (count) => round = count;
  
  return {
    playRound,
    getActivePlayer,
    setPlayers,
    getBoard: board.getBoard,
    setRound 
  }
}

function displayController(){
  const game = GameController();

  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const container = document.querySelector(".container");
  const dialog = document.querySelector(".dialog");

  const dialogButtons = document.querySelector(".dialogButtons");
  const playerOne = document.querySelector("#player-one");
  const playerTwo = document.querySelector("#player-two");

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


    const stateControl = () =>  {
      boardDiv.classList.remove("game");
      playerTurnDiv.classList.remove("game");
      console.log("clicked");
      game.setRound(0);
      game.getBoard().map(row => row.map(cell => cell.addToken("")));
      updateScreen();
    }

    const setUsers = ()=> {
      game.setPlayers(playerOne.value, playerTwo.value);
    }

    if(e.target.classList.contains("startBtn")){
      //boardDiv.textContent = '';
      dialog.showModal();
      dialogButtons.addEventListener("click", (e)=> {
        if(e.target.classList.contains("submit")){
          if(!playerOne.value || !playerTwo.value){
            stateControl();
            dialog.close();
          }else{
            setUsers();
            stateControl();
            dialog.close();
          } 
        }
        if(e.target.classList.contains("close")){
          dialog.close();
        }
      })
    }

    if(e.target.classList.contains("restartBtn")){
      stateControl();
    }

    const rowIndex = e.target.dataset.row;
    const colIndex = e.target.dataset.column;

    if(!rowIndex || !colIndex) return;

    let res = game.playRound(rowIndex, colIndex);
    if(res === 1){
      boardDiv.textContent = '';
      playerTurnDiv.textContent = `Game Over.. ${game.getActivePlayer().name} Wins! `;
      return;
    }else if(res === 2){
      boardDiv.textContent = '';
      playerTurnDiv.textContent = `Its a tie! `;
      return;
    }else{
      updateScreen();
    }
  }

  container.addEventListener("click", clickHandler);

  updateScreen();
}

displayController();
