'use script';

// selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}


// Initial State of th Game
const init = function(){
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    scores = [0, 0];
    current0El.textContent = 0; 
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing){
        // Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;

        // Check if 1 is rolled: if true, 
        if (dice !== 1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else{
            // switch to second player
            switchPlayer();
        }}
});

btnHold.addEventListener('click', function() {
    if (playing){    
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; 
        // check if player's score >= 100
        if (scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');
            // finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else{
            // else switch to the next player
            switchPlayer();
        }}
});

btnNew.addEventListener('click', init)