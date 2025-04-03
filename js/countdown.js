document.addEventListener('DOMContentLoaded', function() {
    // Set up custom cursor
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Set target date to April 18, 2025
    const targetDate = new Date('April 18, 2025 00:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('countdown-hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('countdown-minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('countdown-seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        
        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
        }
    }

    // Update timer immediately and then every second
    updateTimer();
    const countdownInterval = setInterval(updateTimer, 1000);

    // Handle newsletter signup
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            alert(`Thank you! ${email} has been added to our launch notification list.`);
            this.reset();
        });
    }
});
