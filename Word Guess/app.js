let attempt = document.querySelectorAll(".attempt");
let btn = document.querySelector(".playAgain");
let attemptContainer = document.querySelector(".attempts")
let wordContainer = document.querySelector(".wordContainer");
let trails = document.querySelectorAll(".trail");
let words = [
  "cat",  
  "dog",  
  "sun",  
  "plant",  
  "light",  
  "cloud",  
  "brave",  
  "stone",  
  "march",  
  "fresh",  
  "quiet",  
  "bring",  
  "flame",  
  "world",  
  "smart",  
  "proud",  
  "vital",  
  "dance",  
  "charm",  
  "water",  
  "blend",  
  "grasp",  
  "touch",  
  "speak",  
  "table",  
  "wrist",  
  "harsh",  
  "youth",  
  "break",  
  "frost",  
  "quick",  
  "sharp",  
  "happy",  
  "clear",  
  "jolly",  
  "golden",  
  "planet",  
  "jumper",  
  "rocket",  
  "strong",  
  "market",  
  "bright",  
  "travel",  
  "bounce",  
  "crystal",  
  "sprint"
];

const infoPopup = document.querySelector("#gameRulesPopup");
const closeInfoPopup = document.querySelector("#closePopup");
closeInfoPopup.addEventListener("click",(e)=>{
  infoPopup.style.display = "none";
})
let play=()=>{
  wordContainer.innerHTML="";
  attempt.forEach((elem)=>{
    elem.removeAttribute("disabled");
    elem.value="";
  })
  trails.forEach((elem)=>{
    elem.innerHTML="";
  })
  for(let k=1;k<attempt.length;k++){
    attempt[k].classList.add("invisible");
  }
  const reveal = () => {
    letter.forEach((elem) => {
      elem.classList.remove("unseen");
    });
  };
  let attemptInd = 0;
  let currWord="";
  currWord= words[Math.floor(Math.random() * words.length)].toLowerCase();

  for (let i = 0; i < currWord.length; i++) {
    wordContainer.innerHTML += `<span class="letter unseen">${currWord[i]}</span>`;
  }
  attempt.forEach((elem) => {
    elem.setAttribute("minlength", `${currWord.length}`);
  });
  const letter = document.querySelectorAll(".letter");
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      if (e.target.value.length != currWord.length) {
        console.log(e.target.value);
        alert(currWord);
      } else {
        e.target.disabled = "true";

        let trail = e.target.parentElement.childNodes[1];
        for (let i = 0; i < currWord.length; i++) {
          trail.innerHTML += `<span class = "lett">${e.target.value[i]}</span>`;
        }
        let letters = document.querySelectorAll(".lett");
        console.log(currWord + " " + e.target.value);
        let unmatch = false;
        for (let i = 0; i < currWord.length; i++) {
          if (currWord[i] != letters[i].innerText) {
            letters[i].style.color = "red";
            unmatch = true;
            if (currWord.includes(letters[i].innerText)) {
              letters[i].style.color = "orange";
            }
          } else if (currWord[i] === letters[i].innerText) {
            letters[i].style.color = "green";
          }
        }
        if (unmatch === false) {
          reveal();
        } else {
          if ((attemptInd === 5)) {
            reveal();
          } else {
            attempt[++attemptInd].classList.remove("invisible");
          }
        }
        letters.forEach((ind) => {
          ind.classList.remove("lett");
        });
        // console.log(trail)
      }
    }
  });
}
play();
btn.addEventListener("click",()=>{
  window.location.reload(true);
})
