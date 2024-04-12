document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
    startGame();
});

function startGame() {
    const gameArea = document.getElementById('gameArea');
    const numberSelect = document.getElementById('numberSelect');
    const instruction = document.getElementById('instruction');
    const tempoSlider = document.getElementById('tempoSlider');
    const bpmDisplay = document.getElementById('bpmDisplay');
    let score = 0;
    let gameTimer = 40;

    document.getElementById('scoreBoard').textContent = 'Score: 0';
    document.getElementById('timer').textContent = `Time Left: ${gameTimer}s`;

    // Set the tempo slider properties correctly
    tempoSlider.min = 40; // Minimum BPM
    tempoSlider.max = 120; // Maximum BPM
    tempoSlider.value = 60; // Starting BPM

    bpmDisplay.textContent = `${tempoSlider.value} BPM`; // Display starting BPM
    instruction.textContent = `Click only multiples of the number: ${numberSelect.value}`; // Set initial instruction

    function updateBPMDisplay(bpm) {
        bpmDisplay.textContent = `${bpm} BPM`;
        clearInterval(numberInterval);
        numberInterval = setInterval(dropNumber, 60000 / bpm);
        console.log(`BPM updated: ${bpm}, Interval: ${60000 / bpm}`);
    }

    tempoSlider.oninput = () => {
        updateBPMDisplay(tempoSlider.value);
    };

    function dropNumber() {
        const numberValue = Math.floor(Math.random() * 144) + 1;
        gameArea.textContent = numberValue;
        gameArea.style.color = 'green';  // Always green regardless of correctness
        console.log(`Dropped number: ${numberValue}`);
    }

    let numberInterval = setInterval(dropNumber, 60000 / parseInt(tempoSlider.value, 10));
    console.log(`Initial drop interval set at: ${60000 / parseInt(tempoSlider.value, 10)}`);

    let timerInterval = setInterval(() => {
        gameTimer--;
        document.getElementById('timer').textContent = `Time Left: ${gameTimer}s`;
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            clearInterval(numberInterval);
            alert('Game Over! Your score was: ' + score);
            console.log('Game Over!');
        }
    }, 1000);

    gameArea.addEventListener('click', () => {
        const currentNumber = parseInt(gameArea.textContent);
        if (currentNumber % parseInt(numberSelect.value, 10) === 0) {
            score++;
            document.getElementById('scoreBoard').textContent = 'Score: ' + score;
            console.log(`Score updated: ${score}`);
        }
    });

    dropNumber();  // Drop the first number immediately when the game starts
}
