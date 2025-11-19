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

    const drawToken = (player, row, col) => {
        if(board[row][col]) return;

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