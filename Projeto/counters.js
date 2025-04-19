document.addEventListener('DOMContentLoaded', function () {
    function incrementCounter(type) {
        const counters = JSON.parse(localStorage.getItem('counters')) || { garage: 0, appointments: 0 };
        if (counters[type] !== undefined) {
            counters[type]++;
            localStorage.setItem('counters', JSON.stringify(counters));
        }
    }

    function getCounter(type) {
        const counters = JSON.parse(localStorage.getItem('counters')) || { garage: 0, appointments: 0 };
        return counters[type] || 0;
    }

    // Export functions for use in other scripts
    window.incrementCounter = incrementCounter;
    window.getCounter = getCounter;
});
