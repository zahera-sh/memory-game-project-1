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
        /*         card.textContent = gameBoard[index] */
        card.textContent = "✿"
    });

}



function handleClick(event) {

    if (lockBoard) return;

    const cardIndex = Number(event.target.id);

    /*     const clickedCard = gameBoard[cardIndex]; */

    if (firstCard === null || firstCard === undefined) {
        firstCard = cardIndex;
        console.log("First card:", firstCard);
    }

    else if (!secondCard) {
        if (firstCard === cardIndex) {
            console.log("SAME CARD")
            return
        }
        
        secondCard = cardIndex;
        console.log("Second card:", secondCard);

        lockBoard = true;

        if (gameBoard[firstCard] === gameBoard[secondCard]) {
            matchedCards.push(firstCard);
            matchedCards.push(secondCard);
            firstCard = null;
            secondCard = null;
            lockBoard = false;
            console.log(matchedCards)
        }

        else {
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }
    }

}



initGame()

/*----------------------------- Event Listeners -----------------------------*/

cardsEls.forEach((card) => {
    card.addEventListener("click", handleClick)
})