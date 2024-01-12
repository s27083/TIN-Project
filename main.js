console.log("main.js loaded");

const MOVE = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors",
};

const MOVE_PL = {
  ROCK: "kamień",
  PAPER: "papier",
  SCISSORS: "nożyce",
};

const RESULT = {
  WIN: "win",
  DRAW: "draw",
  LOSE: "lose",
};

const WINNERS = {
  PLAYER: "player",
  COMPUTER: "computer",
};

const COMPUTER_MOVE = {
  ROCK: "&#x1F44A;",
  PAPER: "&#x1f590;",
  SCISSORS: "&#x270c;",
};

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let   gameOver = false;
  const buttons = document.querySelectorAll("button");
  const resetButton = document.querySelector("#reset");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (gameOver) return;
      const playerSelection = button.id;
      const computerSelection = computerPlay();
      console.log(computerSelection);
      const result = playRound(playerSelection, computerSelection);
      console.log(result);
      if (result.winner === WINNERS.PLAYER) {
        playerScore++;
      } else if (result.winner === WINNERS.COMPUTER) {
        computerScore++;
      }
      if (playerScore === 20 || computerScore === 20) {
        const winner = playerScore === 20 ? "Gracz" : "Komputer";
        playerScore = 0;
        computerScore = 0;
        createConfetti();
        updateScore({ message: `Wygrywa: ${winner} !` }, 0, 0);
        gameOver = true;
        return
      }
      updateComputerMove(computerSelection);
      updateScore(result, playerScore, computerScore);
    });
  });

  resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    stopConfetti();
    updateScore({ message: "Grajmy!" }, playerScore, computerScore);
  }
  );

  function computerPlay() {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        return MOVE.ROCK;
      case 1:
        return MOVE.PAPER;
      case 2:
        return MOVE.SCISSORS;
    }
  }
}
function computerPlay() {
  const random = Math.floor(Math.random());
  switch (random) {
    case 0:
      return MOVE.ROCK;
    case 1:
      return MOVE.PAPER;
    case 2:
      return MOVE.SCISSORS;
  }
}
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return { winner: null, message: "Remis!" };
  } else if (
    (playerSelection === MOVE.ROCK && computerSelection === MOVE.SCISSORS) ||
    (playerSelection === MOVE.PAPER && computerSelection === MOVE.ROCK) ||
    (playerSelection === MOVE.SCISSORS && computerSelection === MOVE.PAPER)
  ) {
    return {
      winner: WINNERS.PLAYER,
      message: "Wygrywasz " + MOVE_PL[playerSelection.toUpperCase()] + " bije " + MOVE_PL[computerSelection.toUpperCase()] + "!",
    };
  } else {
    return {
      winner: WINNERS.COMPUTER,
      message: "Przegrywasz " + MOVE_PL[computerSelection.toUpperCase()] + " bije " + MOVE_PL[playerSelection.toUpperCase()] + "!",
    };
  }
}

function updateScore(result, playerScore, computerScore) {
  const resultDiv = document.querySelector("#gameResult");
  resultDiv.textContent = result.message;
  const playerScoreDiv = document.querySelector("#playerScore");
  playerScoreDiv.textContent = playerScore;
  const computerScoreDiv = document.querySelector("#computerScore");
  computerScoreDiv.textContent = computerScore;
  
}

function updateComputerMove(computerSelection) {
  const computerMoveDiv = document.querySelector("#computerMove");
  computerMoveDiv.innerHTML = COMPUTER_MOVE[computerSelection.toUpperCase()];
}

function createConfetti() {
  const confettiContainer = document.getElementById('confetti');
  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.left = `${Math.random() * 100}vw`;
    confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(confettiPiece);
  }
}
function stopConfetti() {
  const confettiContainer = document.getElementById('confetti');
  while (confettiContainer.firstChild) {
    confettiContainer.firstChild.remove();
  }
}
game();
