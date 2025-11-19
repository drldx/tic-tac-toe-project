function GameBoard(){
  const board = [];
  //2d array
  for(let i = 0; i < 3; i++){
    board[i] = [];
    for(let j = 0; j < 3; j++){
        board[i].push(Cell());
    }
  }

  const getBoard = ()=> board;

  const drawToken = (row, col, player) => {
    console.log(board[row][col], player);
    if(board[row][col].getValue() !== ''){
      console.log("returning");
      return;
    } 

    board[row][col].addToken(player);
  }

  const printBoard = ()=> {
    const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
    console.log(boardWithCellValues);
  }
  return {getBoard,
          drawToken,
          printBoard};
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
    console.log(`${getActivePlayer().name}'s turn!`);
  }

  const playRound = (row, col) => {
    console.log(`Marking ${getActivePlayer().name}'s token!`);

    board.drawToken(row, col, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  }

  return {
    playRound,
    getActivePlayer
  }
}

const game = GameController();
game.playRound(0, 0);