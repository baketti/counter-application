/* MUTIPLE COUNTER CLICKS HANDLER */
const addCounter = document.getElementById('addNewCounter');
const table = document.querySelector('table');
    //it handles the click events on the multiple counters container
    //only for the settings menu and the close icon of every counters
    counters_container.addEventListener('click', (e) => {  
        const target = e.target;
        //we want to continue only if the target is an icon and it is not in the async section
        if(target.tagName !== 'I' && !target.closest(".async-btn")) return;
        const counter = target.closest('.counter');
        //a plus security check
        if(!counter) return;
        const id = counter.dataset.id;//we get the id of the current counter
        //if the user clicks on the close icon 
        if (target.classList.contains("close-icon")) {
            //we want to delete the counter
            Counter.deleteById(parseInt(id));
        }
        //if the user clicks on the intern settings icon
        else if(target.classList.contains("settings")){
            //we take the settings element of the current counter
            const settings = target.nextElementSibling;
            if(!settings) return;
            //we toggle the settings menu icon
            toggleSettingsMenuIcon(target,settings)
        }
    })
    /*-------------------------------------
        ADD NEW COUNTER EVENT HANDLER
    --------------------------------------- */
    addCounter.addEventListener('click',() => {
        //if the counters are already 16 we want to return
        if(Counter.counters.length >= 16){
            return;
        }
        //we want to render a new counter
        renderingCounter();
    })
    /* -------------------------------
      CLICK HANDLER TO SORT THE TABLE
    ---------------------------------*/   
    table.onclick = function(e) {
        if (e.target.tagName !== 'I') return;
        //if the user clicks on one of the arrow icons 
        let th = e.target.closest('th');
        const order = e.target.classList.contains("fa-arrow-down");
        //we want to sort the table based on the clicked column 
        sortResults(th.cellIndex, th.dataset.type, order);
    };