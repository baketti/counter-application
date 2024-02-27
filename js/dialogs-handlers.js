/* APPLICATION DIALOGS HANDLER */
const show_settings_icon = document.getElementById("settings-icon-btn");
const settingsDialog = document.getElementById("settingsDialog");
const resetDialog = document.getElementById("resetDialog");
const show_reset_dialog = document.getElementById("showResetDialog");
const mode_select_el = document.getElementById("modeSelect");
const confirm_settings_btn = settingsDialog.querySelector("#confirmBtn");
const confirm_reset_btn = document.querySelector("#confirm-btn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const single_counter_symbol = document.querySelector(".symbol");
const single_counter_count = document.querySelector(".number");
const timer = document.querySelector(".timer-container");
const setTimerLabel = document.getElementById("setTimerLabel");
const setTimerMinutes = document.getElementById("setTimer");
const watch_results_icon = document.querySelector(".list-icon-btn");
const watch_rules_icon = document.getElementById("rules-icon-btn");
const rulesDialog = document.getElementById("rulesDialog");

const [shoppingCheckbox,timerCheckbox,removeAllCounters] = checkboxes;
let values = {};//this object will store the settings dialog values

show_settings_icon.addEventListener("click", () => {
    //it opens the settings dialog if the timer is not active
    if(isTimerActive) return;
    settingsDialog.showModal();
});

settingsDialog.addEventListener("close", (e) => {
    //if the user clicks on the cancel button we want to return
    if(settingsDialog.returnValue == "cancel") return;
    //Parse the return value from the settings dialog and we store it in the values object
    values = JSON.parse(settingsDialog.returnValue);
    //Update the mode based on the settings dialog return value
    //Multiple or Single
    if(values.mode === "Multiple"){
        switchToMultiMode();
    }else if(values.mode === "Single"){
        switchToSingleMode();
    };
    //Shopping mode or not
    if(values.shopping){
        Counter.shoppingMode = true;
        updateCountersMode();
        single_counter_symbol.textContent = "$";
        single_counter_count.textContent < 0 ? single_counter_count.textContent = 0 : null;
    }else{
        Counter.shoppingMode = false;
        updateCountersMode();
        single_counter_symbol.textContent = "";
    };
    //Timer mode or not
    values.timer ? timer.style.display = "flex" : timer.style.display = "none";
    values.timer ? min = values.timerMinutes : min = null;
    time.innerHTML = timerFormatter(min,sec);
});

confirm_settings_btn.addEventListener("click", (event) => {
    //if the user clicks on the confirm button
    event.preventDefault(); 
    const shopping = shoppingCheckbox.checked;
    const timer = timerCheckbox.checked;
    const timerValue = parseInt(setTimerMinutes.value);
    //Set the return value of the settings dialog based on the user choices
    const returnValue = {
        mode:mode_select_el.value || null,
        shopping: shopping,
        timer: timer,
        timerMinutes: timerValue || null,
    };
    //if the user choose the timer mode without setting minutes we want to return
    if(timer && !returnValue.timerMinutes) return;
    //Finally settings dialog will close and will store the return value object
    settingsDialog.close(JSON.stringify(returnValue));
});

show_reset_dialog.addEventListener("click", () => {
    //it opens the reset dialog if the timer is not active
    if(isTimerActive) return;
    resetDialog.showModal();
})

confirm_reset_btn.addEventListener("click", (event) => {
    //if the user clicks on the confirm reset button
    event.preventDefault();
    //all counters will be 0
    Counter.resetAll();
    const removeAllCheckbox = removeAllCounters.checked
    //if the user wants to remove all counters
    if(removeAllCheckbox){
        //all counters will be removed
        Counter.deleteAll();
        //rendering the initial state
        renderingCounter();
    }
    resetDialog.close()
});

shoppingCheckbox.addEventListener('change', () => {
    //if the user clicks on the shopping checkbox
    if (shoppingCheckbox.checked) {
        //timer checkbox will be disabled
        timerCheckbox.disabled = true;
    } else {
        //otherwise timer checkbox will be enabled
        timerCheckbox.disabled = false;
    }
});

timerCheckbox.addEventListener('change', () => {
    //if the user clicks on the timer checkbox
    if (timerCheckbox.checked) {
        //shopping checkbox will be disabled
        shoppingCheckbox.disabled = true;
        //the input field for the timer will be displayed
        setTimerLabel.style.display = "block";
    } else {
        //otherwise shopping checkbox will be enabled
        shoppingCheckbox.disabled = false;
        //the input field for the timer will be hidden
        setTimerLabel.style.display = "none";
    }
});

setTimerMinutes.addEventListener('input', (e) => {
    //it is to prevent user to set a negative time or a time greater than 10 minutes
    if(e.target.value > 10 || e.target.value < 0){
        e.target.value = "";
        return;
    }
});

watch_rules_icon.addEventListener("click", () => {
    //it opens the rules dialog if the timer is not active
    if(isTimerActive) return;
    rulesDialog.showModal();
});

watch_results_icon.addEventListener("click", () => {
    //it handles the list icon on the timer ended dialog
    //if clicked it will close the timer ended dialog
    timerEndedDialog.close();
    //if the results dialog is already open we want to do nothing
    if(isResultsOpen) return;
    //otherwise we want also to open the results dialog
    isResultsOpen = true;
    document.querySelector('.results').classList.toggle('open');
})