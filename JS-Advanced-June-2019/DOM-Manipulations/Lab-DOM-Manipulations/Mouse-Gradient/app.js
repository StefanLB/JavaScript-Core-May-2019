function attachGradientEvents() {
    const gradientBox = document.getElementById('gradient-box');
    const resultEl = document.getElementById('result');
    gradientBox.addEventListener('mousemove', getGradient);

    function getGradient(e) {
        const percentage = e.offsetX / e.target.clientWidth * 100;
        resultEl.textContent = `${Math.floor(percentage)}%`;
    }
}
