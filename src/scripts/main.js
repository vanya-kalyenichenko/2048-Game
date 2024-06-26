'use strict';

const button = document.querySelector('button');
const messageStart = document.querySelector('.message_start');
const messageLose = document.querySelector('.message_lose');
const messageWin = document.querySelector('.message_win');
const scoreBoard = document.querySelector('.game_score');
const tableCells = document.querySelectorAll('td');
const tableSize = 4;
let score = 0;
let scoreBuffer = [];

const keyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};
let gameTable = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function checkIfFull() {
  for (let i = 0; i < tableSize; i++) {
    if (gameTable.includes(0)) {
      return false;
    }
  }
}

function random() {
  while (!checkIfFull()) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);

    if (gameTable[row][col] === 0) {
      gameTable[row][col] = (Math.random() >= 0.5) ? 4 : 2;
      break;
    }
  }
}

function connect(data) {
  const arr = [];
  let alpha = data.shift();

  if (!alpha) {
    return;
  }

  for (let i = 0; i < tableSize; i++) {
    const beta = data.shift();

    if (!beta) {
      if (alpha) {
        arr.push(alpha);
      }
      break;
    } else if (alpha === beta) {
      arr.push(alpha + beta);
      scoreBuffer.push(alpha + beta);
      alpha = null;
    } else if (alpha !== beta) {
      if (alpha) {
        arr.push(alpha);
      }
      alpha = beta;
    }
  }

  return arr.slice();
}

function makeMove(direction) {
  const gameDataNext = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  switch (direction) {
    case keyCode.up:
      for (let j = 0; j < tableSize; j++) {
        const arr = [];

        for (let i = 0; i < tableSize; i++) {
          arr.push(gameTable[i][j]);
        }

        const shifted = connect(arr.filter((val) => val > 0));

        if (shifted) {
          for (let i = 0; i < shifted.length; i++) {
            gameDataNext[i][j] = shifted[i];
          }
        }
      }
      break;

    case keyCode.down:
      for (let j = 0; j < tableSize; j++) {
        const arr = [];

        for (let i = 0; i < tableSize; i++) {
          arr.push(gameTable[tableSize - 1 - i][j]);
        }

        const shifted = connect(arr.filter((val) => val > 0));

        if (shifted) {
          for (let i = 0; i < shifted.length; i++) {
            gameDataNext[tableSize - 1 - i][j] = shifted[i];
          }
        }
      }
      break;

    case keyCode.left:
      for (let i = 0; i < tableSize; i++) {
        const shifted = connect(gameTable[i].filter((val) => val > 0));

        if (shifted) {
          for (let j = 0; j < shifted.length; j++) {
            gameDataNext[i][j] = shifted[j];
          }
        }
      }
      break;

    case keyCode.right:
      for (let i = 0; i < tableSize; i++) {
        const shifted = connect(gameTable[i].filter((val) =>
          val > 0).reverse());

        if (shifted) {
          for (let j = 0; j < shifted.length; j++) {
            gameDataNext[i][tableSize - 1 - j] = shifted[j];
          }
        }
      }
      break;

    default:
      break;
  }

  return gameDataNext;
}

function gameEnd() {
  if (`${gameTable}` !== `${makeMove(keyCode.up)}`
  || `${gameTable}` !== `${makeMove(keyCode.down)}`
  || `${gameTable}` !== `${makeMove(keyCode.left)}`
  || `${gameTable}` !== `${makeMove(keyCode.right)}`) {
    return true;
  }
}

function addScore() {
  if (scoreBuffer.length > 0) {
    score += scoreBuffer.reduce((acc, cur) => acc + cur);
    scoreBoard.textContent = !score ? 0 : score;
  }
}

function action(direction) {
  scoreBuffer = [];

  const gameDataNext = makeMove(direction);

  if (`${gameTable}` === `${gameDataNext}`) {
    return false;
  }

  gameTable = gameDataNext;

  return true;
}

function endGame(result) {
  if (result) {
    messageWin.classList.remove('hidden');
  } else {
    messageLose.classList.remove('hidden');
  }
  document.removeEventListener('keydown', start);
}

function init() {
  button.classList.remove('start');
  button.textContent = 'Restart';
  button.classList.add('restart');
  messageStart.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageLose.classList.add('hidden');
  scoreBoard.textContent = '0';
  score = 0;
  cleanTable();
  random();
  random();
  draw();
  document.addEventListener('keydown', start);
}

function cleanTable() {
  [...tableCells].map(el => {
    el.classList.remove(`field_cell--${el.textContent}`);
    el.textContent = '';
  });

  gameTable.map(row => row.map((_, i) => {
    row[i] = 0;
  }));
}

function draw() {
  const gameDataUnpacked = [];

  gameTable.forEach((rows) => {
    rows.forEach((cells) => {
      gameDataUnpacked.push(cells);
    });
  });

  tableCells.forEach((cells) => {
    const text = gameDataUnpacked.shift();

    cells.textContent = !text ? null : text;
    cells.className = 'field_cell';
    cells.classList.add(`field_cell--${cells.textContent}`);
  });
}

function start(e) {
  if (e.keyCode < 36 || e.keyCode > 41) {
    return;
  }

  if (action(e.keyCode)) {
    if (scoreBuffer.includes(2048)) {
      endGame(true);
    }
    addScore();
    random();

    if (!checkIfFull() && !gameEnd()) {
      endGame(false);
    }
    scoreBuffer = [];
    draw();
  }
}

button.addEventListener('click', init);
