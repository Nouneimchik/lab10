let timerId = null;

function startTimer() {
    if (timerId !== null) {
        alert("Таймер вже запущений!");
        return;
    }

    timerId = setTimeout(() => {
        alert("Час вийшов!");
        timerId = null;
    }, 5000);
}

function cancelTimer() {
    if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
        alert("Таймер скасовано.");
    } else {
        alert("Таймер не запущений.");
    }
}