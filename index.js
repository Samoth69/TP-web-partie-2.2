const table_id = "motus-table-main";
// ligne actuel
var current_line = 0;

// emplacement dans la ligne
var current_car = 0;

var to_guest_word = null;

function getRandomMot() {
  const random = Math.floor(Math.random() * mots.length);
  console.log(mots[random]);
  return normalize(mots[random]);
}

function startGame() {
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

  document.addEventListener("keydown", (event) => onKeyPressed(event));
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

function onKeyPressed(event) {
  if (current_line <= 5) {
    // if the character is a letter
    if (String.fromCharCode(event.keyCode).match(/\w/gi)) {
      // if the word is too long
      if (current_car >= to_guest_word.length) {
        return;
      }
      var key = event.key.toLowerCase();
      if (key.length > 1) {
        return;
      }
      key = normalize(key);
      setCaseValue(current_line, current_car, key);
      current_car++;
    } else {
      if (event.key == "Enter") {
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
    if (arr[i] == 0) {
      for (j = 0; j < arr.length; j++) {
        if (
          arr[j] == 0 &&
          to_guest_word[i] == getCase(current_line, j).innerHTML
        ) {
          arr[j] = 1;
          break;
        }
      }
    }
  }

  // fill red or yellow according to arr content
  var is_win = true;
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
    alert("You win !");
  } else {
    if (current_line == 5) {
      alert("You loose !");
    }
  }
}

function win(){
  var docs = document.getElementById("img");
  docs.setAttribute("src", "win.gif");
  docs.style.display = 'block';
}

window.onload = startGame;
