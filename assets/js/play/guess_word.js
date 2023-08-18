let currentWordIndex = -1;
let timer;

let words = {
    animals: [
        "Elephant", "Lion", "Giraffe", "Tiger", "Zebra", "Monkey", "Rhinoceros", "Hippopotamus",
        "Penguin", "Kangaroo", "Panda", "Koala", "Gorilla", "Leopard", "Cheetah", "Cobra", "Crocodile",
        "Polar Bear", "Giraffe", "Gazelle", "Camel", "Llama", "Dolphin", "Octopus",
        "Kangaroo", "Panda", "Koala", "Gorilla", "Leopard", "Cheetah"
    ],
    movies: [
        'sholay', 'dilwale', 'bahubali', 'padmaavat', 'dangal', 'avatar', 'titanic', 'inception', 'jaws', 'casablanca',
        "Titanic", "Avatar", "Inception", "The Matrix", "Jurassic Park", "The Godfather", "Pulp Fiction",
        "Star Wars", "The Shawshank Redemption", "Fight Club", "Lord of the Rings",
        "Forrest Gump", "The Dark Knight", "Harry Potter", "Jaws", "Casablanca", "The Lion King", "Indiana Jones", "The Avengers", "Spider-Man",
        "Toy Story", "Terminator", "Back to the Future", "The Wizard of Oz"
    ],
    things: [
        "car", "watch", "book", "phone", "chair", "table", "laptop", "bicycle", "umbrella", "camera", "glasses", "pen", "key", "shoes", "bag",
        "hat", "wallet", "lamp", "remote", "mirror", "clock", "scissors", "brush",
        "hammer", "knife", "candle", "guitar", "television", "radio", "microphone"
    ],

    fruits: [
        "Apple", "Banana", "Orange", "Mango", "Grapes", "Strawberry", "Watermelon", "Pineapple",
        "Kiwi", "Pear", "Peach", "Plum", "Cherry", "Blueberry", "Raspberry", "Cantaloupe", "Pomegranate",
        "Coconut", "Lemon", "Lime", "Apricot", "Blackberry", "Cranberry",
        "Fig", "Guava", "Papaya", "Passion Fruit", "Dragon Fruit", "Lychee",
        "Nectarine"
    ],
    flowers: [
        "Rose", "Lily", "Tulip", "Daisy", "Sunflower", "Orchid", "Carnation", "Daffodil", "Hydrangea",
        "Peony", "Marigold", "Chrysanthemum", "Hibiscus", "Magnolia", "Dandelion", "Zinnia", "Poppy", "Aster", "Bluebell", "Lavender", "Snapdragon",
        "Foxglove", "Forget-Me-Not", "Pansy", "Petunia", "Primrose", "Verbena", "Wisteria", "Azalea", "Crocus"
    ],
};


// ... rest of the JavaScript code ...
let gameTimer;
let gameTime = 60; // Default game time in seconds


function startGame() {
    let selectedCategory = document.getElementById('categorySelect').value;
    wordsList = words[selectedCategory];
    if (!wordsList) {
        alert('Please select a category.');
        return;
    }

    gameTime = parseInt(document.getElementById('timeSelect').value); // Set game time from selection
    updateGameTime(); // Initialize game timer display

    document.getElementById('categorySelectheading').style.display = 'none';
    document.getElementById('categorySelect').style.display = 'none'; // Hide the category select
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('timeSelection').style.display = 'none';
    document.getElementById('timer').style.display = 'block'; // Show the timer
    document.getElementById('buttons').style.display = 'block'; // Show the timer
    gameTimer = setInterval(updateGameTime, 1000); // Start game timer interval
    nextWord();
}

function nextWord() {
    // Generate a random index within the range of wordsList length
    currentWordIndex = Math.floor(Math.random() * wordsList.length);
    updateWordDisplay();
    resetTimer();
    document.getElementById('timerExpired').style.display = 'none';
}


function updateWordDisplay() {
    document.getElementById('wordDisplay').textContent = wordsList[currentWordIndex];
}



let timerInterval;
let timerElement = document.getElementById('timer');

function resetTimer() {
    clearInterval(timerInterval);
    let seconds = 30;
    timerElement.textContent = seconds;
    timerInterval = setInterval(updateTimer, 1000);
    document.body.style.backgroundColor = 'white';
}

function updateTimer() {
    let seconds = parseInt(timerElement.textContent);

    if (seconds <= 10) {
        let color = seconds % 2 === 0 ? 'red' : 'black';
        timerElement.style.color = color;
    }

    seconds--;
    timerElement.textContent = seconds;

    if (seconds === 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').style.display = 'none';
        document.getElementById('timerExpired').style.display = 'block';
        document.body.style.backgroundColor = 'red';
    }
}

resetTimer();

function updateGameTime() {
    gameTime--;
    if (gameTime <= 0) {
        clearInterval(gameTimer); // Stop the game timer when time is up
        endGame();
    }

    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;
    document.getElementById('timeLeft').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

let correctGuesses = 0;
let passCount = 0;

function wordGuessed(correct) {
    document.getElementById('timer').style.display = 'block'; // Show the timer
    document.getElementById('buttons').style.display = 'block'; // Show the timer
    if (correct) {
        correctGuesses++;
    } else {
        passCount++;
    }
    nextWord();
}

function endGame() {
    document.getElementById('categorySelectheading').style.display = 'none';
    document.getElementById('timer').style.display = 'none'; // Hide game timer
    document.getElementById('timerExpired').style.display = 'none';
    document.getElementById('timeLeft').style.display = 'none';
    document.getElementById('wordDisplay').style.display = 'none';
    document.getElementById('buttons').style.display = 'none'; // Hide game buttons
    document.getElementById('gameTimer').style.display = 'none'; // Hide game buttons


    document.getElementById('results').style.display = 'block'; // Show game results

    document.getElementById('correctCount').textContent = correctGuesses;
    document.getElementById('passCount').textContent = passCount;
}