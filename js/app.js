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
    "🌷", "🍇", "🍉", "🍊"
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

    let gameBoard = board.sort(() => Math.random() - 0.5);

    cardsEls.forEach((card, index) => {
        card.textContent = gameBoard[index]
    });

};



initGame()

/*----------------------------- Event Listeners -----------------------------*/
