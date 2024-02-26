const HTML_COUNTER_ELEMENT =  `
    <i class="fa-regular fa-circle-xmark close-icon"></i>
    <i class="fa-solid fa-ellipsis-vertical settings"></i>
    <div class="settings-container" hidden>
        <label>Set Counter To:
            <input class="setCounter" type="number" placeholder="Value">
        </label>
        <label>
            <span>Reset Counter</span>
            <i class="fa-solid fa-arrow-rotate-left" class="resetCounter" data-action="reset"></i>
        </label>
    </div>
    <div class="counter-text-field">
        <input type="text" placeholder="Counter Name" data-id="" >
    </div>
    <div class="core-counter">
        <div class="btn-container" data-action="decrement">
            <button class="pushable" title="Click me">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">
                    <i class="fa-solid fa-minus"></i>
                </span>
            </button>
        </div>
        <h1 class="count"><span class="symbol"></span><span></span><span class="number">0</span></h1>
        <div class="btn-container" data-action="increment">
            <button class="pushable" title="Click me"> <!-- Add a title attribute with a descriptive text -->
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">
                    <i class="fa-solid fa-plus"></i>
                </span>
            </button>
        </div>
    </div>
    <div class="async-button">
        <div class="async-button-cont">
           <label>
                <input type="number" class="addIt-async" max="10000" placeholder="Value">
            </label>
            <button class="pushable async-btn" data-action="addAsync">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">Asynchronous</span>
            </button>
            <label>
                <input type="number" class="async-sec" min="0" max="10" placeholder="Seconds">
            </label>
            <div class="progress-bar">
                <div class="bar">0%</div>
            </div>
        </div> 
    </div>`;