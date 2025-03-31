document.addEventListener('DOMContentLoaded', () => {
    // Initialize filters
    initFilters();
    
    // Initialize voting
    initVoting();
    
    // Initialize modal
    initModal();
  });
  
  function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artworks = document.querySelectorAll('.artwork-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter artworks
        const filter = button.getAttribute('data-filter');
        
        artworks.forEach(artwork => {
          if (filter === 'all' || artwork.getAttribute('data-category') === filter) {
            artwork.style.display = 'block';
          } else {
            artwork.style.display = 'none';
          }
        });
      });
    });
  }
  
  function initVoting() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    
    voteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Add voted class for animation
        button.classList.add('voted');
        setTimeout(() => {
          button.classList.remove('voted');
        }, 300);
        
        // Update vote count
        const countSpan = button.querySelector('span');
        let count = parseInt(countSpan.textContent);
        
        if (button.classList.contains('upvote')) {
          count++;
        } else {
          count--;
        }
        
        countSpan.textContent = count;
        
        // TODO: Send vote to server
      });
    });
  }
  
  function initModal() {
    const modal = document.querySelector('.artwork-modal');
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    artworkCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on vote buttons
        if (!e.target.closest('.vote-btn')) {
          const image = card.querySelector('img').src;
          const title = card.querySelector('.artwork-title').textContent;
          const artist = card.querySelector('.artist-name').textContent;
          const upvotes = card.querySelector('.upvote span').textContent;
          const downvotes = card.querySelector('.downvote span').textContent;
          const timer = card.querySelector('.timer').textContent;
          
          // Set modal content
          modal.innerHTML = `
            <div class="modal-content">
              <button class="modal-close">&times;</button>
              <div class="modal-image">
                <img src="${image}" alt="${title}">
              </div>
              <div class="modal-info">
                <h2>${title}</h2>
                <p class="artist-name">${artist}</p>
                <p class="artwork-description">
                  This is a beautiful piece of digital art created with passion and creativity.
                  The artist has used various techniques to create this stunning visual experience.
                </p>
                <div class="voting-section">
                  <div class="vote-buttons">
                    <button class="vote-btn upvote"><i class="fas fa-arrow-up"></i> <span>${upvotes}</span></button>
                    <button class="vote-btn downvote"><i class="fas fa-arrow-down"></i> <span>${downvotes}</span></button>
                  </div>
                  <div class="timer">${timer}</div>
                </div>
                <div class="bidding-info">
                  <h3>Bidding Opens In</h3>
                  <div class="bid-timer">12:00:00</div>
                  <button class="btn btn-primary" disabled>Bidding Coming Soon</button>
                </div>
              </div>
            </div>
          `;
          
          // Show modal
          modal.style.display = 'block';
          
          // Add close functionality
          const closeBtn = modal.querySelector('.modal-close');
          closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
          });
          
          // Close modal when clicking outside content
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.style.display = 'none';
            }
          });
          
          // Re-initialize voting in modal
          initVoting();
        }
      });
    });
  }
  