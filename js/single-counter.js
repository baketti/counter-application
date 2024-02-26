/* SINGLE COUNTER CLICKS HANDLER */
let asyncValue = 0;
let asyncTime = 0;

    single_counter.addEventListener('click', (e) => {
        const target = e.target;
        if(target.tagName !== 'I' && 
        !target.closest(".btn-container") &&
        !target.closest('[data-action]')) return;
        if(target.tagName==="I" && target.classList.contains("settings")){
            const settings = target.nextElementSibling;
            if(!settings) return;
            toggleSettingsMenuIcon(target,settings)
        }else if (target.closest(".btn-container")){
            const action = target.closest(".btn-container").dataset.action;
            if(!action) return;
            if (action === "increment"){
                counter.textContent = parseInt(counter.textContent)+1;
            }else if (action === "decrement"){
                if(counter.textContent == 0 && Counter.shoppingMode) return;
                counter.textContent-=1;
            }
        }else if (target.closest('[data-action]')){
                if(target.dataset.action == "reset"){
                    counter.textContent = 0;
                    return;
                }
                const bar = single_counter.querySelector('#bar');
                const asyncBtn = target.closest('[data-action]');
                asyncValue = asyncValueField.value || 0;
                if(asyncValue < 0 && Counter.shoppingMode) return;
                asyncTime = asyncTimeField.value || 0; 
                const timeout = asyncTime * 1000;
                move(bar,asyncTime);
                asyncBtn.disabled = true;
                setTimeout(() => {
                    counter.textContent=parseInt(asyncValue) + parseInt(counter.textContent);
                    asyncValueField.value = ""
                    asyncTimeField.value =""; 
                    asyncBtn.disabled = false;
                }, timeout);
            }
        });