const gameSummary = {
    gameNumbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}
const game = {
    playerHand: "",
    aiHand: ""
}
const imgs = document.querySelectorAll("img");
const btn = document.querySelector(".start");

function choiceHand() {
    game.playerHand = this.dataset.option;
    imgs.forEach((img) => {
        img.style.boxShadow = "";
    })
    this.style.boxShadow = "0 0 0 4px yellow";
}

imgs.forEach((img) => {
    img.addEventListener('click', choiceHand);
})


function aiChoice() {
   const index = Math.floor(Math.random() * imgs.length);
   game.aiHand = imgs[index].dataset.option;
   return game.aiHand;
}

function gameResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === 'kamień' && ai === 'nożyczki') || (player === 'papier' && ai === 'kamień') || 
    (player === 'nożyczki' && ai === 'papier')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function publishGame(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    const score = document.querySelector('[data-summary="who-win"]');
    if (result === 'win') {
        score.textContent = "Wygrałeś";
        score.style.color = "green";
        document.querySelector(".wins span").textContent = ++gameSummary.wins;
    } else if (result === 'loss') {
        score.textContent = "Przegrałeś";
        score.style.color = "red";
        document.querySelector(".losses span").textContent = ++gameSummary.losses;
    } else {
        score.textContent = "Remis"
        score.style.color = "yellow";
        document.querySelector(".draws span").textContent = ++gameSummary.draws;
    }
    document.querySelector(".numbers span").textContent = ++gameSummary.gameNumbers;
}

function endGame() {
    imgs.forEach((img) => {
        img.style.boxShadow = "";
    })
    game.playerHand = "";
    game.aiHand = "";
}


function startGame() {
    if (!game.playerHand) {
        return alert("Wybierz dłoń!");
    }
    game.aiHand = aiChoice();
    const result = gameResult(game.playerHand, game.aiHand);
    publishGame(game.playerHand, game.aiHand, result);
    endGame();
}

btn.addEventListener('click', startGame);
