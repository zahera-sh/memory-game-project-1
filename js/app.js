/*------------------------ Cached Element References ------------------------*/

const cardsEls = document.querySelectorAll(".crds");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/* console.log(cardsEls)
console.log(messageEl)
console.log(resetBtnEl) */

/*-------------------------------- Constants --------------------------------*/

const emojis: ["🐚", "🫧", "🦋", "🌸", "🌷", "🍇", "🍉", "🍊"]

/*---------------------------- Variables (state) ----------------------------*/

let firstCard, secondCard;
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let winner = false;

/*-------------------------------- Functions --------------------------------*/


/*----------------------------- Event Listeners -----------------------------*/
