/* ==========================================================================
   Global variables (arrays)
   ========================================================================== */
/**
 * 1. Infos about the states
 * 2. Letters (first letter of each state)
 */

let germanFederalStates = [];
let letters = [];


/* ==========================================================================
   Load info from 'server' into array
   ========================================================================== */
/**
 * Downloading coult take time -> async, await + fetch
 * 1. Downloading from 'server'
 * 2. Convert into JSON 
 * 3. Run 'renderGermanFederalStates()' function
 * 4. Run 'renderFilterLetters()' function
 */

async function loadGermanFederalStates() {
    let response = await fetch('./bundeslaender.json');
    germanFederalStates = await response.json();
    renderGermanFederalStates();
    renderFilterLetters();
}

/* ==========================================================================
   Render state-cards
   ========================================================================== */
/**
 * Function parameter/variable 'filter' is optional (sometimes variable is set and sometimes not)
 * 1. Get 'state-cards' element
 * 2. Clear/delete all inside div
 * 3. Iteration through each state
 * 3.1. Add a div (+ content) for each state into 'state-cards' div
 * 4. Additional const population to change '.' into ','
 * 5. Get first letter of state -> .charAt(0)
 * 6. If 'filter' don't exit or 'filter' = 'firstLetter's
 * 7. If letter already pushed into array -> if statement to avoid duplication
 */

function renderGermanFederalStates(filter) {
    let states = document.getElementById('state-cards');
    states.innerHTML = '';
    for (let i = 0; i < germanFederalStates.length; i++) {
        const state = germanFederalStates[i];
        const population = (state['population']+ '').replace('.', ',');
        const firstLetter = state['name'].charAt(0);

        if (!filter || filter == firstLetter) {
            states.innerHTML += templateFederalStates(state, population);
        }

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }
}

/**
 * Template function
 */

function templateFederalStates(state, population) {
    return /*html*/    `<a class="state-card" href="${state['url']}" target="_blank">
                            <h2>${state['name']}</h2>
                            <div><p>${population}</p></div>
                        </a>`;
}

/**
 * Render filter letters
 */

function renderFilterLetters() {
    let letterbox = document.getElementById('filter');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += /*html*/ `<div onclick="setFilter('${letter}')" class="filter-letter">${letter}</div>`;
    }
}


/**
 * Run filter
 */

function setFilter(letter) {
    renderGermanFederalStates(letter);
}