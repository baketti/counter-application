/* MUTIPLE COUNTER CLICKS HANDLER */
const counters = document.querySelector('.counters');
const addCounter = document.getElementById('addNewCounter');
const table = document.querySelector('table');
const results = document.querySelector('table tbody');

    counters.addEventListener('click', (e) => {  
        const target = e.target;
        if(target.tagName !== 'I' && !target.closest(".async-btn")) return;
        const counter = target.closest('.counter');
        if(!counter) return;
        const id = counter.dataset.id;
        if (target.classList.contains("close-icon")) {
            Counter.deleteById(parseInt(id));
        }
        else if(target.classList.contains("settings")){
            const settings = target.nextElementSibling;
            if(!settings) return;
            toggleSettingsMenuIcon(target,settings)
        }
    })
    /*-------------------------------------
        ADD NEW COUNTER EVENT HANDLER
    --------------------------------------- */
    addCounter.addEventListener('click',() => {
        if(Counter.counters.length >= 10){
            return;
        }
        renderingCounter();
    })
    /* -------------------------------
      CLICK HANDLER TO SORT THE TABLE
    ---------------------------------*/   
    table.onclick = function(e) {
        if (e.target.tagName !== 'I') return;
        let th = e.target.closest('th');
        const order = e.target.classList.contains("fa-arrow-down")
        sortResults(th.cellIndex, th.dataset.type, order);
    };