let input = document.querySelector("#input");

let start = document.querySelector("#start");
let rule = document.querySelector("hr");
let graphArea = document.querySelector(".sorting");
let code = document.querySelectorAll(".code");
start.addEventListener("click", () => {
  graphArea.innerHTML = "";
  text = input.value.split(",");
  let values = [];
  text.forEach((elem) => {
    values.push(parseInt(elem));
    graphArea.innerHTML += `<div class="values" style="--h:${parseInt(
      elem
    )+2}vw">${parseInt(elem)}</div>`;
  });
  rule.style.width = `${values.length * 4}vw`;
  let graphs = document.querySelectorAll(".values");
  const changeHeights = (i, j) => {
    graphs[i].style.height = `${values[i] + 2}vw`;
    graphs[i].innerText = `${values[i]}`;
    graphs[j].style.height = `${values[j] + 2}vw`;
    graphs[j].innerText = `${values[j]}`;
  };
  let flag = 1;
  function sleep(num) {
    return new Promise((resolve) => setTimeout(resolve, num));
  }

  async function wait(num) {
    await sleep(num);
  }
  const setSelectedLine = (num)=>{
    code.forEach((line,index)=>{
      if(index === num){
        line.classList.add("selected");
      }else{
        line.classList.remove("selected");
      }
    })
  }
  async function sort() {
    let n = values.length;
    setSelectedLine(0);
    for(let i=0;i<n;i++){
      await wait(1000);
      setSelectedLine(1);
      for(let j=0;j<n-i-1;j++){
        await wait(1000);
        graphs[j].style.backgroundColor = "black";
        graphs[j+1].style.backgroundColor = "black";
        setSelectedLine(2);
        await wait(2000);
        if(values[j]>values[j+1]){
          
          setSelectedLine(3);
          let temp = values[j];

          setSelectedLine(4);
          await wait(500);
          values[j] = values[j+1];
          graphs[j].style.height = `${values[j] + 2}vw`;
          graphs[j].innerText = `${values[j]}`;
      
          setSelectedLine(5);
          await wait(1000);
          values[j+1] = temp;
          graphs[j+1].style.height = `${values[j+1] + 2}vw`;
          graphs[j+1].innerText = `${values[j+1]}`;
      
        }
        setSelectedLine(1);
        await wait(1000);
        graphs[j].style.backgroundColor = "blue";
        graphs[j+1].style.backgroundColor = "blue"; 
      }
    }
    setSelectedLine(-1);
  }
  console.log(values);
  sort();
});
