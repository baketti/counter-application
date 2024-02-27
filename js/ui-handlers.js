/* IT HANDLES UI CHANGES:
    - AT THE BEGINNING, IT REMOVES THE MULTIPLE SECTION TO SHOW ONLY THE SINGLE COUNTER
    - IT LET USERS TO CHANGE MODE, BUT ONLY IF THE TIMER IS NOT ACTIVE
    - IT LET USERS TO OPEN OR CLOSE THE RESULTS
*/
const singleMode = document.querySelector('.single-mode');
const multipleMode = document.querySelector('.multiple-mode');

    window.addEventListener("DOMContentLoaded",() => {
        main.removeChild(counters_container);
    });

    listIcon.onclick = () => {
        toggleTableResults();
    };

    closeListIcon.onclick = () => {
        toggleTableResults();
    };

    singleMode.addEventListener('click', () => {
        if(isTimerActive) return;
        switchToSingleMode();
    });
    
    multipleMode.addEventListener('click', () => {
        if(isTimerActive) return;
        switchToMultiMode();
    });