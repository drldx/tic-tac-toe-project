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
    } 

    board[row][col].addToken(player);
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
    console.log(`${getActivePlayer().name}'s turn!`);
  }

  const playRound = (row, col) => {

    if((row < 0 || row > 2) || (col < 0 || col > 2)){
      console.log("invalid indexes");
      return;
    }else{
      console.log(`Marking ${getActivePlayer().name}'s token!`);

      let res = board.drawToken(row, col, getActivePlayer().token);
      if(res === 1){
        console.log("already taken, play again");
      }else{
        switchPlayerTurn();
        printNewRound();
      }
    }
  }

  return {
    playRound,
    getActivePlayer,
  }
}

const game = GameController();