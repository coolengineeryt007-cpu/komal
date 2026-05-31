/**
 * Premium Birthday Surprise Website for Komal
 * Core Interactive Logic Engine
 */

// 1. Photo Array Configuration (All 40 uploaded photos)
const ALL_PHOTOS = [
  "komal-photos/IMG-20260405-WA0078.jpg",
  "komal-photos/IMG-20260406-WA0004.jpg",
  "komal-photos/IMG-20260406-WA0005.jpg",
  "komal-photos/IMG-20260406-WA0008.jpg",
  "komal-photos/IMG-20260406-WA0009.jpg",
  "komal-photos/IMG-20260406-WA0011.jpg",
  "komal-photos/IMG-20260406-WA0012.jpg",
  "komal-photos/IMG-20260407-WA0030.jpg",
  "komal-photos/IMG-20260407-WA0031.jpg",
  "komal-photos/IMG-20260407-WA0103.jpg",
  "komal-photos/IMG-20260409-WA0000.jpg",
  "komal-photos/IMG-20260409-WA0004.jpg",
  "komal-photos/IMG-20260506-WA0005.jpg",
  "komal-photos/IMG-20260506-WA0007.jpg",
  "komal-photos/IMG-20260507-WA0004.jpg",
  "komal-photos/IMG-20260512-WA0004.jpg",
  "komal-photos/IMG-20260512-WA0005.jpg",
  "komal-photos/IMG-20260512-WA0027.jpg",
  "komal-photos/IMG-20260516-WA0003.jpg",
  "komal-photos/IMG-20260516-WA0004.jpg",
  "komal-photos/IMG-20260516-WA0005.jpg",
  "komal-photos/IMG-20260516-WA0009.jpg",
  "komal-photos/IMG-20260516-WA0010.jpg",
  "komal-photos/IMG-20260516-WA0011.jpg",
  "komal-photos/IMG-20260516-WA0012.jpg",
  "komal-photos/IMG-20260516-WA0013.jpg",
  "komal-photos/IMG-20260516-WA0014.jpg",
  "komal-photos/IMG-20260516-WA0015.jpg",
  "komal-photos/IMG-20260521-WA0014.jpg",
  "komal-photos/IMG-20260521-WA0015.jpg",
  "komal-photos/IMG-20260521-WA0016.jpg",
  "komal-photos/IMG-20260521-WA0017.jpg",
  "komal-photos/IMG-20260521-WA0018.jpg",
  "komal-photos/IMG-20260531-WA0004.jpg",
  "komal-photos/IMG-20260531-WA0006.jpg",
  "komal-photos/IMG_20260404_093314.jpg",
  "komal-photos/IMG_20260419_152259.jpg",
  "komal-photos/IMG_20260419_152303.jpg",
  "komal-photos/IMG_20260419_152313.jpg",
  "komal-photos/IMG_20260419_152317.jpg"
];

// Timeline milestones config (mapping specific indexes from the 40 photos)
const TIMELINE_DATA = [
  {
    title: "First Memories",
    date: "The Spark of Us",
    desc: "Every great love story starts with a single unforgettable moment that prints itself on your heart forever.",
    photo: ALL_PHOTOS[35] // IMG_20260404_093314.jpg
  },
  {
    title: "Beautiful Moments",
    date: "Sweet Serendipity",
    desc: "The silent glances, the shared laughter, and the warmth of your hand in mine make ordinary days feel like magic.",
    photo: ALL_PHOTOS[36] // IMG_20260419_152259.jpg
  },
  {
    title: "Adventures Together",
    date: "Exploring the World Hand in Hand",
    desc: "Traveling through life's pathways with you is my ultimate adventure. Every destination with you is beautiful.",
    photo: ALL_PHOTOS[37] // IMG_20260419_152303.jpg
  },
  {
    title: "Precious Smiles",
    date: "My Favorite View",
    desc: "Your genuine, bright smile is the prettiest sight in the universe. It has the power to banish any dark cloud.",
    photo: ALL_PHOTOS[38] // IMG_20260419_152313.jpg
  },
  {
    title: "Today and Forever",
    date: "Our Boundless Horizon",
    desc: "With you, my today is perfect and my forever is secure. You are my home, my anchor, and my beautiful future.",
    photo: ALL_PHOTOS[39] // IMG_20260419_152317.jpg
  }
];

