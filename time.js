let time = 0;
let isRunning = false;

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');

function updateTimeDisplay() {
    timeDisplay.textContent = 
        `You have ${100 - time} seconds left.`;
}

// function startReset() {
//     if (!isRunning) {
//         isRunning = true;
//         startButton.style = "display: none;";
//         resetButton.style = "display: block;";
//         interval = setInterval(() => {
//             time++;  // Update every second
//             updateTimeDisplay();
//         }, 1000);
//     } else {
//         time = 0;
//         timeDisplay.textContent = time;
//         isRunning = false;
//         startButton.style = "display: block;";
//         resetButton.style = "display: none;";
//         clearInterval(interval);
//     }
// }

function start(){
    if(DIFFICULTY) {
        setState("GAME");
        interval = setInterval(() => {
            time++;  // Update every second
            updateTimeDisplay();
        }, 1000);
    }
}


function reset() {
    setState("MENU");
    time = 0;
    clickCount = 0;
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