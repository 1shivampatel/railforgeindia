// Configuration variables
const ITEMS_TO_SHOW = 5; // Number of items to reveal per batch
let currentDisplayedCount = ITEMS_TO_SHOW;

// DOM Elements
const cards = Array.from(document.querySelectorAll('.card'));
const loadMoreBtn = document.getElementById('load-more-btn');

// Function to render the visibility of items
function renderItems() {
  // Loop through all static elements
  cards.forEach((card, index) => {
    if (index < currentDisplayedCount) {
      card.style.display = 'block'; // Show item (change to 'flex' or 'grid' if needed)
    } else {
      card.style.display = 'none';  // Keep hidden
    }
  });

  // Automatically hide the button if all items are fully visible
  if (currentDisplayedCount >= cards.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Event listener to show more items on click
loadMoreBtn.addEventListener('click', () => {
  currentDisplayedCount += ITEMS_TO_SHOW; // Increase count for next batch
  renderItems(); // Re-evaluate visibility
});

// Run immediately to show the very first batch on initial page load
renderItems();
