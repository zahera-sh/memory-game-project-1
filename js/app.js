/*------------------------ Cached Element References ------------------------*/

const cardsEls = document.querySelectorAll(".crds");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");
const movesEl = document.querySelector("#moves");
const matchedEl = document.querySelector("#matched");
const startBtnEl = document.querySelector("#start");
const startEl = document.querySelector(".start-screen");
const nameInputEl = document.querySelector("#name-input");
const winScrnEl = document.querySelector("#win-screen");
const playAgnEl = document.querySelector("#play-again");

/*-------------------------------- Constants --------------------------------*/

const cards = [
    "🐚", "🫧", "🦋", "🌸",
    "🍓", "🍇", "🍉", "🍒"
];

const board = [...cards, ...cards];

const cardBack = "࣪ ִֶָ☾.";

/*---------------------------- Variables (state) ----------------------------*/

let firstCard, secondCard;
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

    updateMessage()

}



function updateMessage() {

    if (matchedCards.length === board.length) {
        messageEl.textContent = (`🥳: Congratulations, ${userName}. You won!`);
    }

    else if (matchedCards.length === board.length / 2) {
        messageEl.textContent = (`😍: Good job, ${userName}. You're halfway there!`);
    }

    else if (moves >= board.length * 2 && matchedCards.length !== board.length) {
        messageEl.textContent = (`🤔: Hmmm, maybe pay more attention, ${userName}?`);
    }

}



function initGame() {
    winScrnEl.classList.add("hidden");

    userName = nameInputEl.value;
    console.log(userName);

    startEl.classList.add("hidden");

    gameBoard = [...board].sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    matchedCards = [];
    moves = 0;
    matched = 0;
    winner = false;
    lockBoard = false;
    gameLevel = (Number(board.length) / 2);
    messageEl.textContent = `😊: Good luck, ${userName}!`;

    render()

}



function handleClick(event) {

    if (lockBoard) return;

    const cardIndex = Number(event.target.id);

    if (firstCard === cardIndex) {
        console.log("SAME CARD");
        return;
    }

    moves = moves + 1;

    if (matchedCards.includes(cardIndex)) return;

    if (firstCard === null || firstCard === undefined) {
        firstCard = cardIndex;

        render();

        return;
    }

    else if (secondCard === null || secondCard === undefined) {

        secondCard = cardIndex;

        render();

        lockBoard = true;

        if (gameBoard[firstCard] === gameBoard[secondCard]) {
            matchedCards.push(firstCard);
            matchedCards.push(secondCard);
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }

        else {

            setTimeout(() => {

                firstCard = null;
                secondCard = null;
                lockBoard = false;

                render();

            }, 400);
        }
    }

    matched = Number(matchedCards.length / 2);

    checkForWinner();
    updateMessage()
    render();

}



function checkForWinner() {
    if (matchedCards.length === board.length) {
        winner = true;
        console.log("WINNER!");
        winScrnEl.classList.remove('hidden')
        return;
    }
}

/* initGame() */

/*----------------------------- Event Listeners -----------------------------*/

cardsEls.forEach((card) => {
    card.addEventListener("click", handleClick);
})

playAgnEl.addEventListener("click", initGame);
resetBtnEl.addEventListener("click", initGame);
startBtnEl.addEventListener("click", initGame);

startBtnEl.disabled = true;
nameInputEl.addEventListener("input", () => {
    startBtnEl.disabled = nameInputEl.value.trim() === "";
});