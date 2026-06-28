/*------------------------ Cached Element References ------------------------*/

const cardsEls = document.querySelectorAll(".crds");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/* console.log(cardsEls)
console.log(messageEl)
console.log(resetBtnEl) */

/*-------------------------------- Constants --------------------------------*/

const cards = [
    "🐚", "🫧", "🦋", "🌸",
    "🍓", "🍇", "🍉", "🍒"
];

const board = [...cards, ...cards];

/*---------------------------- Variables (state) ----------------------------*/

let firstCard, secondCard;
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let winner = false;
let lockBoard = false;
let message;
let gameBoard;

/*-------------------------------- Functions --------------------------------*/

function initGame() {

    gameBoard = board.sort(() => Math.random() - 0.5);

    cardsEls.forEach((card, index) => {
        card.textContent = gameBoard[index]
    });

}



function handleClick(event) {

    if (lockBoard) return;

    const cardIndex = Number(event.target.id);

    const clickedCard = gameBoard[cardIndex];

    if (!firstCard) {
        firstCard = clickedCard;
        console.log("First card:", firstCard);
    }

    else if (!secondCard) {
        secondCard = clickedCard;
        console.log("Second card:", secondCard);

        lockBoard = true;

    }

}



initGame()

/*----------------------------- Event Listeners -----------------------------*/

cardsEls.forEach((card) => {
    card.addEventListener("click", handleClick)
})