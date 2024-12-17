// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-to-Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
});
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
if (slides.length > 0 && prevButton && nextButton) {
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  });

  // Add autoplay functionality
  let autoplay = setInterval(() => {
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }, 5000); // Slide every 5 seconds

  // Pause autoplay on hover
  document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoplay));
  document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
      showSlide(currentSlide);
    }, 5000);
  });

  showSlide(currentSlide);
}

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-bar');

if (progressBars.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width; // Animate the width based on data-width attribute
        observer.unobserve(bar); // Stop observing once animation is triggered
      }
    });
  });

  progressBars.forEach(bar => {
    bar.style.width = '0'; // Initially set width to 0 for animation
    bar.dataset.width = bar.style.width; // Store the final width in a data attribute
    observer.observe(bar);
  });
}


// Contact Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let isValid = true;

  // Reset field styles
  [name, email, message].forEach(field => field.style.borderColor = '');

  // Validate fields
  if (!name.value.trim()) {
    name.style.borderColor = 'red';
    alert('Please enter your name.');
    isValid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.style.borderColor = 'red';
    alert('Please enter a valid email address.');
    isValid = false;
  }
  if (!message.value.trim()) {
    message.style.borderColor = 'red';
    alert('Please enter your message.');
    isValid = false;
  }

  if (isValid) {
    alert('Thank you for your message!');
    contactForm.reset();
  }
});

// Highlight the active navigation link based on the current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  console.log('Active Page:', currentPage); // For debugging
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPage === href) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
});



