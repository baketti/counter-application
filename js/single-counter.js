/* SINGLE COUNTER CLICKS HANDLER */
let asyncValue = 0;
let asyncTime = 0;

    single_counter.addEventListener('click', (e) => {
        const target = e.target;
        //we want to continue only if the target is an icon or one of buttons
        if(target.tagName !== 'I' && 
        !target.closest(".btn-container") &&
        !target.closest('[data-action]')) return;
        //if the user clicks on the intern settings icon
        if(target.tagName==="I" && target.classList.contains("settings")){
            const settings = target.nextElementSibling;
            if(!settings) return;
            //we toggle the settings menu icon
            toggleSettingsMenuIcon(target,settings)
        //if the user clicks on increment or decrement button
        }else if (target.closest(".btn-container")){
            //we have to get the corresponding button action
            const action = target.closest(".btn-container").dataset.action;
            //if there is no action we want to return
            if(!action) return;
            if (action === "increment"){
                counter.textContent = parseInt(counter.textContent)+1;
            }else if (action === "decrement"){
                if(counter.textContent == 0 && Counter.shoppingMode) return;
                counter.textContent-=1;
            }
        //if we are here => then we can do this check
        }else if (target.closest('[data-action]')){
        //if the user clicks on the reset icon within intern settings menu or the async button
                if(target.dataset.action == "reset"){//reset icon
                    //user wants to reset the counter
                    counter.textContent = 0;
                    return;
                }
                //if we are here => it was not the reset icon
                //so we can do async stuff
                const bar = single_counter.querySelector('#bar');
                const asyncBtn = target.closest('[data-action]');
                //we get async value and time from the input fields
                asyncValue = asyncValueField.value || 0;
                //it is to prevent user to set a negative value when the shopping mode is on
                if(asyncValue < 0 && Counter.shoppingMode) return;
                asyncTime = asyncTimeField.value || 0; 
                const timeout = asyncTime * 1000;
                //we can move the progress bar
                move(bar,asyncTime);
                //we want to disable the async button until the async operation is done
                asyncBtn.disabled = true;
                //we want to do the async operation with the same time of ther progress bar
                setTimeout(() => {
                    counter.textContent=parseInt(asyncValue) + parseInt(counter.textContent);
                    asyncValueField.value = ""
                    asyncTimeField.value =""; 
                    asyncBtn.disabled = false;
                }, timeout);
            }
        });