// State variables
let heartsCanvas = null;
let heartsCtx = null;
let fireworksCanvas = null;
let fireworksCtx = null;
let loadedImagesCount = 0;
let polaroidZIndex = 10;

// Initialize elements on load
window.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  
  // 3D Exploding Gift Box Unboxing Handler
  const giftBox = document.getElementById("gift-box");
  const giftWrapper = document.getElementById("gift-wrapper");
  const welcomeContent = document.getElementById("welcome-content-reveal");
  
  if (giftBox && giftWrapper && welcomeContent) {
    giftBox.addEventListener("click", () => {
      // 1. Trigger explosive unboxing styles
      giftBox.classList.add("open-gift");
      giftWrapper.classList.add("open-gift");
      
      // 2. High-performance unboxing confetti burst
      if (typeof confetti === "function") {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff7597", "#ffb3c6", "#b76e79", "#eae4f2", "#e5b299"]
        });
      }
      
      // 3. Gracefully reveal welcome contents after unboxing chimes
      setTimeout(() => {
        giftWrapper.style.opacity = "0";
        setTimeout(() => {
          giftWrapper.style.display = "none";
          welcomeContent.classList.add("revealed");
        }, 400);
      }, 900);
    });
  }
  
  // Open surprise CTA binding
  const openSurpriseBtn = document.getElementById("open-surprise-btn");
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener("click", () => {
      // Gentle celebratory heart burst
      if (typeof confetti === "function") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ff7597", "#ffb3c6", "#b76e79"]
        });
      }
      revealMainContent();
    });
  }
  
  setupCSSBackgroundHearts();
  setupCursorTrail();
  initIntersectionObserver();
  setupGalleryToggles();
  setupPolaroidDeck();
  setupTimeline();
  setupEnvelope();
  setupSurpriseButton();
  setupFinalHeart();
});

// 2. Resource Preloader
function initPreloader() {
  const loadingProgress = document.getElementById("loading-progress");
  const loadingText = document.getElementById("loading-text");
  const loadingPercent = document.getElementById("loading-percent");
  const loaderHeart = document.querySelector(".loader-heart");
  
  if (ALL_PHOTOS.length === 0) {
    completePreloader();
    return;
  }

  ALL_PHOTOS.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImagesCount++;
      const progress = Math.min(100, Math.round((loadedImagesCount / ALL_PHOTOS.length) * 100));
      loadingProgress.style.width = `${progress}%`;
      loadingPercent.textContent = `${progress}%`;
      
      if (loadedImagesCount >= ALL_PHOTOS.length) {
        setTimeout(completePreloader, 600);
      }
    };
    img.onerror = () => {
      // Continue even if an image fails to load
      loadedImagesCount++;
      const progress = Math.min(100, Math.round((loadedImagesCount / ALL_PHOTOS.length) * 100));
      loadingProgress.style.width = `${progress}%`;
      loadingPercent.textContent = `${progress}%`;
      
      if (loadedImagesCount >= ALL_PHOTOS.length) {
        setTimeout(completePreloader, 600);
      }
    };
  });
}

function completePreloader() {
  const preloader = document.getElementById("loading-screen");
  const welcomeScreen = document.getElementById("welcome-screen");
  
  preloader.classList.add("fade-out");
  welcomeScreen.classList.add("active");
  
  setTimeout(() => {
    preloader.style.display = "none";
    // Initialize interactive canvases after transition
    initWelcomeHeartsCanvas();
  }, 1000);
}

