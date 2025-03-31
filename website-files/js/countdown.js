document.addEventListener('DOMContentLoaded', function() {
  // Set the launch date: May 2, 2025
  const launchDate = new Date('May 2, 2025 00:00:00').getTime();
  
  // Update the countdown every second
  const countdownTimer = setInterval(function() {
      // Get today's date and time
      const now = new Date().getTime();
      
      // Find the distance between now and the launch date
      const distance = launchDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the result
      document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
      document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
      
      // If the countdown is finished, display launch message
      if (distance < 0) {
          clearInterval(countdownTimer);
          document.querySelector('.coming-soon-overlay').innerHTML = `
              <div class="coming-soon-container">
                  <h2>We're Live!</h2>
                  <p>Mwuseuwm has officially launched. Explore the platform now.</p>
                  <a href="#" class="btn btn-primary">Enter Platform</a>
              </div>
          `;
      }
  }, 1000);
  
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
