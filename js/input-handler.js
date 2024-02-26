/* IT HANDLES ALL INPUT FIELDS OF ALL COUNTERS */

    /* MULTI-COUNTER SECTION INPUT HANDLER */
    counters.addEventListener('input', (e) => {
        const target = e.target;
        if (target.tagName !== 'INPUT') return;
        if (target.type !== "text" && target.type !== "number") return;
        const counterEl = target.closest('.counter');
        const counterId = counterEl.dataset.id;
        const counter = Counter.getById(parseInt(counterId));
        switch (target.type) {
            case "text":
                const tableResults = results.querySelectorAll('td');
                let correspondingResult = Array.from(tableResults).find(td =>{
                    const row = td.closest('tr');
                    if(row.dataset.id === counterId){
                        return td;
                    }
                });
                if(target.value.length > 20) {
                    e.target.value = e.target.value.slice(0,20);
                    break;
                }
                const counterName = target.value || counter.name;
                correspondingResult.innerText= " "+counterName;
                break;
            case "number":
                const settigs_container = target.closest('.settings-container');
                const asyncBtn = target.closest('.async-button');
                let { value } = target;
                let num = value;
                if (!counters_container && !asyncBtn) break;
                if(asyncBtn){
                    if(target.classList.contains("addIt-async")){
                        if(value.toString().length > 5) {
                        target.value = target.value.slice(0,5);
                        break;
                        }else if(value < 0 && Counter.shoppingMode){
                            target.value = "";
                            break;
                        }else if(!target.classList.contains("addIt-async") && value > 10){
                            e.target.value = e.target.value == 10 ? 10 : e.target.value.slice(0,1);
                            break;
                        }else if(e.target.value.toString().charAt(0) == 0) {
                            e.target.value = "";
                        }
                    }
                    target.classList.contains("addIt-async") ?
                    counter.asynchronous_value = num || 0 :
                    counter.asynchronous_time = num || 0;
                }else if(settigs_container){
                    if (settigs_container.parentNode === settigs_container.closest(".counter")) {
                        if(value.toString().length > 7) {
                            e.target.value = e.target.value.slice(0,7);
                            break;
                        }else if(value.toString().charAt(0) == 0){
                            num = 0;
                            e.target.value = "";
                        }else if(value == ""){
                            num = 0;
                            value = ""
                        }else if(value < 0 && Counter.shoppingMode){
                            e.target.value = "";
                            num = 0;
                        }
                        counter.setTo(num);
                        break;
                    } 
                }
                break; 
        }
    });

    /* SINGLE-COUNTER SECTION INPUT HANDLER */
    single_counter.addEventListener('input', (e) => {   
        if(e.target.tagName !== 'INPUT') return;     
        if(e.target.id === "setCounter"){
            let value = e.target.value
            if(value.toString().length > 7) {
                e.target.value = e.target.value.slice(0,7);
                return;
            }else if(value.toString().charAt(0) == "0"){
                value = 0;
                e.target.value = "";
            }else if(value == ""){
                value = 0;
                e.target.value = ""
            }else if(value < 0 && Counter.shoppingMode){
                value = 0;
                e.target.value = "";
            }
            counter.textContent = value;
        } 
        else if(e.target === asyncValueField || e.target === asyncTimeField){
            if(asyncTimeField.value > 10 ) {
                asyncTimeField.value = 10; 
                e.target.value = e.target.value == 10 ? 10 : e.target.value.slice(0,1);
                return
            }else if(e.target.value < 0 && Counter.shoppingMode){
                e.target.value = "";
                return;
            }else if(e.target.value == 0) {
                e.target.value = "";
            }else if(asyncValueField.toString().length > 5) {
                e.target.value = e.target.value.slice(0,5);
                return;
            }
        }
    });