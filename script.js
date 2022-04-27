'use strict';
// select elements//
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const bntHoldEl = document.querySelector('.btn--hold');
const winner0EL = document.getElementById('winner--0');
const winner1EL = document.getElementById('winner--1');
let scores, currentScore, activePlayer;

initGame();

function initGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //set initial values//
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  winner0EL.classList.add('hidden');
  winner1EL.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
}

//switch player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else activePlayer = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//dice rolling//
btnRoll.addEventListener('click', function () {
  // get a random number between 1 and 6
  let dice = Math.trunc(Math.random() * 6 + 1);
  //show the dice again based on that random number
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //if roll a 1 next player
  if (dice !== 1) {
    currentScore = currentScore + dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

// Hold button logic

bntHoldEl.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
    btnRoll.classList.add('hidden');
    bntHoldEl.classList.add('hidden');
    document
      .getElementById(`winner--${activePlayer}`)
      .classList.remove('hidden');
  } else {
    switchPlayer();
  }
});
//new game reset
btnNewEl.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  btnRoll.classList.remove('hidden');
  bntHoldEl.classList.remove('hidden');
  initGame();
});
