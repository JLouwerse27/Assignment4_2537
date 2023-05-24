let time = 100;
let isRunning = false;

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');

function updateTimeDisplay() {
    timeDisplay.textContent = 
        `You have ${time} seconds left.`;
    if(time < 0) {
        alert("Times up!");
        reset();
    }
}

function start(){
    if(DIFFICULTY) {
        setState("GAME");
        interval = setInterval(() => {
            time--;  // Update every second
            if(Math.random() < 0.05) {
                powerUp();
            }
            updateTimeDisplay();
        }, 1000);
    } 
}

function reset() {
    setState("MENU");
    //time = 0;
    clickCount = 0;
    pairs = 0;
    timeDisplay.textContent = time;
    isRunning = false;
    // startButton.style = "display: block;";
    // resetButton.style = "display: none;";
    clearInterval(interval);
    // setup();
}

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);

// container.style = "display: none;";
//---------might be useful if you need to check the css of an element---------------------
    // if ($(container).css("display") == "none") {
    //     // true
    // }