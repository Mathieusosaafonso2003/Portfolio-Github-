window.onload = () => {
  const music = document.getElementById('background-music');
  music.play(); 
};

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('check-button');
const messageDiv = document.getElementById('message');
const attemptsText = document.getElementById('attempts');

checkButton.addEventListener('click', () => {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    messageDiv.textContent = 'Por favor, introduce un número entre 1 y 100.';
    messageDiv.style.color = '#d9534f';
    return;
  }

  attempts++;

  if (userGuess === randomNumber) {
    messageDiv.textContent = `¡Felicidades! Adivinaste el número en ${attempts} intentos.`;
    messageDiv.style.color = '#28a745';
    attemptsText.textContent = '¡Juego Terminado!';
  } else if (attempts >= maxAttempts) {
    messageDiv.textContent = `¡Mi niño! El número era ${randomNumber}. ¡No sigas intentando!`;
    messageDiv.style.color = '#d9534f';
    attemptsText.textContent = '¡Se acabaron los intentos!';
  } else if (userGuess < randomNumber) {
    messageDiv.textContent = 'Demasiado bajo chiquillo, es más grande.';
    messageDiv.style.color = '#ffc107';
  } else {
    messageDiv.textContent = 'Adonde vas, vete más abajo.';
    messageDiv.style.color = '#ffc107';
  }

  attemptsText.textContent = `Intentos: ${attempts} de ${maxAttempts}`;
});
