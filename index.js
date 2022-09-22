const table_id = "table-modus";
// ligne actuel
var current_line = 0;

// emplacement dans la ligne
var current_car = 0;

var to_guest_word = null;

// todo
function getRandomMot() {
  return "patate";
}

function startGame() {
  to_guest_word = getRandomMot();
  var tb = document.getElementById(table_id);

  // clear inner html
  tb.innerHTML = "";

  for (var i = 0; i < 6; i++) {
    var tr = document.createElement("tr");
    tb.appendChild(tr);
    for (var j = 0; j < to_guest_word.length; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);

      var div = document.createElement("div");
      div.className = "motus-base";
      div.id = "motus-" + i + "-" + j;
      td.appendChild(div);
    }
  }

  document.addEventListener("keydown", (event) => onKeyPressed(event));
}

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
  for (i = 0; i < to_guest_word.length; i++) {
    if (to_guest_word.includes(getCase(current_line, i).innerHTML)) {
      setCaseYellow(current_line, i);
    }
    if (to_guest_word[i] == getCase(current_line, i).innerHTML) {
      setCaseRed(current_line, i);
    }
  }
}

window.onload = startGame;
