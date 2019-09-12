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
}

function makeNewRow(rowId) {
  let newRow = document.createElement("tr");
  newRow.id = rowId;
  gameBoard.appendChild(newRow);
  for (let index = 1; index < 6; index++) {
    let newCell = document.createElement("td");
    newCell.id = "." + String(index);
    newCell.onclick = function() {
      listener(newCell);
    };
    document.getElementById(rowId).appendChild(newCell);
  }
}

function listener(newCell) {
  if (newCell.innerHTML === "" && gameWon === false) {
    newCell.innerHTML = currentPlayer;

    var boo = checkWinner();
    if (boo) {
      gameWon = true;
      alert("Player " + (currentPlayer === "X" ? "1" : "2") + " won!");
    }

    /* Vaihdetaan klikatun solun tausta halutun värikseksi */
    if (currentPlayer === "X") {
      newCell.id = "X";
    } else {
      newCell.id = "O";
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
  var seconds = 9;

  tt = setInterval(function() {
    var timeString = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("time").textContent = "0:" + timeString;
    if (--seconds < 0) {
      chancePlayer();
      seconds = 9;
    }
  }, 1000);
}

function checkWinner() {
  /* Tarkistetaan kaikki vaakasuora kombinaaiot*/

  for (let i = 0; i < 5; i++) {
    let row = document.getElementById(i).getElementsByTagName("td");
    var countX = 0;
    var countO = 0;
    for (let index = 0; index < row.length; index++) {
      if (row[index].innerHTML === "") {
        break;
      }
      if (row[index].innerHTML === "X") {
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

  /* Tarkistetaan pystysuoran kaikki kombinaatiot*/

  for (let i = 0; i < 5; i++) {
    countX = 0;
    countO = 0;
    for (let index = 0; index < 5; index++) {
      let cell = document.getElementById(index).getElementsByTagName("td")[i];
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

  /* Diagonaali vasemmalta yläkulmasta oikeaan alakulmaan */

  countX = 0;
  countO = 0;
  for (let index = 0; index < 5; index++) {
    let cell = document.getElementById(index).getElementsByTagName("td")[index];
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

  /* Diagonaali oikealta yläkulmasta oikeaan vasempaan */

  countX = 0;
  countO = 0;
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

function newGameButton() {
  clearInterval(tt);
  startTimer();
  gameWon = false;
  let cells = gameBoard.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].id = undefined;
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
