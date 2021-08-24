const gamecontainer = document.querySelector(".game-container"),
  options = gamecontainer.querySelector(".options"),
  gameboard = document.querySelector(".game-board"),
  xSelect = options.querySelector(".playerX"),
  oSelect = options.querySelector(".playerO"),
  status = gamecontainer.querySelector(".status-message"),
  turns = gamecontainer.querySelector(".turns"),
  cells = gameboard.querySelectorAll("span"),
  gameend = document.querySelector(".game-end"),
  replay = gameend.querySelector(".playerX"),
  quit = gameend.querySelector(".playerO");

window.onload = () => {
  xSelect.onclick = () => {
    status.innerHTML = "Game in progress";
    options.style.display = "none";
    turns.classList.add("active");
    turns.querySelector(".playerX").classList.add("current");
  };
  oSelect.onclick = () => {
    status.innerHTML = "Game in progress";
    options.style.display = "none";
    turns.classList.add("active");
    turns.querySelector(".playerO").classList.add("current");
  };
};
var flag = true;
cells.forEach((cell) => {
  cell.onclick = () => {
    //Adding X/O
    if (status.innerHTML !== "Choose X or O" && flag) {
      let turn = document.querySelector(".current").classList[0];
      console.log(turn);
      if (turn === "playerX") {
        cell.innerHTML = "✖";
        turns.querySelector(".playerX").classList.remove("current");
        turns.querySelector(".playerO").classList.add("current");
        cell.onclick = null;
      } else {
        cell.innerHTML = "Ｏ";
        turns.querySelector(".playerO").classList.remove("current");
        turns.querySelector(".playerX").classList.add("current");
        cell.onclick = null;
      }

      let state = CheckEnd();

      if (state === "✖") status.innerHTML = "X Wins!";
      else if (state === "Ｏ") status.innerHTML = "O Wins!";
      else if (state === "Draw") status.innerHTML = state + "!";

      if (state != "continue") {
        gameend.classList.add("active");
        turns.classList.remove("active");
        flag = false;
      }
    }
  };
});

replay.onclick = () => {
  location.reload();
};

function CheckEnd() {
  let counter = 0;

  for (let i = 0; i < 9; i += 3) {
    let a = cells[i].innerHTML,
      b = cells[i + 1].innerHTML,
      c = cells[i + 2].innerHTML;
    if ((a === "✖" || a === "Ｏ") && a === b && b == c) return a;
  }

  for (let i = 0; i < 3; i++) {
    let a = cells[i].innerHTML,
      b = cells[i + 3].innerHTML,
      c = cells[i + 6].innerHTML;
    if ((a === "✖" || a === "Ｏ") && a === b && b == c) return a;
  }

  if (
    (cells[0].innerHTML === "✖" || cells[0].innerHTML === "Ｏ") &&
    cells[0].innerHTML === cells[4].innerHTML &&
    cells[4].innerHTML === cells[8].innerHTML
  )
    return cells[0].innerHTML;

  if (
    (cells[2].innerHTML === "✖" || cells[2].innerHTML === "Ｏ") &&
    cells[2].innerHTML === cells[4].innerHTML &&
    cells[4].innerHTML === cells[6].innerHTML
  )
    return cells[0].innerHTML;

  cells.forEach((cell) => {
    if (cell.innerHTML === "✖" || cell.innerHTML === "Ｏ") counter++;
  });

  if (counter === 9) return "Draw";

  return "continue";
}
