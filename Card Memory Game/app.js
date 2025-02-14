function getRandomPairs(min, max, pairCount) {
  
  let numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  for (let i = 0; i < numbers.length; i++) {
    let temp = numbers[i];
    let j = Math.floor(Math.random() * numbers.length);
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  let pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    let pair = [];
    pair.push(numbers[i++]);
    pair.push(numbers[i]);
    pairs.push(pair);
  }
  return pairs;
}
let winPopUp = document.querySelector(".winPopup");
let pairs = getRandomPairs(0, 11, 6);
let cards = document.querySelectorAll(".card");
let imgs = [
  "images/bulbasaur.jpg",
  "images/charmander.jpg",
  "images/dratini.jpg",
  "images/jigglypuff.jpg",
  "images/pikachu.jpg",
  "images/polywag.jpg",
];
const startGame = () => {
  let restart = document.querySelectorAll(".restart");
  restart.forEach((btn)=>{btn.addEventListener("click", () => {
    winPopUp.style.visibility = "hidden";
    window.location.reload(true);
    
  })});
  let seconds = document.querySelector("#seconds");
  let minutes = document.querySelector("#minutes");
  let moves = document.querySelector("#movesNo");
  let timeIncrement = setInterval(() => {
    if (seconds.innerText === "59") {
      minutes.innerText = parseInt(minutes.innerText) + 1;
      if (minutes.innerText.length == 1) {
        minutes.innerText = "0" + minutes.innerText;
      }
      seconds.innerText = "00";
    } else {
      seconds.innerText = parseInt(seconds.innerText) + 1;
      if (seconds.innerText.length == 1) {
        seconds.innerText = "0" + seconds.innerText;
      }
    }
  }, 1000);
  let win = false;

  let urls = [];
  var prev = "";
  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function wait(time) {
    await sleep(time);
    // console.log("waiting");
  }
  var curr = "";
  var revealed = [];
  let hideCards = (prev, curr) => {
    // console.log(revealed);
    //   console.log(prev + " " + curr);
    pairs.forEach((elem, ind) => {
      let img = "images/question.jpg";
      elem.forEach((el) => {
        let f = 0;
        // console.log("Current = "+curr+" Previous = "+prev);
        urls[el] = imgs[ind];
        revealed.forEach(async function (item) {
          // console.log(item+" "+el);
          if (item === urls[el]) {
            console.log(item);
            f = 1;
          }
        });
        // console.log(el)
        if (!f && urls[el] !== prev && urls[el] !== curr) {
          async function changeImage() {
            cards[el].style.transform = `rotateY(180deg)`;

            cards[el].style.backgroundImage = `url(${img})`;
          }
          changeImage();
        }
      });
    });
  };
  let flag = 1;
  hideCards();
  let checkWin = () => {
    if (revealed.length == pairs.length) {
      win = true;
      clearInterval(timeIncrement);
      winPopUp.style.visibility = "visible";
      winPopUp.innerHTML = `<h2>You Won!!!</h2>
            <div>
                <p class="time">Time: ${minutes.innerText}:${seconds.innerText}</p>
                <p class="moves">Moves: ${moves.innerText}</p>
            </div>
            <button class="restart">Restart</button>`
    }
    
    // clearInterval(timeIncrement);  
  };
  cards.forEach((elem) => {
    elem.addEventListener("click", async function (e) {
      // console.log(revealed);
      if(win != true){
      moves.innerText = parseInt(moves.innerText) + 1;
      let id = e.target.getAttribute("id");
      cards[id].style.transform = `rotateY(0deg)`;
      await wait(300);
      cards[id].style.backgroundImage = `url(${urls[id]})`;
      curr = urls[id];
      if (prev === curr) {
        revealed.push(prev);
        console.log(revealed);
        checkWin();
        prev = "";
      } else {
        if (flag % 2 == 0) {
          hideCards(prev, curr);
          prev = "";
          // console.log("hree");
          await wait(500);
          hideCards("", "");
        } else {
          prev = curr;
        }
      }
      // prev = curr;
      flag++;
    }
    });
  
  });
};
console.log(pairs);
pairs.forEach((pair, index) => {
  cards[pair[0]].style.backgroundImage = `url(${imgs[index]})`;
  cards[pair[1]].style.backgroundImage = `url(${imgs[index]})`;
});
const heading = document.querySelector("#time");
heading.innerText = "Game starts in 5 seconds";
let time = 5;
const changeTime = setInterval(()=>{
  time--;
  heading.innerText = `Game starts in ${time} seconds`;
},1000);

setTimeout(()=>{
  pairs.forEach((pair, index) => {
    cards[pair[0]].style.backgroundImage = `url(images/question.jpg)`;
    cards[pair[1]].style.backgroundImage = `url(images/question.jpg)`;
  });
  clearInterval(changeTime);
  document.body.removeChild(heading);
  startGame();
  console.log("Game started");
},5000);
