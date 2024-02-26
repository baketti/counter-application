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
let values = {};

show_settings_icon.addEventListener("click", () => {
    if(isTimerActive) return;
    settingsDialog.showModal();
});

settingsDialog.addEventListener("close", (e) => {
    if(settingsDialog.returnValue == "cancel") return;
    values = JSON.parse(settingsDialog.returnValue);
    if(values.mode === "Multiple"){
        switchToMultiMode();
    }else if(values.mode === "Single"){
        switchToSingleMode();
    }
    if(values.shopping){
        Counter.shoppingMode = true;
        updateCountersMode();
        single_counter_symbol.textContent = "$";
        single_counter_count.textContent < 0 ? single_counter_count.textContent = 0 : null;
    }else{
        Counter.shoppingMode = false;
        updateCountersMode();
        single_counter_symbol.textContent = "";
    }
    values.timer ? timer.style.display = "flex" : timer.style.display = "none";
    values.timer ? min = values.timerMinutes : min = null;
    time.innerHTML = timerFormatter(min,sec);
});

confirm_settings_btn.addEventListener("click", (event) => {
    event.preventDefault(); 
    const shopping = shoppingCheckbox.checked;
    const timer = timerCheckbox.checked;
    const timerValue = parseInt(setTimerMinutes.value);
    const returnValue = {
        mode:mode_select_el.value || null,
        shopping: shopping,
        timer: timer,
        timerMinutes: timerValue || null
    };
    if(timer && !returnValue.timerMinutes) return;
    settingsDialog.close(JSON.stringify(returnValue));
});

show_reset_dialog.addEventListener("click", () => {
    if(isTimerActive) return;
    resetDialog.showModal();
})

confirm_reset_btn.addEventListener("click", (event) => {
    event.preventDefault();
    Counter.resetAll();
    const removeAllCheckbox = removeAllCounters.checked
    if(removeAllCheckbox){
        Counter.deleteAll();
        renderingCounter();
    }
    resetDialog.close()
});

shoppingCheckbox.addEventListener('change', () => {
    if (shoppingCheckbox.checked) {
        timerCheckbox.disabled = true;
    } else {
        timerCheckbox.disabled = false;
    }
});

timerCheckbox.addEventListener('change', () => {
    if (timerCheckbox.checked) {
        shoppingCheckbox.disabled = true;
        setTimerLabel.style.display = "block";
    } else {
        shoppingCheckbox.disabled = false;
        setTimerLabel.style.display = "none";
    }
});

setTimerMinutes.addEventListener('input', (e) => {
    if(e.target.value > 10 || e.target.value < 0){
        e.target.value = "";
        return;
    }
});

watch_rules_icon.addEventListener("click", () => {
    if(isTimerActive) return;
    rulesDialog.showModal();
});

watch_results_icon.addEventListener("click", () => {
    timerEndedDialog.close();
    if(isResultsOpen) return;
    isResultsOpen = true;
    document.querySelector('.results').classList.toggle('open');
})