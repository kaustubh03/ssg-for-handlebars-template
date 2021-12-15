function increaseCounter(e){
    let counterElem = document.querySelector('#counter');
    let counter = parseInt(counterElem.textContent) + 1;
    counterElem.innerHTML = counter;
}

function decreaseCounter(e){
    let counterElem = document.querySelector('#counter');
    let counter = parseInt(counterElem.textContent) - 1;
    counterElem.innerHTML = counter;
}
