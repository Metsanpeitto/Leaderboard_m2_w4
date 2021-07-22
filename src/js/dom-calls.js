/**         All the DOM manipulation will be done from this module          */
import Api from './api.js';

const api = new Api();
let user = null;
let score = null;
let scores = [];

const refreshBtn = document.getElementById('refresh-btn');
const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const scoreList = document.getElementById('list');

const handleChange = (e) => {
  const { id } = e.currentTarget;
  const { value } = e.currentTarget;
  if (id === 'name-input') {
    user = value;
  } else {
    score = value;
  }
};

const displayScores = () => {
  scoreList.innerHTML = null;
  scores.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = `<h6>${s.user}</h6> : <h6>${s.score}</h6>`;
    scoreList.appendChild(li);
  });
};

const refresh = () => {
  api.refresh().then((response) => {
    scores = response;
    if (scores.length > 0) {
      nameInput.value = '';
      scoreInput.value = '';
      displayScores();
    }
  });
};

refreshBtn.addEventListener('click', () => {
  refresh();
});

submitBtn.addEventListener('click', () => {
  api.addScore(user, score).then(() => {
    refresh();
  });
});

nameInput.addEventListener('change', (e) => {
  handleChange(e);
});

scoreInput.addEventListener('change', (e) => {
  handleChange(e);
});

setTimeout(4000, refresh());
