function stopwatch() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const timer = document.getElementById('time');
    let currentTime = 0;

    startBtn.addEventListener('click', function () {
        timer.textContent = '00:00';
        let elapsedTime = 0;

        currentTime = setInterval(function () {
            elapsedTime++;
            const minutes = ('0' + Math.trunc(elapsedTime / 60)).slice(-2);
            const seconds = ('0' + Math.trunc(elapsedTime % 60)).slice(-2);
            timer.textContent = minutes + ':' + seconds;
        }, 1000);

        [startBtn.disabled, stopBtn.disabled] = [!startBtn.disabled, !stopBtn.disabled];
    });

    stopBtn.addEventListener('click', function () {
        clearInterval(currentTime);
        [startBtn.disabled, stopBtn.disabled] = [!startBtn.disabled, !stopBtn.disabled];
    });
}