// 3. Ambient Welcome Screen Canvas Particles
function initWelcomeHeartsCanvas() {
  heartsCanvas = document.getElementById("welcome-hearts-canvas");
  if (!heartsCanvas) return;
  
  heartsCtx = heartsCanvas.getContext("2d");
  resizeHeartsCanvas();
  window.addEventListener("resize", resizeHeartsCanvas);
  
  const hearts = [];
  const heartColors = ["rgba(255, 117, 151, 0.45)", "rgba(255, 179, 198, 0.4)", "rgba(183, 110, 121, 0.35)", "rgba(234, 228, 242, 0.5)"];
  
  class FloatingHeart {
    constructor() {
      this.reset();
      this.y = Math.random() * heartsCanvas.height;
    }
    
    reset() {
      this.x = Math.random() * heartsCanvas.width;
      this.y = heartsCanvas.height + 20;
      this.size = Math.random() * 15 + 8;
      this.speed = Math.random() * 0.8 + 0.4;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.swingSpeed = Math.random() * 0.02 + 0.005;
      this.swingRadius = Math.random() * 15 + 5;
    }
    
    update() {
      this.y -= this.speed;
      this.angle += this.swingSpeed;
      this.currentX = this.x + Math.sin(this.angle) * this.swingRadius;
      
      if (this.y < -20) {
        this.reset();
      }
    }
    
    draw() {
      heartsCtx.save();
      heartsCtx.globalAlpha = this.opacity;
      heartsCtx.fillStyle = this.color;
      heartsCtx.translate(this.currentX, this.y);
      
      // Draw standard mathematical vector heart shape
      heartsCtx.beginPath();
      const topCurveHeight = this.size * 0.3;
      heartsCtx.moveTo(0, topCurveHeight);
      // Left side curve
      heartsCtx.bezierCurveTo(-this.size / 2, -topCurveHeight, -this.size, 0, -this.size, this.size * 0.4);
      heartsCtx.bezierCurveTo(-this.size, this.size, -this.size * 0.3, this.size * 1.3, 0, this.size * 1.8);
      // Right side curve
      heartsCtx.bezierCurveTo(this.size * 0.3, this.size * 1.3, this.size, this.size, this.size, this.size * 0.4);
      heartsCtx.bezierCurveTo(this.size, 0, this.size / 2, -topCurveHeight, 0, topCurveHeight);
      heartsCtx.closePath();
      heartsCtx.fill();
      heartsCtx.restore();
    }
  }
  
  // Populate hearts
  const heartCount = Math.min(60, Math.floor(window.innerWidth / 15));
  for (let i = 0; i < heartCount; i++) {
    hearts.push(new FloatingHeart());
  }
  
  function animate() {
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}

function resizeHeartsCanvas() {
  if (heartsCanvas) {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
  }
}



function revealMainContent() {
  const mainContent = document.getElementById("main-content");
  mainContent.style.display = "block";
  
  // Smooth scroll with custom easement delay
  setTimeout(() => {
    document.getElementById("gallery-section").scrollIntoView({ behavior: "smooth" });
    // Initialize dynamically generated sections
    renderMasonryGallery();
    renderSliderGallery();
  }, 100);
}

// 5. CSS Ambient Hearts Setup for Pages
function setupCSSBackgroundHearts() {
  const container = document.querySelector(".css-hearts-container");
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "css-floating-heart";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDelay = `${Math.random() * 15}s`;
    heart.style.transform = `scale(${Math.random() * 0.6 + 0.3})`;
    container.appendChild(heart);
  }
}

// 6. Dynamic Photo Galleries Render

