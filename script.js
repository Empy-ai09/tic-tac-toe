const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = [];

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diags
];

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleMove(index) {
  if (!gameActive || cells[index].textContent !== '') return;

  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusDiv.textContent = `Pemain ${currentPlayer} MENANG!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    statusDiv.textContent = 'Seri!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Giliran: Pemain ${currentPlayer}`;
}

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      return true;
    }
    return false;
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `Giliran: Pemain ${currentPlayer}`;
  createBoard();
}

createBoard();
