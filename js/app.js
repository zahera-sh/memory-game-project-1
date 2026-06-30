/*------------------------ Cached Element References ------------------------*/

const cardsEls = document.querySelectorAll(".crds");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");
const movesEl = document.querySelector("#moves");
const matchedEl = document.querySelector("#matched");
const startBtnEl = document.querySelector("#start");
const startEl = document.querySelector(".start-screen");
const nameInputEl = document.querySelector("#name-input");

/* console.log(cardsEls);
console.log(messageEl);
console.log(resetBtnEl);
console.log(movesEl);
console.log(matchedEl);
console.log(startBtnEl);
console.log(startEl);
console.log(nameInputEl); */

/*-------------------------------- Constants --------------------------------*/

const cards = [
    "🐚", "🫧", "🦋", "🌸",
    "🍓", "🍇", "🍉", "🍒"
];

const board = [...cards, ...cards];

const cardBack = "࣪ ִֶָ☾.";

/*---------------------------- Variables (state) ----------------------------*/

let firstCard, secondCard;
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let matched = 0;
let winner = false;
let lockBoard = false;
let message;
let gameBoard;
let gameLevel;
let userName;

/*-------------------------------- Functions --------------------------------*/

function render() {

    cardsEls.forEach((card, index) => {
        if (matchedCards.includes(index) || firstCard === index || secondCard === index) {
            card.textContent = gameBoard[index];
        }

        else {
            card.textContent = cardBack;
        }
    })

    movesEl.textContent = `Moves: ${moves}`;
    matchedEl.textContent = `Matched: ${matched} | ${gameLevel}`;

}



function initGame() {

    userName = nameInputEl.value;
        console.log(userName);
    
    startEl.classList.add("hidden");

    gameBoard = [...board].sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    winner = false;
    lockBoard = false;
    gameLevel = (Number(board.length)/2);

    render()

}



function handleClick(event) {

    if (lockBoard) return;

    const cardIndex = Number(event.target.id);
     
    if (firstCard === cardIndex) {
            console.log("SAME CARD");
            return;
        }

    /*     const clickedCard = gameBoard[cardIndex]; */

    moves = Number(flippedCards +++1);
        console.log(moves);

    if (matchedCards.includes(cardIndex)) return;

    if (firstCard === null || firstCard === undefined) {
        firstCard = cardIndex;
        console.log("First card:", firstCard);

        render();

        return;
    }

    else if (secondCard === null || secondCard === undefined) {

        secondCard = cardIndex;
        console.log("Second card:", secondCard);

        render();

        lockBoard = true;

        if (gameBoard[firstCard] === gameBoard[secondCard]) {
            matchedCards.push(firstCard);
            matchedCards.push(secondCard);
            firstCard = null;
            secondCard = null;
            lockBoard = false;
            console.log(matchedCards);
        }

        else {

            setTimeout(() => {

                firstCard = null;
                secondCard = null;

                lockBoard = false;

                render();

            }, 1000);
        }
    }

    matched = Number(matchedCards.length /2);
    
    checkForWinner();

    render();

}



function checkForWinner() {
        if (matchedCards.length === board.length) {
            winner = true;
            console.log("WINNER!");
            return;
        }
}

/* initGame() */

/*----------------------------- Event Listeners -----------------------------*/

cardsEls.forEach((card) => {
    card.addEventListener("click", handleClick);
})

resetBtnEl.addEventListener("click", initGame);
startBtnEl.addEventListener("click", initGame);

startBtnEl.disabled = true;
nameInputEl.addEventListener("input", () => {
    startBtnEl.disabled = nameInputEl.value.trim() === "";
});