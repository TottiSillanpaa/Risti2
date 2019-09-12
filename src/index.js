import "./styles.css";
let currentPlayer = "X";
let gameWon = false;
let gameBoard = document.getElementById("board");
let procent = 0;
let tt;

function fillBoard() {
  makeNewRow("0");
  makeNewRow("1");
  makeNewRow("2");
  makeNewRow("3");
  makeNewRow("4");
  startTimer();
  gameBoard.addEventListener("click", listener);
}

function makeNewRow(rowId) {
  let newRow = document.createElement("tr");
  newRow.id = rowId;
  gameBoard.appendChild(newRow);
  for (let index = 0; index < 5; index++) {
    let newCell = document.createElement("td");
    newCell.id = rowId + String(index);
    document.getElementById(rowId).appendChild(newCell);
  }
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
    document.getElementById("progress").style.width = String(procent) + "%";
  }
}

function startTimer(display) {
  var seconds = 10;
  tt = setInterval(function() {
    var timeString = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("time").textContent = "0:" + timeString;
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
    let cell = document.getElementById(cellId);
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
    let cell = document.getElementById(cellId);
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
      let cell = document.getElementById(index).getElementsByTagName("td")[
        index
      ];
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
      let cell = document.getElementById(index).getElementsByTagName("td")[
        4 - index
      ];
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

function newGameButton() {
  clearInterval(tt);
  startTimer();
  gameWon = false;
  let cells = gameBoard.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].style.backgroundColor = "white";
  }
  currentPlayer = "X";
  document.getElementById("progress").style.width = 0;
  document.getElementById("pp").innerHTML = "Pelaajan 1 vuoro";
  procent = 0;
}

function chancePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  document.getElementById("pp").innerHTML =
    "Pelaajan " + (currentPlayer === "X" ? "1" : "2") + " vuoro";
}

fillBoard();
document.getElementById("ng").onclick = function() {
  newGameButton();
};
