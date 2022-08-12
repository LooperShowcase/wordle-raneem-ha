let NUMBER_OF_CHARS = 5;
let NUMBER_OF_WORDS = 6;

let gameDiv = document.getElementById("game");
for (let i = 0; i < NUMBER_OF_WORDS; i++) {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";

  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordDiv.appendChild(charDiv);
  }
  gameDiv.appendChild(wordDiv);
}

let curword = 0;
let curChar = 0;

document.addEventListener("keydown", async function (event) {
  let wordDiv = gameDiv.children[curword]; //get word
  if (event.code == "Backspace") {
    let charToDel = wordDiv.children[curChar - 1];
    charToDel.innerHTML = "";
    curChar--;
  } else if (event.code == "Enter") {
    if (curChar == NUMBER_OF_CHARS) {
      const word = getCurentword();
      animateCSS(wordDiv,"wobble")
      const result = await (await fetch("/wordle/" + word)).json();
      for (let i = 0; i < result.length; i++) {
        wordDiv.children[i].style.background = result[i];
      }

      curword++;
      curChar = 0;
    }
  } else if (isLetter(event.key) && curChar < NUMBER_OF_CHARS) {
    let chaArr = wordDiv.children[curChar];
    chaArr.innerHTML = event.key;
    curChar++;
  }
});
function getCurentword() {
  let word = "";
  let wordDiv = gameDiv.children[curword]; //Curent word
  for (let i = 0; i < NUMBER_OF_CHARS; i++) {
    let charDiv = wordDiv.children[i]; //Curent char
    word = word + charDiv.innerHTML; //""-->"A"-->"AP"-->"APP"
  }
  return word;
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
   

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });