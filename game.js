const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
let score = 0;

function moveTarget() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    target.style.top = `${y}px`;
    target.style.left = `${x}px`;
}

target.addEventListener('click', () => {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
    moveTarget();
});

setInterval(moveTarget, 1000);
