/* TIMER CLICK EVENTS HANDLER => START - STOP - RESET - CLOSE */
const reset = document.getElementById('resetTimer');
const closeTimer = document.getElementById("closeTimer");

let [min,sec] = [undefined,0];

let timerId = null;
stopTimer.disabled = true;

startTimer.addEventListener('click', () => {
    if(timerId !== null){
        clearInterval(timerId)
    }
    timerId = setInterval(runTimer,1000)
    stopTimer.checked = false;
    startTimer.disabled = true;
    stopTimer.disabled = false;
    isTimerActive = true;
});

stopTimer.addEventListener("click", () => {
    startTimer.checked = false;
    startTimer.disabled = false;
    stopTimer.disabled = true;
    isTimerActive = false;
    clearInterval(timerId);
});

reset.addEventListener("click", () => {
    clearInterval(timerId);
    stopTimer.checked = false;
    startTimer.checked = false;
    startTimer.disabled = false;
    stopTimer.disabled = true;
    isTimerActive = false;
    [min,sec] = [values.timerMinutes,0];
    time.innerHTML = timerFormatter(min,sec);
});

closeTimer.addEventListener("click", () => {
    if(isTimerActive) return;
    timer.style.display = "none";
    setTimerLabel.style.display = "none";
    timerCheckbox.checked = false;
    shoppingCheckbox.disabled = false;
    stopTimer.checked = false;
    [min,sec] = [undefined,0];
    time.innerHTML = timerFormatter(min,sec);  
});