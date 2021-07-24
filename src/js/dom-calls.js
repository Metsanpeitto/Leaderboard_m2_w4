/**         All the DOM manipulation will be done from this module          */
import Api from "./api.js";
/*          Initializes the active components                               */
const refreshBtn = document.getElementById("refresh-btn");
const submitBtn = document.getElementById("submit-btn");
const nameInput = document.getElementById("name-input");
const scoreInput = document.getElementById("score-input");
const scoreList = document.getElementById("list");
const banner = document.getElementById("banner");

/*          Initializes the class Api and automatically retrieves scores    */
const api = new Api();
let user = null;
let score = null;
let scores = [];

/*          Gets and stores the changes in the 'user' and 'score' inputs    */
const handleChange = (e) => {
  const { id } = e.currentTarget;
  const { value } = e.currentTarget;
  if (id === "name-input") {
    user = value;
  } else {
    score = `${value}`;
  }
};

/*          Populates the 'Score List' with data from the API               */
const displayScores = () => {
  scoreList.innerHTML = null;
  scores.forEach((s) => {
    const li = document.createElement("li");
    li.innerHTML = `<h6>${s.user}</h6> : <h6>${s.score}</h6>`;
    scoreList.appendChild(li);
  });
};

/*          Resets inputs, calls API, and if retrieved, displays scores    */
const refresh = () => {
  api.refresh().then((response) => {
    let arr = response;
    if (arr.length > 0) {
      arr.sort((scoreA, scoreB) => {
        const indexA = parseInt(scoreA.score, 10);
        const indexB = parseInt(scoreB.score, 10);
        if (indexA < indexB) {
          return -1;
        }
        if (indexA > indexB) {
          return 1;
        }
        return 0;
      });
      scores = arr.reverse();
      nameInput.value = "";
      scoreInput.value = "";
      displayScores();
    }
  });
};

const newScore = () => {
  api.addScore(user, score).then(() => {
    refresh(nameInput, scoreInput);
  });
};

/*          Initializes events for each active component                   */
refreshBtn.addEventListener("click", () => {
  refresh();
});

submitBtn.addEventListener("click", () => {
  banner.classList.add("visible");
  banner.classList.add("fromLeft");
  console.log(banner);
  if (user !== null && score !== null) {
    if (user !== "" && score !== "") {
      banner.innerHTML = "Score Submitted Successfuly";
      newScore();
    } else {
      banner.innerHTML = "No valid inputs";
    }
  } else {
    banner.innerHTML = "No valid inputs";
  }
  setTimeout(() => {
    banner.classList.add("toRight");
    banner.classList.remove("fromLeft");
  }, 4000);
  setTimeout(() => {
    banner.classList.remove("toRight");
    banner.classList.remove("visible");
  }, 5500);
});

nameInput.addEventListener("change", (e) => {
  handleChange(e);
});

scoreInput.addEventListener("change", (e) => {
  handleChange(e);
});

/*          When the page loads api.init() retrieves scores from the Api   */
/*          This function will wait for it and display it when received    */
setTimeout(4000, refresh());
