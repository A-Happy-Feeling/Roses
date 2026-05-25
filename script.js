
//=======HOME PAGE==========
window.addEventListener("DOMContentLoaded", () => {

  const flipSound = document.getElementById("flipSound");

  document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

      setTimeout(() => {

        flipSound.pause();
        flipSound.currentTime = 0;

        flipSound.play();

      }, 100); // 1000 milliseconds = 1 second

    });

  });

});






//============ART PAGE===========
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".lightbox-trigger");
  const overlay = document.getElementById("lightbox-overlay");
  const modalImg = document.querySelector(".lightbox-content");
  const closeBtn = document.querySelector(".close-btn");

  // Loop through all images and add click event
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Set image source to the data-full attribute
      modalImg.src = trigger.dataset.full;
      overlay.classList.remove("hidden"); // Show overlay
    });
  });

  // Close when clicking the 'x'
  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // Close when clicking anywhere on the overlay
  overlay.addEventListener("click", (e) => {
    if (e.target !== modalImg) {
      overlay.classList.add("hidden");
    }
  });
});


//===========GARDEN PAGE===========
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel_container').forEach(container => {
    const slideTrack = container.querySelector('.carousel_slide');
    const originalImages = slideTrack.querySelectorAll('img');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const dotsContainer = container.querySelector('.carousel_dots');

    if (originalImages.length === 0) return;

    // 1. DYNAMICALLY GENERATE INDEPENDENT NAVIGATION DOTS
    originalImages.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // 2. FIXED: ISOLATE SINGLE IMAGES CORRECTIONS BEFORE CLONING
    const firstClone = originalImages[0].cloneNode(true); // Grabs ONLY first image node
    const lastClone = originalImages[originalImages.length - 1].cloneNode(true); // Grabs ONLY last image node

    // 3. INJECT CLONES SAFE INTO THE DOM TRACK
    slideTrack.appendChild(firstClone);
    slideTrack.insertBefore(lastClone, originalImages[0]);

    // Track offsets setup
    let index = 1; 
    const allSlides = slideTrack.querySelectorAll('img');
    let isMoving = false;

    // Center layout to index 1 instantly
    slideTrack.style.transform = `translateX(${-index * 100}%)`;

    // SYNC DOT LIGHT STATES
    function updateDots() {
      dots.forEach(dot => dot.classList.remove('active'));
      
      let dotIndex = index - 1;
      if (index === 0) {
        dotIndex = originalImages.length - 1;
      } else if (index === allSlides.length - 1) {
        dotIndex = 0;
      }
      
      if (dots[dotIndex]) {
        dots[dotIndex].classList.add('active');
      }
    }

    function updateCarousel(showTransition = true) {
      if (showTransition) {
        slideTrack.style.transition = 'transform 0.5s ease-in-out';
      } else {
        slideTrack.style.transition = 'none';
      }
      slideTrack.style.transform = `translateX(${-index * 100}%)`;
      updateDots();
    }

    // INTERACTIVE MOUSE EVENT HANDLERS
    nextBtn.addEventListener('click', () => {
      if (isMoving) return;
      isMoving = true;
      index++;
      updateCarousel(true);
    });

    prevBtn.addEventListener('click', () => {
      if (isMoving) return;
      isMoving = true;
      index--;
      updateCarousel(true);
    });

    dots.forEach((dot, dotIdx) => {
      dot.addEventListener('click', () => {
        if (isMoving) return;
        index = dotIdx + 1;
        updateCarousel(true);
      });
    });

    // SEAMLESS RE-INDEXING LOOP TRICK
    slideTrack.addEventListener('transitionend', () => {
      isMoving = false;

      if (index === allSlides.length - 1) {
        index = 1;
        updateCarousel(false);
      }
      if (index === 0) {
        index = allSlides.length - 2;
        updateCarousel(false);
      }
    });
  });
});




//=============DRIFTING EFFECT==============
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  // a loop to define each "element"
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
      element.classList.add("active");
      element.classList.remove("exit");
    } 
    else if (elementBottom <= 0) {
      element.classList.remove("active");
      element.classList.add("exit");
    } 
    else {
      element.classList.remove("active");
      element.classList.remove("exit");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);





// ===== FALLING PETALS =====

const petalsContainer = document.querySelector(".petals");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // random horizontal position
  petal.style.left = Math.random() * window.innerWidth + "px";

  // random size
  const size = Math.random() * 15 + 10;
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  // random speed
  const duration = Math.random() * 5 + 7;
  petal.style.animationDuration = `${duration}s, 3s`;

  // random delay
  petal.style.animationDelay = `0s, ${Math.random() * 3}s`;

  petalsContainer.appendChild(petal);

  // remove petal after falling
  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

// create petals repeatedly
setInterval(createPetal, 300);






//============ PETAL TRAILING MOUSE EFFECT =============
let lastPetal = 0;

document.addEventListener("mousemove", function(e) {

  const now = Date.now();

  if (now - lastPetal > 115) {

    lastPetal = now;

    const petal = document.createElement("div");

    petal.classList.add("petalTrail");

    petal.style.left = e.clientX + "px";
    petal.style.top = e.clientY + "px";

    document.body.appendChild(petal);

    setTimeout(function() {
      petal.remove();
    }, 2000);
  }

});