// Masonry View: All 40 Photos
function renderMasonryGallery() {
  const masonryContainer = document.getElementById("masonry-gallery");
  if (!masonryContainer || masonryContainer.children.length > 0) return;
  
  ALL_PHOTOS.forEach((src, idx) => {
    const colItem = document.createElement("div");
    colItem.className = "masonry-item scroll-reveal";
    
    // Add varying aspect ratio frames elegantly
    const innerCard = document.createElement("div");
    innerCard.className = "gallery-glass-card";
    
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Komal - Portrait ${idx + 1}`;
    img.loading = "lazy";
    
    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = `
      <div class="overlay-text">
        <h3>Komal My Love</h3>
        <p>Beautiful Moment #${idx + 1}</p>
      </div>
    `;
    
    innerCard.appendChild(img);
    innerCard.appendChild(overlay);
    colItem.appendChild(innerCard);
    masonryContainer.appendChild(colItem);
  });
  
  // Re-run Intersection Observer for newly added elements
  initIntersectionObserver();
}

// Filmstrip Slider: 15 Selected Photos
function renderSliderGallery() {
  const sliderTrack = document.getElementById("slider-track");
  if (!sliderTrack || sliderTrack.children.length > 0) return;
  
  // Select 15 photos spread across the array for diversity
  const sliderIndices = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 32, 34, 37, 39];
  
  sliderIndices.forEach((idx) => {
    const photoSrc = ALL_PHOTOS[idx] || ALL_PHOTOS[0];
    
    const card = document.createElement("div");
    card.className = "filmstrip-card";
    
    card.innerHTML = `
      <div class="filmstrip-polaroid">
        <div class="polaroid-img-wrapper">
          <img src="${photoSrc}" alt="Komal Memory" loading="lazy" />
        </div>
        <div class="polaroid-caption">
          <span>Moments with You ❤️</span>
        </div>
      </div>
    `;
    sliderTrack.appendChild(card);
  });
}

// Polaroid Stack Scatter Dynamic Render
function setupPolaroidDeck() {
  const deckContainer = document.getElementById("polaroid-stack-container");
  if (!deckContainer) return;
  
  // 10 select photos for interactive stacking
  const deckIndices = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29];
  
  deckIndices.forEach((idx, order) => {
    const src = ALL_PHOTOS[idx] || ALL_PHOTOS[1];
    const card = document.createElement("div");
    card.className = "polaroid-deck-card";
    
    // Spread coordinates slightly offset
    const randomRot = Math.random() * 24 - 12; // -12deg to 12deg
    const randomX = Math.random() * 30 - 15;   // -15px to 15px
    const randomY = Math.random() * 30 - 15;   // -15px to 15px
    
    card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg)`;
    card.style.zIndex = order + 1;
    
    card.innerHTML = `
      <div class="polaroid-deck-inner">
        <div class="deck-image-wrapper">
          <img src="${src}" alt="Komal Stacking Picture" loading="lazy" />
        </div>
        <div class="deck-caption">
          <span>Click to flip/rearrange ✨</span>
        </div>
      </div>
    `;
    
    card.addEventListener("click", () => {
      polaroidZIndex++;
      
      const isMobile = window.innerWidth < 600;
      const flyX = isMobile ? (Math.random() * 40 - 20) : (randomX + 180);
      const flyY = isMobile ? -120 : (randomY - 60);
      
      // Animate card fly-out, rotation change, and return on top
      card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0.1s";
      card.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${randomRot + 45}deg) scale(1.05)`;
      
      setTimeout(() => {
        card.style.zIndex = polaroidZIndex;
        card.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) rotate(${Math.random() * 10 - 5}deg)`;
      }, 250);
    });
    
    deckContainer.appendChild(card);
  });
}

// Setup switches between different views
function setupGalleryToggles() {
  const tabs = document.querySelectorAll(".gallery-tab-btn");
  const views = document.querySelectorAll(".gallery-view");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const viewId = tab.dataset.view;
      
      tabs.forEach(t => t.classList.remove("active"));
      views.forEach(v => v.classList.remove("active"));
      
      tab.classList.add("active");
      const targetView = document.getElementById(`${viewId}-view`);
      if (targetView) targetView.classList.add("active");
    });
  });
}

