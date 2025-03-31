let count = 0;
let intervalId = null;

function startCounter() {
    if (intervalId !== null) {
        alert("Лічильник вже працює!");
        return;
    }

    intervalId = setInterval(() => {
        count++;
        document.getElementById("counter").textContent = count;
    }, 1000);
}

function stopCounter() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    else if(count != 0) {
        alert("Лічильник вже зупинено!");
    }
    else {
        alert("Лічильник ще не запущено!");
    }
}