const board = [
               ["x", "o", "x"],
               ["o", "o", "o"],
               ["o", "x", "o"]
              ];


let flag = false;
for(let i = 0; i < 3; i++){
  let j = 0;
  if((board[i][j]=== board[i][j+1] && board[i][j]===board[i][j+2]) || 
    (board[j][i] === board[j+1][i] && board[j][i] ===board[j+2][i])) {

    flag = true;
    console.log(board[i][j], board[i][j+1], board[i][j+2]);
    console.log(board[j][i], board[j+1][i], board[j+2][i]);
    console.log("match found");
   
  }
 
  else{
    console.log("no match found")
  }
}

let j = 0;
if((board[j][j] === board[j+1][j+1] && board[j][j] === board[j+2][j+2]) || 
   (board[j][j+2] === board[j+1][j+1] && board[j][j+2] === board[j+2][j])) {
    console.log(board[j][j], board[j+1][j+1], board[j+2][j+2]);
    console.log(board[j][j+2], board[j+1][j+1], board[j+2][j]);
    console.log('match found')
}
