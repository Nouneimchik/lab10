document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("[data-start]");
    const input = document.querySelector("#datetime-picker");
    const daysSpan = document.querySelector("[data-days]");
    const hoursSpan = document.querySelector("[data-hours]");
    const minutesSpan = document.querySelector("[data-minutes]");
    const secondsSpan = document.querySelector("[data-seconds]");

    let userSelectedDate = null;
    let timerId = null;

    // Забороняємо ручне введення
    input.addEventListener("keydown", (e) => e.preventDefault());

    // Ініціалізуємо flatpickr
    flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        minDate: "today",
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selected = selectedDates[0];
            if (selected <= new Date()) {
                iziToast.warning({ message: "Будь ласка, виберіть дату в майбутньому" });
                startButton.disabled = true;
            } else {
                userSelectedDate = selected;
                startButton.disabled = false;
            }
        },
    });

    // Обробник кнопки "Старт"
    startButton.addEventListener("click", () => {
        if (!userSelectedDate) return;

        startButton.disabled = true;
        input.disabled = true;

        timerId = setInterval(() => {
            const diff = userSelectedDate - new Date();
            if (diff <= 0) {
                clearInterval(timerId);
                iziToast.success({ message: "Час вийшов!" });
                input.disabled = false;
                return;
            }

            const { days, hours, minutes, seconds } = convertMs(diff);
            daysSpan.textContent = addLeadingZero(days);
            hoursSpan.textContent = addLeadingZero(hours);
            minutesSpan.textContent = addLeadingZero(minutes);
            secondsSpan.textContent = addLeadingZero(seconds);
        }, 1000);
    });

    // Функція конвертації мілісекунд
    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        return {
            days: Math.floor(ms / day),
            hours: Math.floor((ms % day) / hour),
            minutes: Math.floor((ms % hour) / minute),
            seconds: Math.floor((ms % minute) / second),
        };
    }

    // Функція додавання нуля перед числами < 10
    function addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }
});
