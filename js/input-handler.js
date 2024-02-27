/* IT HANDLES ALL INPUT FIELDS OF EVERY COUNTERS */
const results = document.querySelector('table tbody');
    /* MULTI-COUNTER SECTION INPUT HANDLER */
    counters_container.addEventListener('input', (e) => {
        const target = e.target;
        if (target.tagName !== 'INPUT') return;
        //if the input is not a text or a number we want to return
        if (target.type !== "text" && target.type !== "number") return;
        const counterEl = target.closest('.counter');//we get the current counter element
        const counterId = counterEl.dataset.id;//we get the data-id of the current counter that corresponds to the Counter id
        const counter = Counter.getById(parseInt(counterId));//we get the Counter object by the id
        //switch the type of the input
        switch (target.type) {
            case "text"://user is entering a counter name
                const tableResults = results.querySelectorAll('td');
                //we get the corresponding result of the current counter from the table
                let correspondingResult = Array.from(tableResults).find(td =>{
                    const row = td.closest('tr');
                    if(row.dataset.id === counterId){
                        return td;
                    }
                });
                if(target.value.length > 20) {
                    //if user is digiting more than 20 characters we want to limit it
                    target.value = target.value.slice(0,20);
                    break;
                }
                const counterName = target.value || counter.name;
                correspondingResult.innerText= " "+counterName;
                break;
            case "number":
                /* user is entering a counter value:
                - or from intern counter settings 
                - or from the asynchronous section(value or time) */
                const settigs_container = target.closest('.settings-container');
                const asyncBtn = target.closest('.async-button');//async button container
                //if the input is not in the counter section or in the async section we want to return
                if (!counters_container && !asyncBtn) break;
                let count = parseInt(target.value);
                //if the input is in the async section
                if(asyncBtn){
                    //if the user digits a number that starts with 0
                    if(count == 0) {
                        //we want to reset the input field
                        target.value = "";
                    }
                    //if the input is from the value field
                    if(target.classList.contains("addIt-async")){
                    //if user digits an async value longer than 5 digits
                        if(count.toString().length > 5) {
                            //we want to limit it(max 5 digits)
                            //(max 5 digits for the async value)
                            target.value = target.value.slice(0,5);
                            count = parseInt(target.value);
                    //if the user digits a negative number and the shopping mode is on 
                        }else if(count < 0 && Counter.shoppingMode){
                            //we want to set it to 0 and reset the input field
                            target.value = "";
                            count = 0;
                        }
                    //if the input is from the time field 
                    //(target.classList.contains("async-sec") is the same)
                    }else if(!target.classList.contains("addIt-async") && target.value > 10){
                        //we want to limit it to 10 seconds
                        //10 seconds or a time equal to the first digit
                        target.value = count == 10 ? 10 : target.value.slice(0,1);
                        count = parseInt(target.value);
                    }    
                    //Finally we can set the asynchronous value or time of the current Counter based on the target class
                    target.classList.contains("addIt-async") ?
                    counter.asynchronous_value = count || 0 :
                    counter.asynchronous_time = count || 0;
                    break;            
                //if the input is in the intern counter settings    
                }else if(settigs_container){
                    //if the settings container is not in the counter section we want to return (it's a plus security check)
                    if (settigs_container.parentNode !== settigs_container.closest(".counter")) break;
                    //if user digits a number that contains more than 7 digits
                    if(count.toString().length > 7) {
                        //we want to limit it(max 7 digits)
                        target.value = target.value.slice(0,7);
                        break;
                    //if the user digits a number that starts with 0 
                    }else if(count.toString().charAt(0) == 0){
                        //we want to set it to 0 and reset the input field
                        target.value = "";
                        count = 0;
                    }else if(target.value == ""){
                        target.value = ""
                        count = 0;
                    //if the user digits a negative number and the shopping mode is on 
                    }else if(count < 0 && Counter.shoppingMode){
                        //we want to set it to 0 and reset the input field
                        target.value = "";
                        count = 0;
                    }
                    //Finally we can set the count of the current Counter
                    counter.setTo(count);
                    break;
                }
            break; 
            }
        });
    /* SINGLE-COUNTER SECTION INPUT HANDLER */
    single_counter.addEventListener('input', (e) => {   
        if(e.target.tagName !== 'INPUT') return;
        //if the input is from the intern counter settings field
        if(e.target.id === "setCounter"){
            let value = e.target.value;
            //if user digits a number that contains more than 7 digits 
            if(value.toString().length > 7) {
                //we want to limit it(max 7 digits)
                e.target.value = e.target.value.slice(0,7);
                return;
            //if the user digits a number that starts with 0
            }else if(value.toString().charAt(0) == "0"){
                //we want to set value to 0 and reset the input field 
                value = 0;
                e.target.value = "";
            //if the input is void we want to set the value to 0
            }else if(value == ""){
                value = 0;
                e.target.value = ""
            //if the user digits a negative number and the shopping mode is on
            }else if(value < 0 && Counter.shoppingMode){
                //we want to set it to 0 and reset the input field
                value = 0;
                e.target.value = "";
            }
            //Finally we can set the count of the single current
            counter.textContent = value;
        } 
        //if the input is from the async section
        else if(e.target === asyncValueField || e.target === asyncTimeField){
            //if the user enter a time longer than 10 seconds
            if(asyncTimeField.value > 10 ) {
                // we want to limit it to 10 seconds
                //10 seconds or a time equal to the first digit
                e.target.value = e.target.value == 10 ? 10 : e.target.value.slice(0,1);
                return
            //if the user enter a negative number and the shopping mode is on 
            }else if(e.target.value < 0 && Counter.shoppingMode){
                //we want to reset the input field and return
                e.target.value = "";
                return;
            //if the user enter 0 
            }else if(e.target.value == 0) {
                //we want to reset the input field and return
                e.target.value = "";
                return;
            //if the user enter a value longer than 5 digits 
            }else if(asyncValueField.toString().length > 5) {
                //we want to limit it(max 5 digits for the async value)
                e.target.value = e.target.value.slice(0,5);
                return;
            }
        }
    });