// id to DOM element where we should create the table
const table_id = "motus-table-main";

// ligne actuel
var current_line;

// emplacement dans la ligne
var current_car;

// word to guest
var to_guest_word;

// return a random word
function getRandomMot() {
  return "joindre";

  const random = Math.floor(Math.random() * mots.length);
  console.log(mots[random]);
  return normalize(mots[random]);
}

// called once on load
function init() {
  document.addEventListener("keydown", (event) => onKeyPressed(event));
  document
    .getElementById("motus-end-game-button")
    .addEventListener("click", (event) => boutonRejouerClick(event));
  startGame();
}

// should be called everytime a new game start
function startGame() {
  var div = document.getElementById("motus-end-game");
  div.classList.add("hidden");

  current_car = 0;
  current_line = 0;
  to_guest_word = getRandomMot();
  var tb = document.getElementById(table_id);

  // clear inner html
  tb.innerHTML = "";

  for (var i = 0; i < 6; i++) {
    var row_div = document.createElement("div");
    row_div.classList.add("motus-table-row");
    tb.appendChild(row_div);
    for (var j = 0; j < to_guest_word.length; j++) {
      var div = document.createElement("div");
      div.classList.add("motus-base");
      div.id = "motus-" + i + "-" + j;
      row_div.appendChild(div);
    }
  }
}

// renvoie la case (div) à la ligne et à la position donnée
function getCase(line, pos) {
  return document.getElementById("motus-" + line + "-" + pos);
}

function setCaseValue(line, pos, value) {
  getCase(line, pos).innerHTML = value;
}

function setCaseYellow(line, pos) {
  getCase(line, pos).classList.add("motus-yellow");
}

function setCaseRed(line, pos) {
  getCase(line, pos).classList.add("motus-red");
}

// normalise le mot (enlève les accents notamment)
function normalize(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// when the user type something on their keyboard
function onKeyPressed(event) {
  if (current_line <= 5) {
    // if the character is a letter
    if (String.fromCharCode(event.keyCode).match(/\w/gi)) {
      // if the word is too long
      if (current_car >= to_guest_word.length) {
        return;
      }
      // force the key to be lowercase
      var key = event.key.toLowerCase();

      // if the key is length of one we continue
      // exclude stuff like F1, F2, F3, etc...
      if (key.length > 1) {
        return;
      }

      key = normalize(key);
      setCaseValue(current_line, current_car, key);
      current_car++;
    } else {
      if (event.key == "Enter") {
        // if the word is the correct size
        if (current_car == to_guest_word.length) {
          gameTick();
          current_line++;
          current_car = 0;
        }
      } else if (event.key == "Backspace") {
        if (current_car > 0) {
          current_car--;
          setCaseValue(current_line, current_car, "");
        }
      }
    }
  }
}

// triggered when the user press enter (and this enter is valid aka, we have a complete word)
function gameTick() {
  // array containing number for each letter
  // the value correspond to what color we should put on the letter
  // 0: nothing
  // 1: yellow (letter is in text)
  // 2: red (letter is in text and in the right place)
  arr = new Array(to_guest_word.length).fill(0);

  // mark exact match (letter is in text and in the right place)
  for (i = 0; i < to_guest_word.length; i++) {
    if (to_guest_word.includes(getCase(current_line, i).innerHTML)) {
      if (to_guest_word[i] == getCase(current_line, i).innerHTML) {
        arr[i] = 2;
      }
    }
  }

  // check if a letter is in text BUT NOT in the right place
  // this below exclude letter that are in the right place
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (
        arr[j] == 0 &&
        to_guest_word[i] == getCase(current_line, j).innerHTML &&
        arr[i] != 2
      ) {
        arr[j] = 1;
        break;
      }
    }
  }

  // will be true if the user win the game
  // false if lose or the game isn't done yet
  var is_win = true;
  // fill red or yellow according to arr content
  for (i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case 1:
        setCaseYellow(current_line, i);
        is_win = false;
        break;
      case 2:
        setCaseRed(current_line, i);
        break;
      default:
        is_win = false;
        break;
    }
  }

  if (is_win) {
    endGame(true);
  } else {
    // if we are on last line, then the user lose
    if (current_line == 5) {
      endGame(false);
    }
  }
}

// should be called when the game is over
// win: true if winned, false if lost
function endGame(win) {
  var div = document.getElementById("motus-end-game");
  div.classList.remove("hidden");

  var h1 = document.getElementById("motus-end-game-title");
  h1.innerHTML = win ? "Gagné !" : "Perdu !";

  var img = document.getElementById("motus-end-game-image");
  if (win) {
    img.setAttribute("src", "win.gif");
    img.setAttribute("alt", "Gagné !");
  } else {
    img.setAttribute("src", "lose.gif");
    img.setAttribute("alt", "Perdu !");
  }
}

// triggered when the user click the replay button
function boutonRejouerClick(event) {
  startGame();
}

window.onload = init;
