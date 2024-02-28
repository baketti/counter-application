class Counter {
    
    element = null;
    name = "";
    count = 0;
    static id = -1;
    static counters = [];
    static shoppingMode = false;
    asynchronous_value = 0;
    asynchronous_time = 0;

    constructor (element) {
        this.element = element;
        this.element.className = 'counter multiple';
        this.id = ++Counter.id;
        this.element.setAttribute("data-id",this.id);
        this.name = `Counter ${this.id}`;
        this.element.setAttribute("data-name",this.name);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
        this.element.onclick = this.onClick.bind(this);
        this.render = this.render.bind(this);
        Counter.counters = [...Counter.counters, this];
    }
    
    increment () {
        this.count++
    }
    
    decrement () {
        if(this.count == 0 && Counter.shoppingMode) return;
        this.count--
    }

    reset () {
        this.count = 0;
        this.element.querySelector(".setCounter").value = "";
    }

    setTo(value) {
        this.count = parseInt(value);
        this.renderCount(); 
        this.updateResults();
    }

    addAsync () {
        if(this.asynchronous_value < 0 && Counter.shoppingMode) return;
        const bar = this.element.querySelector(".bar");
        const button = this.element.querySelector(".async-btn");
        const async_value_input = this.element.querySelector(".addIt-async");
        const async_time_input = this.element.querySelector(".async-sec");
        const timeout = parseInt(this.asynchronous_time) * 1000;
        move(bar,this.asynchronous_time);
        button.disabled = true;
        setTimeout(() => {
            this.setTo(this.count + parseInt(this.asynchronous_value))
            button.disabled = false;
            this.asynchronous_value = 0;
            this.asynchronous_time = 0;
            async_value_input.value = "";
            async_time_input.value = "";
        }, timeout);
    }
    /* METHOD TO UPDATE COUNT */
    renderCount () {
        const counter = this.element.querySelector(".number");
        counter.textContent = this.count;
    }
    /* METHOD TO CREATE THE ENTIRE COUNTER ELEMENT:
       IT TAKES HTML AND INSERT IT INTO ITS SECTION */
    build(innerCounter){
        this.element.innerHTML = innerCounter;
        this.renderCount();
    }
    /* METHOD TO APPEND AN ENTIRE COUNTER SECTION IN THE RIGHT POSITION */
    render(parentElement,lastElement) {
        parentElement.insertBefore(this.element, lastElement);
    }
    /* METHOD TO HANDLE THE CLICK EVENT OF EACH SINGLE COUNTER */
    onClick (e) {
        let buttonContainer = e.target.closest('[data-action]');
        if (!buttonContainer) return;
        let action = buttonContainer.dataset.action;
        if (!action) return;
        this[action]();
        this.renderCount();
        this.updateResults();
    }
    /* METHOD TO UPDATE TABLE RESULTS EVERY TIME A COUNT CHANGES */
    updateResults () {
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tbody tr');
        const row = Array.from(rows).find(row => row.dataset.id === this.id.toString());
        const tdToUpdate = row.getElementsByTagName("td")[1];
        tdToUpdate.textContent = " "+this.count;
        total_span.textContent = Counter.getTotalCount(); 
    }
    /* METHOD TO UPDATE/REMOVE THE SHOPPING MODE OF A SINGLE COUNTER */
    updateCounterMode () {
        const symbol = this.element.querySelector('.symbol');
        const number = this.element.querySelector('.number');
        symbol.textContent = Counter.shoppingMode ? "$" : "";
        this.count = Counter.shoppingMode && this.count < 0 ? 0 : this.count;
        number.textContent = this.count;
    }

    static getById(id) {
        return Counter.counters.find(counter => counter.id === id);
    }

    static getCountersList() {
        return Counter.counters;
    }

    static getTotalCount() {
        const counters = Counter.getCountersList();
        const total = counters.reduce((acc,counter) => {
            return acc + counter.count;
        },0);
        return total;
    }

    static resetAll () {
        const counters = Counter.getCountersList();
        for(let counter of counters){
            counter.reset();
            counter.renderCount(); 
            counter.updateResults();
        }
        total_span.textContent = 0;
    }

    static deleteById(id) {
        const { element } = Counter.getById(id);
        element.remove();
        Counter.counters = Counter.counters.filter(counter => counter.id !== id);
        Counter.deleteFromResults(id);
        total_span.textContent = Counter.getTotalCount(); 
    }

    static deleteFromResults (id) {
        const resultToDelete = results.querySelector(`[data-id="${id}"]`);
        resultToDelete.remove();
    }

    static deleteAll() {
        const counters = Counter.getCountersList();
        for(let counter of counters){
            Counter.deleteById(counter.id)
        }
        Counter.id = -1;
        Counter.counters = [];
        total_span.textContent = 0; 
    }
}