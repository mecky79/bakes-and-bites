const slides = document.querySelectorAll('.slide');
let current = 0;

function nextSlide() {
  const currentSlide = slides[current];
  current = (current + 1) % slides.length;
  const nextSlide = slides[current];

  // Move current slide out to the left
  currentSlide.classList.remove('slide-active');
  currentSlide.classList.add('slide-exit');

  // Bring next slide in from the right
  nextSlide.classList.add('slide-active');

  // Clean up exit class after animation completes
  setTimeout(() => {
    currentSlide.classList.remove('slide-exit');
    currentSlide.style.transform = '';  // reset so it's ready to re-enter from right later
  }, 600); // match your transition duration
}

setInterval(nextSlide, 3000); // change slide every 3 seconds
