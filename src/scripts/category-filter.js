// Category filtering functionality for blog page

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .post-card, .featured-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .post-card.filtering-out {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    pointer-events: none;
  }

  .post-card.filtering-in {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .post-card.filtering-prepare {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
    display: block !important;
  }

  .post-card.filtering-animate-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Featured section uses height collapse to preserve layout while removing space */
  .featured-section.filtering-out {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    pointer-events: none;
    height: 0 !important;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    overflow: hidden;
  }

  .featured-section.filtering-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .featured-section.filtering-prepare {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
    padding-top: 3rem;
    padding-bottom: 3rem;
    overflow: hidden;
  }

  .featured-section.filtering-animate-in {
    opacity: 1;
    transform: scale(1) translateY(0);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .posts-grid {
    transition: all 0.3s ease;
  }

  .featured-section {
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                margin 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .category-button {
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
  }

  .category-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(77, 187, 250, 0.3);
  }
`;
document.head.appendChild(style);

// Global filtering function
function filterByCategory(categorySlug) {
  console.log('Filtering by category:', categorySlug);

  // Store current scroll position to prevent jumping
  const currentScrollY = window.scrollY;

  const allPosts = document.querySelectorAll('.post-card');
  const featuredCard = document.querySelector('.featured-card');
  const categoryButtons = document.querySelectorAll('.category-button');

  // Update active button
  categoryButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === categorySlug) {
      btn.classList.add('active');
    }
  });

  // Collect posts that need to show and hide
  const postsToShow = [];
  const postsToHide = [];

  // Check featured post
  if (featuredCard) {
    const featuredSection = featuredCard.closest('.featured-section');
    const featuredCategories = featuredCard.dataset.categories ? featuredCard.dataset.categories.split(',') : [];
    const shouldShowFeatured = categorySlug === 'all' || featuredCategories.includes(categorySlug);

    if (shouldShowFeatured) {
      postsToShow.push({ element: featuredSection, section: null, isFeatured: true });
    } else {
      postsToHide.push({ element: featuredSection, section: null, isFeatured: true });
    }
  }

  // Check regular posts
  allPosts.forEach(post => {
    const postCategories = post.dataset.categories ? post.dataset.categories.split(',') : [];
    const shouldShow = categorySlug === 'all' || postCategories.includes(categorySlug);

    if (shouldShow) {
      postsToShow.push({ element: post, section: null });
    } else {
      postsToHide.push({ element: post, section: null });
    }
  });

  // First, hide posts that need to be hidden
  postsToHide.forEach(({ element, section, isFeatured }) => {
    if (isFeatured) {
      // For featured sections, store the current height before collapsing
      const currentHeight = element.offsetHeight;
      element.style.height = currentHeight + 'px';

      // Force a reflow to ensure height is set
      element.offsetHeight;

      // Now start the collapse animation
      element.classList.remove('filtering-in', 'filtering-animate-in');
      element.classList.add('filtering-out');
    } else {
      // For regular posts, use the standard approach
      element.classList.remove('filtering-in', 'filtering-animate-in');
      element.classList.add('filtering-out');

      // Hide with display: none after animation
      setTimeout(() => {
        if (element.classList.contains('filtering-out')) {
          element.style.display = 'none';
        }
      }, 400);
    }
  });

  // Then, after a brief delay, animate in the posts that need to show
  setTimeout(() => {
    // Separate featured post from regular posts for better animation order
    const featuredToShow = postsToShow.filter(({ isFeatured }) => isFeatured);
    const regularPostsToShow = postsToShow.filter(({ isFeatured }) => !isFeatured);

    // Animate featured post first (if any)
    featuredToShow.forEach(({ element }) => {
      element.classList.remove('filtering-out', 'filtering-in');
      element.classList.add('filtering-prepare');

      // Reset height to auto for proper expansion
      element.style.height = 'auto';

      setTimeout(() => {
        element.classList.remove('filtering-prepare');
        element.classList.add('filtering-animate-in');

        setTimeout(() => {
          element.classList.remove('filtering-animate-in');
          element.classList.add('filtering-in');
          // Ensure height is cleared after animation
          element.style.height = '';
        }, 500);
      }, 50); // Featured post animates in quickly
    });

    // Then animate regular posts with staggered timing
    regularPostsToShow.forEach(({ element }, index) => {
      element.classList.remove('filtering-out', 'filtering-in');
      element.classList.add('filtering-prepare');
      element.style.display = 'block';

      // Stagger the animations for a nice cascading effect
      setTimeout(() => {
        element.classList.remove('filtering-prepare');
        element.classList.add('filtering-animate-in');

        // Clean up animation classes after animation completes
        setTimeout(() => {
          element.classList.remove('filtering-animate-in');
          element.classList.add('filtering-in');
        }, 500);
      }, 200 + (index * 80)); // Start after featured post, then 80ms between each
    });
  }, 200); // Wait for hide animations to start

  // Update URL without page reload
  const newUrl = categorySlug === 'all' ? '/blog' : `/blog?category=${categorySlug}`;
  window.history.pushState({ category: categorySlug }, '', newUrl);

  // Restore scroll position to prevent any jumping
  setTimeout(() => {
    window.scrollTo(0, currentScrollY);
  }, 50);
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Setting up category filtering...');

  // Add click event listeners to category buttons
  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const category = this.dataset.category;
      console.log('Category button clicked:', category);
      filterByCategory(category);

      // Ensure no navigation happens
      return false;
    });

    // Also prevent any other event handlers
    button.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
  });

  // Initialize from URL on page load
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    filterByCategory(category);
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'all';
  filterByCategory(category);
});
