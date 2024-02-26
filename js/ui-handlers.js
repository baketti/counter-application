const singleMode = document.querySelector('.single-mode');
const multipleMode = document.querySelector('.multiple-mode');

    listIcon.onclick = () => {
        toggleTableResults();
    }

    closeListIcon.onclick = () => {
        toggleTableResults();
    }
    
    window.addEventListener("DOMContentLoaded",() => {
        main.removeChild(countersSection);
    })

    singleMode.addEventListener('click', () => {
        if(isTimerActive) return;
        switchToSingleMode();
    })
    
    multipleMode.addEventListener('click', () => {
        if(isTimerActive) return;
        switchToMultiMode();
    })