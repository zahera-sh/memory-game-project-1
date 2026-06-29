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

const cardBack = "✿";

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

function render() {

    cardsEls.forEach((card, index) => {
        if (matchedCards.includes(index) || firstCard === index || secondCard === index) {
            card.textContent = gameBoard[index];
        }

        else {
            card.textContent = cardBack;
        }
    })

}



function initGame() {

    gameBoard = [...board].sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    winner = false;
    lockBoard = false;

    render()

}



function handleClick(event) {

    if (lockBoard) return;

    const cardIndex = Number(event.target.id);

    /*     const clickedCard = gameBoard[cardIndex]; */

    if (matchedCards.includes(cardIndex)) return;

    if (firstCard === null || firstCard === undefined) {
        firstCard = cardIndex;
        console.log("First card:", firstCard);

        render();

        return
    }

    else if (secondCard === null || secondCard === undefined) {
        if (firstCard === cardIndex) {
            console.log("SAME CARD")
            return
        }

        secondCard = cardIndex;
        console.log("Second card:", secondCard);

        render()

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

            setTimeout(() => {

                firstCard = null;
                secondCard = null;

                lockBoard = false;

                render()

            }, 1000)
        }
    }

}



initGame()

/*----------------------------- Event Listeners -----------------------------*/

cardsEls.forEach((card) => {
    card.addEventListener("click", handleClick)
})