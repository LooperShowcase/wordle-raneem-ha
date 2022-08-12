const express = require("express");
const app = express();

const towin = "HAPPY";
app.get("/wordle/:word", function (req, res) {
  let arr = ["", "", "", "", ""];
  const userGuess = req.params.word.toUpperCase();
  let map = {
    H: 1,
    A: 1,
    P: 2,
    Y: 1,
  };
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === towin[i]) {
      arr[i] = "green";
      let curLetter = userGuess[i];
      map[curLetter]--;
    }
  }
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] !== towin[i]) {
      let curLetter = userGuess[i];
      if (map[curLetter] == undefined) {
        arr[i] = "grey";
      } else if (map[curLetter] > 0) {
        arr[i] = "orange";
        map[curLetter]--;
      } else {
        arr[i] = "grey";
      }
    }
  }
  res.send(arr);
});

app.use(express.static("public"));

app.listen(3000);
