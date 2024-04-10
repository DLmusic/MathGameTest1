const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const speedSlider = document.getElementById('speedSlider');
let score = 0;
let moveInterval = 1000; // Initial speed set to 1000 milliseconds

function moveTarget() {
    const x = Math.random() * (window.innerWidth - target.offsetWidth);
    const y = Math.random() * (window.innerHeight - target.offsetHeight);
    target.style.top = `${y}px`;
    target.style.left = `${x}px`;
}

target.addEventListener('click', () => {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
    moveTarget();
});

// Update the moveInterval based on the slider's value
speedSlider.addEventListener('input', () => {
    moveInterval = speedSlider.value;
    clearInterval(moving);
    moving = setInterval(moveTarget, moveInterval);
});

// Start moving the target
let moving = setInterval(moveTarget, moveInterval);
