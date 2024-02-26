/* GLOBAL VARIABLES (USED IN MORE THAN ONE FILE) */
let isTimerActive = false;
let isResultsOpen = false;
let multipleCountersMode = false;
//MULTIPLE MODE VARIABLES
const main = document.querySelector('main');
const countersSection = document.querySelector('.counters');
const listIcon = document.getElementById('list-icon-btn');
const resetIcon = document.getElementById('reset-icon-btn');
const closeListIcon = document.getElementById("close-list-icon");
const counters_container = document.querySelector('.counters');
const lastCounter = counters_container.lastElementChild;
const total_span = document.getElementById("totalPrice");
const counters_results = document.querySelector('.results');
//SINGLE MODE VARIABLES
const singleCounterSection = document.querySelector('.single-counter');
const single_counter = document.querySelector('.single-counter');
const counter = document.querySelector(".number");
const asyncValueField = document.getElementById('addIt-async');
const asyncTimeField = document.getElementById('async-sec');