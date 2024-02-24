const gameCards = document.querySelectorAll(".card");
let matchedPairs = 0;
let totalMoves = 0;
let selectedCard1, selectedCard2;
let isDeckDisabled = false;
let gameTimer;
let elapsedSeconds = 0;
let isTimerRunning = false;

function flipSelectedCard({ target: clickedCard }) {
    if (selectedCard1 !== clickedCard && !isDeckDisabled) {
        clickedCard.classList.add("flip");
        if (!selectedCard1) {
            if (!gameTimer) {
                startGameTimer();
            }
            return (selectedCard1 = clickedCard);
        }
        selectedCard2 = clickedCard;
        isDeckDisabled = true;
        let card1ImgSrc = selectedCard1.querySelector(".back-view img").src;
        let card2ImgSrc = selectedCard2.querySelector(".back-view img").src;
        matchSelectedCards(card1ImgSrc, card2ImgSrc);
    }
}

function matchSelectedCards(imgSrc1, imgSrc2) {
    totalMoves++;
    document.getElementById("moves-counter").textContent = `Moves: ${totalMoves}`;

    updateStarRating();

    if (imgSrc1 === imgSrc2) {
        matchedPairs++;
        if (matchedPairs === 8) {
            stopGameTimer();
            displayGameResults();
            setTimeout(() => {
                shuffleGameCards();
            }, 1000);
        }
        selectedCard1.removeEventListener("click", flipSelectedCard);
        selectedCard2.removeEventListener("click", flipSelectedCard);
        selectedCard1 = selectedCard2 = "";
        isDeckDisabled = false;
    } else {
        setTimeout(() => {
            selectedCard1.classList.add("shake");
            selectedCard2.classList.add("shake");
        }, 400);

        setTimeout(() => {
            selectedCard1.classList.remove("shake", "flip");
            selectedCard2.classList.remove("shake", "flip");
            selectedCard1 = selectedCard2 = "";
            isDeckDisabled = false;
        }, 1200);
    }
}

function updateStarRating() {
    let starRating = 3;

    if (totalMoves > 12) {
        starRating = 2;
    }

    if (totalMoves > 18) {
        starRating = 1;
    }

    document.getElementById("star-rating").textContent = `Star Rating: ${starRating}`;
}

function shuffleGameCards() {
    matchedPairs = 0;
    totalMoves = 0;
    isDeckDisabled = false;
    selectedCard1 = selectedCard2 = "";
    resetGameTimer();
    isTimerRunning = false;
    startGameTimer();
    updateStarRating();
    let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    cardNumbers.sort(() => (Math.random() > 0.5 ? 1 : -1));
    gameCards.forEach((card, i) => {
        card.classList.remove("flip");
        let cardImageTag = card.querySelector(".back-view img");
        cardImageTag.src = `images/cat_${cardNumbers[i]}.png`;
        card.addEventListener("click", flipSelectedCard);
    });

    document.getElementById("moves-counter").textContent = "Moves: 0";
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        elapsedSeconds++;
        document.getElementById("timer").textContent = `Time: ${elapsedSeconds}s`;
    }, 1000);
}

function stopGameTimer() {
    clearInterval(gameTimer);
}

function resetGameTimer() {
    clearInterval(gameTimer);
    elapsedSeconds = 0;
    document.getElementById("timer").textContent = "Time: 0s";
}

// function displayGameResults() {
//     alert(`End of The Game!\nMoves: ${totalMoves}\nTime: ${elapsedSeconds}s\nStar Rating: ${getGameStarRating()}`);
// }

// Add this to your JavaScript code
function displayGameResults() {
    const popupContainer = document.getElementById("popup-container");
    const popupMoves = document.getElementById("popup-moves");
    const popupTime = document.getElementById("popup-time");
    const popupStarRating = document.getElementById("popup-star-rating");

    popupMoves.textContent = totalMoves;
    popupTime.textContent = `${elapsedSeconds}s`;
    popupStarRating.textContent = getGameStarRating();

    // Show the pop-up
    popupContainer.style.display = "flex";
}

function closePopup() {
    // Hide the pop-up
    document.getElementById("popup-container").style.display = "none";
}



function getGameStarRating() {
    if (totalMoves <= 12) {
        return 3;
    } else if (totalMoves <= 18) {
        return 2;
    } else {
        return 1;
    }
}

shuffleGameCards();
gameCards.forEach((card) => {
    card.addEventListener("click", flipSelectedCard);
});

function restartGame() {
    stopGameTimer();

    // Hide the restart image
    const restartImage = document.getElementById("restart-button");
    restartImage.style.transition = "opacity 0.5s ease-in-out"; // Add a smooth transition
    restartImage.style.opacity = 0.5; // Set the opacity to your desired value

    shuffleGameCards();
    resetTotalMoves();
    resetStarRating();
    resetGameTimer();

    // Show the restart image after a delay (1 second)
    setTimeout(() => {
        document.getElementById("restart-button").style.opacity = 1;
    }, 1000);

    startGameTimer();
}

function resetTotalMoves() {
    totalMoves = 0;
    document.getElementById("moves-counter").textContent = "Moves: 0";
}

function resetStarRating() {
    document.getElementById("star-rating").textContent = "Star Rating: 3";
}