// 7. Timeline Component Initialization
function setupTimeline() {
  const container = document.getElementById("timeline-wrapper");
  if (!container) return;
  
  TIMELINE_DATA.forEach((milestone, idx) => {
    const item = document.createElement("div");
    // Alternates left and right placement
    item.className = `timeline-item ${idx % 2 === 0 ? "left" : "right"} scroll-reveal`;
    
    item.innerHTML = `
      <div class="timeline-dot">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="timeline-card-wrapper">
        <div class="journey-glass-card">
          <div class="journey-img-container">
            <img src="${milestone.photo}" alt="${milestone.title}" loading="lazy" />
          </div>
          <div class="journey-content">
            <span class="journey-date">${milestone.date}</span>
            <h3 class="journey-title">${milestone.title}</h3>
            <p class="journey-desc">${milestone.desc}</p>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(item);
  });
}

// 8. 3D Envelope Wax Seal & Love Letter Animation
function setupEnvelope() {
  const envelope = document.getElementById("envelope-wrapper");
  const seal = document.getElementById("envelope-seal");
  
  if (!envelope || !seal) return;
  
  seal.addEventListener("click", (e) => {
    e.stopPropagation(); // Avoid triggering card events
    toggleLetterState();
  });
  
  envelope.addEventListener("click", () => {
    // Allows tapping the envelope itself to trigger
    if (!envelope.classList.contains("open")) {
      toggleLetterState();
    }
  });
  
  function toggleLetterState() {
    envelope.classList.toggle("open");
    
    // Smooth custom sound if played
    if (bgAudio && !bgAudio.paused && !isMuted) {
      // Soft rustle chime simulation can go here
    }
  }
}

// 9. Surprise Section Buttons & Canvas Interactions
function setupSurpriseButton() {
  const btn = document.getElementById("surprise-trigger-btn");
  const modal = document.getElementById("surprise-modal");
  const closeModal = document.getElementById("close-surprise-modal");
  
  if (!btn || !modal) return;
  
  btn.addEventListener("click", () => {
    triggerFullSurpriseEffects();
    modal.classList.add("active");
  });
  
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
      stopFireworks();
    });
  }
}

function triggerFullSurpriseEffects() {
  // A. Canvas Confetti explosion via JS library (loaded in header)
  if (typeof confetti === "function") {
    // Elegant Multi-burst confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from left and right corners
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
    
    // Explode hearts specifically
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff7597", "#ffb3c6", "#b76e79", "#eae4f2"]
    });
  }

  // B. Initialize custom canvas fireworks background
  initFireworksCanvas();
}

// Canvas Fireworks implementation
let fireworksAnimationId = null;
function initFireworksCanvas() {
  fireworksCanvas = document.getElementById("fireworks-canvas");
  if (!fireworksCanvas) return;
  
  fireworksCtx = fireworksCanvas.getContext("2d");
  
  // Fit size
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  
  window.addEventListener("resize", () => {
    if (fireworksCanvas) {
      fireworksCanvas.width = window.innerWidth;
      fireworksCanvas.height = window.innerHeight;
    }
  });
  
  const particles = [];
  const fireworks = [];
  
  class Firework {
    constructor() {
      this.x = Math.random() * fireworksCanvas.width;
      this.y = fireworksCanvas.height;
      this.targetX = Math.random() * fireworksCanvas.width;
      this.targetY = Math.random() * (fireworksCanvas.height * 0.5);
      this.speed = Math.random() * 4 + 5;
      this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
      this.distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2));
      this.distanceTraveled = 0;
      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
    }
    
    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.distanceTraveled = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2)) + this.distanceTraveled;
      
      if (this.distanceTraveled >= this.distance) {
        createParticles(this.targetX, this.targetY);
        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }
    
    draw() {
      fireworksCtx.beginPath();
      fireworksCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      fireworksCtx.lineTo(this.x, this.y);
      fireworksCtx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
      fireworksCtx.lineWidth = 2;
      fireworksCtx.stroke();
    }
  }
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 6 + 1;
      this.friction = 0.95;
      this.gravity = 0.15;
      this.hue = Math.random() * 60 + 330; // Soft pinks, purples, reds
      this.brightness = Math.random() * 20 + 70;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
    }
    
    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;
      
      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }
    
    draw() {
      fireworksCtx.beginPath();
      fireworksCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      fireworksCtx.lineTo(this.x, this.y);
      fireworksCtx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
      fireworksCtx.lineWidth = 2;
      fireworksCtx.stroke();
    }
  }
  
  function createParticles(x, y) {
    let particleCount = 45;
    while (particleCount--) {
      particles.push(new Particle(x, y));
    }
  }
  
  function loop() {
    fireworksAnimationId = requestAnimationFrame(loop);
    fireworksCtx.globalCompositeOperation = "destination-out";
    fireworksCtx.fillStyle = "rgba(0, 0, 0, 0.15)";
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworksCtx.globalCompositeOperation = "lighter";
    
    let i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }
    
    let j = particles.length;
    while (j--) {
      particles[j].draw();
      particles[j].update(j);
    }
    
    // Spawn new fireworks
    if (Math.random() < 0.04 && fireworks.length < 5) {
      fireworks.push(new Firework());
    }
  }
  
  if (fireworksAnimationId) cancelAnimationFrame(fireworksAnimationId);
  loop();
}

function stopFireworks() {
  if (fireworksAnimationId) {
    cancelAnimationFrame(fireworksAnimationId);
    fireworksAnimationId = null;
  }
  if (fireworksCtx && fireworksCanvas) {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  }
}

// 10. Scroll-Reveal Intersection Observer Setup
function initIntersectionObserver() {
  const items = document.querySelectorAll(".scroll-reveal");
  
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  items.forEach(item => {
    observer.observe(item);
  });
}

// 11. Final Page Rotating Heart Animation
function setupFinalHeart() {
  const container = document.getElementById("rotating-heart-canvas-container");
  if (!container) return;
  
  // Custom subtle glowing Canvas particles around the pulsing main CSS rotating heart
  const finalCanvas = document.createElement("canvas");
  finalCanvas.className = "final-particles-canvas";
  container.appendChild(finalCanvas);
  
  const ctx = finalCanvas.getContext("2d");
  
  function resize() {
    finalCanvas.width = container.clientWidth;
    finalCanvas.height = container.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  
  const particles = [];
  
  class AmbientGlowNode {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = finalCanvas.width / 2;
      this.y = finalCanvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.01 + 0.005;
      this.color = `rgba(255, ${Math.floor(Math.random() * 80 + 110)}, 151, `;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      if (this.alpha <= 0) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 117, 151, 0.8)";
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 40; i++) {
    particles.push(new AmbientGlowNode());
  }
  
  function animate() {
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.globalCompositeOperation = "lighter";
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  animate();
}

// Expose shared functions globally if needed for HTML callbacks
window.shareToWhatsApp = function() {
  const url = window.location.href;
  const text = encodeURIComponent(`Hey Komal, I made a special birthday surprise website just for you! Click here to open: ${url} ❤️`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
};

// 12. Touch & Mouse Interactive Sparkle Cursor Trail
function setupCursorTrail() {
  const characters = ["✨", "💖", "⭐", "🌸"];
  
  window.addEventListener("mousemove", (e) => {
    // Generate sparkle trail at 18% probability to keep it elegant and not overly dense
    if (Math.random() > 0.18) return;
    createSparkle(e.clientX, e.clientY);
  });
  
  window.addEventListener("touchmove", (e) => {
    if (Math.random() > 0.18) return;
    if (e.touches && e.touches[0]) {
      createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  });
  
  function createSparkle(x, y) {
    const particle = document.createElement("span");
    particle.className = "sparkle-particle";
    particle.textContent = characters[Math.floor(Math.random() * characters.length)];
    
    // Exact absolute positioning considering document scroll offset
    particle.style.left = `${x + (Math.random() * 20 - 10)}px`;
    particle.style.top = `${y + (Math.random() * 20 - 10) + window.scrollY}px`;
    particle.style.fontSize = `${Math.random() * 12 + 14}px`;
    
    document.body.appendChild(particle);
    
    // Automatically purge node after fading out
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}
