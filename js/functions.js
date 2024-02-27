/* FUNCTION FOR BUILDING AN ENTIRE COUNTER SECTION 
   => IT RETURNS A NEW INSTANCE OF COUNTER CLASS */
function createNewCounter(){
    let section = document.createElement('section');
    const newCounter = new Counter(section);
    newCounter.build(HTML_COUNTER_ELEMENT);
    return newCounter;
}
/* FUNCTION TO RUN COUNTER CREATION: 
   - APPEND IT IN THE RIGHT POSITION
   - UPDATE THE NEW COUNTER MODE
   - ADD THE NEW COUNTER TO THE RESULTS TABLE */
function renderingCounter() {
    const counter = createNewCounter();
    counter.render(counters_container,lastCounter);
    counter.updateCounterMode();
    addCounterToResults(counter);
}
/* FUNCTION TO ADD A COUNTER TO THE RESULTS TABLE */
function addCounterToResults(counter) {
    const result = document.createElement('tr');
    result.setAttribute('data-id',counter.id);
    const nome = document.createElement('td');
    const value = document.createElement('td');
    nome.textContent = counter.name;
    value.textContent = counter.count;
    result.appendChild(nome);
    result.appendChild(value);
    results.appendChild(result);
    total_span.textContent = Counter.getTotalCount(); 
}
/* FUNCTION TO CHANGE THE INTERN COUNTER SETTINGS ICON WHEN CLICKED */
function toggleSettingsMenuIcon(target,settings){
    settings.hidden = !settings.hidden;
    settings.hidden ? target.classList.remove('fa-times') : 
    target.classList.add('fa-times');
    target.classList.toggle('fa-ellipsis-vertical', settings.hidden);
}
/* FUNCTION TO OPEN/CLOSE THE RESULTS TABLE */
function toggleTableResults() {
    counters_results.classList.toggle('open');
    const opened = counters_results.classList.contains("open");
    isResultsOpen = opened ? true : false;
}
/* FUNCTION TO CHANGE FROM MULTIPLE TO SINGLE MODE */
function switchToSingleMode(){
    if (main.contains(counters_container)) {
        main.removeChild(counters_container);
        listIcon.hidden = !listIcon.hidden;
        resetIcon.hidden = !resetIcon.hidden;
        multipleCountersMode = false;
    }
    main.appendChild(singleCounterSection);
}
/* FUNCTION TO CHANGE FROM SINGLE TO MULTIPLE MODE */
function switchToMultiMode(){
    if (main.contains(singleCounterSection)) {
        main.removeChild(singleCounterSection);
        listIcon.hidden = !listIcon.hidden;
        resetIcon.hidden = !resetIcon.hidden;
        multipleCountersMode = true;
    };
    //this check is to ensure that the multiple mode UI is how it should be
    if(Counter.counters.length === 0){
        renderingCounter();
    };
    main.appendChild(counters_container);
};
/* FUNCTION TO UPDATE/REMOVE THE SHOPPING MODE OF ALL COUNTERS */
function updateCountersMode () {
    const resultTitle = document.getElementById("resultsTitle");
    const totalResult = document.querySelector(".total-result");
    const th = document.querySelectorAll('th span');
    resultTitle.textContent = Counter.shoppingMode ? "Shopping list" : "Counters results";
    th[0].textContent = Counter.shoppingMode ? "Product" : "Name";
    th[1].textContent = Counter.shoppingMode ? "Price" : "Value";
    Counter.shoppingMode ? totalResult.hidden = false : totalResult.hidden = true;
    const counters = Counter.getCountersList();
    for(let counter of counters){
        const symbol = counter.element.querySelector('.symbol');
        const number = counter.element.querySelector('.number');
        symbol.textContent = Counter.shoppingMode ? "$" : "";
        counter.count = Counter.shoppingMode && counter.count < 0 ? 0 : counter.count;
        number.textContent = counter.count;
    };
    const total_count = Counter.getTotalCount();
    total_span.textContent = total_count;
};
/* --------------------------------- 
        PROGRESS BAR LOGIC
--------------------------------- */
function move(bar,time) {
    let i = 0;
    if (i == 0) {
        i = 1;
        let width = 0;
        let totalTime = parseInt(`${time}000`);
        let increment = 100;
        let timePerIncrement = totalTime / increment;
        let id = setInterval(progress, timePerIncrement);

        function progress() {
            if (width >= 100) {
                clearInterval(id);
                bar.style.width = "0%";
                bar.innerHTML = "0%";
                i = 0;
            }else {
                width++;
                bar.style.width = width + "%";
                bar.innerHTML = width  + "%";
            };
        };
    };
};
/* -----------------------
    TIMER FUNCTIONS
------------------------- */
function runTimer() {
    const label_results = document.getElementById('timer-label-results');
    if (sec == 0 && min == 0) {
        clearInterval(timerId);
        stopTimer.checked = false;
        startTimer.checked = false;
        startTimer.disabled = false;
        stopTimer.disabled = true;
        isTimerActive = false;
        timerEndedDialog.showModal();
        if(multipleCountersMode){
            label_results.style.display = "flex";
        }else{
            label_results.style.display = "none";
        };
    }else if(sec == 0 && min > 0) {
        min--;
        sec = 59;
    }else{
        sec--;
    };
    time.innerHTML = timerFormatter(min,sec);
};

function timerFormatter (min,sec) {
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return min + " : " + sec;
};
/* -------------------------------
    FUNCTION FOR TABLE SORTING 
----------------------------------*/
function sortResults(colNum, type, descOrder) { 
    let rows = Array.from(results.rows);
    let compare;
    switch (type) {
        case 'number':
        compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
        case 'string':
        compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
        };
        break;
    }
    descOrder ? rows.sort(compare).reverse() : rows.sort(compare);
    results.append(...rows);
};