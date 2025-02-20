const categories = {
  animes: ['Naruto', 'Dragon Ball Z', 'One Piece', 'Attack on Titan', 'Death Note', 'Fullmetal Alchemist', 'Bleach', 'My Hero Academia', 'Neon Genesis Evangelion', 'Sword Art Online'],
  starWars: ['Darth Vader', 'Yoda', 'Obi-Wan', 'Luke', 'Anakin', 'Han', 'Leia', 'Chewbacca', 'R2-D2', 'C-3PO'],
  videojuegos: ['Wii Sports', 'Super Smash Bros Brawl', 'Grand Theft Auto San Andreas', 'Pokemon Diamond Pearl', 'The Sims 2', 'New Super Mario Bros', 'Mario Kart Wii', 'Halo 3', 'Gran Turismo 4', 'Call of Duty Modern Warfare 2']
};

let selectedCategory = '';
let selectedWord = '';
let displayedWord = [];
let attempts = 6;
let guessedLetters = [];

const categorySelect = document.getElementById('category');
const startButton = document.getElementById('start-button');
const gameContent = document.getElementById('game-content');
const wordContainer = document.getElementById('word-container');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const messageDiv = document.getElementById('message');
const attemptsText = document.getElementById('attempts');
const hangmanImage = document.getElementById('hangman-image');

startButton.addEventListener('click', () => {
  selectedCategory = categorySelect.value;
  selectedWord = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)];
  displayedWord = Array(selectedWord.length).fill('_');
  attempts = 6;
  guessedLetters = [];
  
  document.getElementById('category-select').style.display = 'none';
  gameContent.style.display = 'block';
  
  updateWordDisplay();
});

function updateWordDisplay() {
  wordContainer.textContent = displayedWord.join(' ');
}

function checkGameStatus() {
  if (attempts <= 0) {
    messageDiv.textContent = `¡Perdiste! La palabra era "${selectedWord}".`;
    messageDiv.style.color = '#d9534f';
    hangmanImage.innerHTML = `<img src="https://i.redd.it/e6lvztw0zq2b1.jpg" alt="Perdiste" style="width: 300px; height: auto; display: block; margin: 0 auto;" />`;
    letterInput.disabled = true;
    guessButton.disabled = true;
  } else if (!displayedWord.includes('_')) {
    messageDiv.textContent = '¡Ganaste! Adivinaste la palabra.';
    messageDiv.style.color = '#28a745';
  }
}

guessButton.addEventListener('click', () => {
  const guessedLetter = letterInput.value.toLowerCase();

  if (!guessedLetter || guessedLetters.includes(guessedLetter)) {
    messageDiv.textContent = 'Por favor, introduce una letra válida.';
    return;
  }

  guessedLetters.push(guessedLetter);

  if (selectedWord.toLowerCase().includes(guessedLetter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toLowerCase() === guessedLetter) {
        displayedWord[i] = selectedWord[i];
      }
    }
  } else {
    attempts--;
  }

  updateWordDisplay();
  attemptsText.textContent = `Intentos restantes: ${attempts}`;
  checkGameStatus();
  letterInput.value = '';
});

updateWordDisplay();
