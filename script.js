'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

let diceElem = document.querySelector('.dice');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnRules = document.querySelector('.btn--rules');

let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close-modal');
let overlay = document.querySelector('.overlay');

// Setting starting game parameters
score0El.textContent = 0;
score1El.textContent = 0;

// hiding dice image at the start:
diceElem.classList.add('hidden');

// declaring variables:

let currentScore, activePlayer, totalScore0Pl, totalScore1Pl, gameState;

function initial() {
    gameState = true;
    activePlayer = 0;
    currentScore = 0;
    totalScore0Pl = 0;
    totalScore1Pl = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceElem.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

initial() // calling func to initialize a game

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
}

function toggleActivePlayerStyle() {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality by clicking on a button "Roll dice":

btnRoll.addEventListener('click', function () {
    // 1. generate random dice roll & display it
    if (gameState) {
        let dice = Math.trunc(Math.random() * 6) + 1;
        diceElem.classList.remove('hidden');
        diceElem.src = `dice-${dice}.png`;

        // 2. if dice roll !==1 - add dice roll to current score of active player, display new score
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; //so we are choosing current score based on the active Player = 0 or 1.

        } else {
            // current player result (in variable) = 0, displays also as 0; and then switches player:
            switchPlayer();
            toggleActivePlayerStyle();
        }
    }
})

// Functionality for clicking on a button "Hold":

btnHold.addEventListener('click', function () {
    if (gameState) {
        // adding current score to total score (! for active user):
        if (activePlayer === 0) {
            totalScore0Pl += currentScore;
            score0El.textContent = totalScore0Pl;
        } else {
            totalScore1Pl += currentScore;
            score1El.textContent = totalScore1Pl;
        } // summ is working correctly, now we have to add switch player mechanics:

        // check if total >= 100
        if (totalScore0Pl <= 100 && totalScore1Pl <= 100) {
            switchPlayer();
            toggleActivePlayerStyle();
        } else {
            // Finish the game: changing style of winner player, making gameState falsy:
            gameState = false;
            diceElem.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); // it works! =)
        }
    }
})

// Add "new-game" button functionality:
btnNew.addEventListener('click', initial);


// Add rules description to Rules button:

btnRules.addEventListener('click', function(){
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})

function closeModalWindow(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeModal.addEventListener('click', closeModalWindow);

overlay.addEventListener('click', closeModalWindow)
