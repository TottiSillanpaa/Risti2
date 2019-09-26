import "./styles.css";
let currentPlayer = "X";
let gameWon = false;
let procent = 0;
let tt;

function $(text) {
  return document.getElementById(text);
}

function fillBoard() {
  makeHeader();
  makeGameBoard();
  makeProgressbar();
  makeNewGameButton();
  makeNewRows();
  let time = document.createElement("div");
  time.id = "time";
  document.body.appendChild(time);
  startTimer();
  $("board").addEventListener("click", listener);
}

function makeHeader() {
  let head = document.createElement("div");
  head.className = "head";

  let text1 = document.createElement("h2");
  text1.innerHTML = "Ristinolla";
  let text2 = document.createElement("h3");
  text2.id = "pp";
  text2.innerHTML = "Pelaajan 1 vuoro";

  head.appendChild(text1);
  head.appendChild(text2);

  document.body.appendChild(head);
}

function makeGameBoard() {
  let div = document.createElement("div");
  div.className = "container";

  let board = document.createElement("div");
  board.id = "board";

  div.appendChild(board);
  document.body.appendChild(div);
}

function makeProgressbar() {
  let div = document.createElement("div");
  div.className = "progress";

  let progress = document.createElement("div");
  progress.className = "determinate";
  progress.id = "progress";

  div.appendChild(progress);
  document.body.appendChild(div);
}

function makeNewRows() {
  for (let i = 0; i < 5; i++) {
    let newRow = document.createElement("div");
    newRow.className = "row";
    for (let index = 0; index < 5; index++) {
      let newCell = document.createElement("div");
      newCell.className = "col s1";
      newCell.className += " grid-item";
      newCell.id = String(i) + String(index);
      newRow.appendChild(newCell);
    }
    $("board").appendChild(newRow);
  }
}

function makeNewGameButton() {
  let div = document.createElement("div");
  div.className = "wrapper";

  let button = document.createElement("input");
  button.type = "button";
  button.value = "New Game";
  button.id = "ng";
  button.onclick = function() {
    ngFunction();
  };

  div.appendChild(button);
  document.body.appendChild(div);
}

function listener(ev) {
  let newCell = ev.target;
  let cellRow = String(newCell.id)[0];
  let cellColumn = String(newCell.id)[1];

  if (newCell.innerHTML === "" && gameWon === false) {
    newCell.innerHTML = currentPlayer;
    var boo = checkWinner(cellRow, cellColumn);
    if (boo) {
      gameWon = true;
      alert("Player " + (currentPlayer === "X" ? "1" : "2") + " won!");
    }

    /* Vaihdetaan klikatun solun tausta halutun värikseksi */
    if (currentPlayer === "X") {
      newCell.style.backgroundColor = "rgb(124, 252, 0)";
    } else {
      newCell.style.backgroundColor = "rgb(250, 128, 114)";
    }
    chancePlayer();
    clearInterval(tt);
    if (!boo) {
      startTimer();
    }

    procent += 4;
    $("progress").style.width = String(procent) + "%";
  }
}

function startTimer(display) {
  var seconds = 10;
  tt = setInterval(function() {
    var timeString = seconds < 10 ? "0" + seconds : seconds;

    $("time").textContent = "0:" + timeString;
    if (--seconds < 0) {
      chancePlayer();
      seconds = 10;
    }
  }, 1000);
}

function checkWinner(cellRow, cellColumn) {
  /* Tarkistetaan kaikki vaakasuora kombinaaiot*/

  var countX = 0;
  var countO = 0;
  for (let i = 0; i < 5; i++) {
    let cellId = cellRow + String(i);
    let cell = $(cellId);
    if (cell.innerHTML === "") {
      break;
    }
    if (cell.innerHTML === "X") {
      countX++;
    } else {
      countO++;
    }
    if (countX && countO >= 1) {
      break;
    }
    if (countX === 5 || countO === 5) {
      return true;
    }
  }
  /* Tarkistetaan pystysuoran kaikki kombinaatiot*/

  countX = 0;
  countO = 0;
  for (let i = 0; i < 5; i++) {
    let cellId = String(i) + cellColumn;
    let cell = $(cellId);
    if (cell.innerHTML === "") {
      break;
    }
    if (cell.innerHTML === "X") {
      countX++;
    } else {
      countO++;
    }
    if (countX && countO >= 1) {
      break;
    }
    if (countX === 5 || countO === 5) {
      return true;
    }
  }
  /* Diagonaali vasemmalta yläkulmasta oikeaan alakulmaan */

  countX = 0;
  countO = 0;
  if (cellRow === cellColumn) {
    for (let index = 0; index < 5; index++) {
      let cell = $(String(index) + String(index));
      if (cell.innerHTML === "") {
        break;
      }
      if (cell.innerHTML === "X") {
        countX++;
      } else {
        countO++;
      }
      if (countX && countO >= 1) {
        break;
      }
      if (countX === 5 || countO === 5) {
        return true;
      }
    }
  }

  /* Diagonaali oikealta yläkulmasta oikeaan vasempaan */

  countX = 0;
  countO = 0;
  if (parseInt(cellRow, 10) + parseInt(cellColumn, 10) === 4) {
    for (let index = 0; index < 5; index++) {
      let cell = $(String(index) + String(4 - index));
      if (cell.innerHTML === "") {
        break;
      }
      if (cell.innerHTML === "X") {
        countX++;
      } else {
        countO++;
      }
      if (countX && countO >= 1) {
        break;
      }
      if (countX === 5 || countO === 5) {
        return true;
      }
    }

    return false;
  }
}

function ngFunction() {
  clearInterval(tt);
  startTimer();
  gameWon = false;
  for (let i = 0; i < 5; i++) {
    for (let index = 0; index < 5; index++) {
      let cell = $(String(i) + String(index));
      cell.innerHTML = "";
      cell.style.backgroundColor = "white";
    }
  }
  currentPlayer = "X";
  $("progress").style.width = 0;
  $("pp").innerHTML = "Pelaajan 1 vuoro";
  procent = 0;
}

function chancePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  $("pp").innerHTML =
    "Pelaajan " + (currentPlayer === "X" ? "1" : "2") + " vuoro";
}

fillBoard();
