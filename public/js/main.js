document.addEventListener('DOMContentLoaded', () => {

  // --- All your existing JavaScript code (particles.js, swiper, popup video, navbar toggle, cursor follower) goes here. ---

  // particles.js init
  if (document.getElementById('particles-js')) {
      particlesJS.load('particles-js', 'images/particle-config.json');
  }

  // swiper init
  const swiperContainer = document.querySelector('.swiper-container');
  if (swiperContainer) {
      new Swiper(swiperContainer, {
          loop: true,
          pagination: { el: '.swiper-pagination', clickable: true },
          slidesPerView: 1,
          spaceBetween: 20,
          breakpoints: {
              768: {
                  slidesPerView: 1,
              },
              1024: {
                  slidesPerView: 1,
              }
          }
      });
  }

  // popup video functionality
  const popupVideos = document.querySelectorAll(".popup-video");
  popupVideos.forEach(video => {
      video.addEventListener("click", () => {
          const popup = document.getElementById("video-popup");
          const popupPlayer = document.getElementById("popup-player");
          if (popup && popupPlayer) {
              const source = video.querySelector("source").getAttribute("src");
              popup.style.display = "flex";
              popupPlayer.src = source;
              popupPlayer.play();
          }
      });
  });

  const videoPopup = document.getElementById("video-popup");
  const videoPopupClose = document.getElementById("video-popup-close");
  const popupPlayer = document.getElementById("popup-player");

  if (videoPopup && videoPopupClose && popupPlayer) {
      videoPopupClose.addEventListener("click", () => {
          videoPopup.style.display = "none";
          popupPlayer.pause();
          popupPlayer.src = "";
      });

      videoPopup.addEventListener("click", e => {
          if (e.target.id === "video-popup") {
              videoPopup.style.display = "none";
              popupPlayer.pause();
              popupPlayer.src = "";
          }
      });
  }

  // --- Navbar Toggle Functionality ---
  const navToggle = document.querySelector('.nav-toggle'); // Note: This element doesn't seem to be in your HTML. If you have a mobile nav toggle, add it.
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });

      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              if (navLinks.classList.contains('active')) {
                  navLinks.classList.remove('active');
              }
          });
      });
  }

  // --- Cursor Follower Effect ---
  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  document.body.appendChild(cursorFollower);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile) {
      document.addEventListener('mousemove', (e) => {
          cursorFollower.style.left = `${e.clientX}px`;
          cursorFollower.style.top = `${e.clientY}px`;
      });

      document.querySelectorAll('a, button, input[type="submit"], .popup-video, .swiper-slide img').forEach(el => {
          el.addEventListener('mouseenter', () => {
              cursorFollower.style.width = '60px';
              cursorFollower.style.height = '60px';
              cursorFollower.style.background = 'rgba(255, 255, 255, 0.25)';
          });
          el.addEventListener('mouseleave', () => {
              cursorFollower.style.width = '40px';
              cursorFollower.style.height = '40px';
              cursorFollower.style.background = 'rgba(255, 255, 255, 0.15)';
          });
      });
  }

  // --- SCROLL ANIMATION CODE (INTEGRATED) ---
  const canvas = document.getElementById('scrollAnimationCanvas');
  const ctx = canvas.getContext('2d');
  const loadingOverlay = document.getElementById('loadingOverlay');

  // Set initial canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // IMPORTANT: Match this to your actual number of PNG frames
  const frameCount = 116;
  const images = [];
  // IMPORTANT: Confirm your folder name and file naming (e.g., sequence/0001.png, sequence/0002.png)
  const getImagePath = i => 'sequence/' + String(i).padStart(4, '0') + '.png'; // Adjust if your files are named 'frame001.png' etc.

  let imagesLoadedCount = 0;

  // Preload all images and track their loading status
  for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      img.onload = () => {
          imagesLoadedCount++;
          // Update loading progress (optional: you could update loadingOverlay.textContent here)
          if (imagesLoadedCount === frameCount) {
              console.log('Scroll animation images loaded!');
              loadingOverlay.classList.add('hidden'); // Hide overlay using CSS class for transition
              updateImage(); // Draw the initial frame
          }
      };
      img.onerror = () => {
          console.error('Failed to load scroll animation image:', img.src);
          // Consider handling this: maybe reduce frameCount or show a warning.
          // For now, it will just proceed with loaded images.
      };
      images.push(img);
  }

  function drawFrame(index) {
      if (index >= 0 && index < images.length && images[index].complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
      }
  }

  function updateImage() {
      if (imagesLoadedCount === frameCount) {
          const scrollTop = document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight;
          const clientHeight = window.innerHeight;

          const maxScroll = scrollHeight - clientHeight;

          console.log(`[Scroll Debug] scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}, maxScroll: ${maxScroll}`);

          let scrollFraction = 0;
          if (maxScroll > 0) {
              scrollFraction = scrollTop / maxScroll;
          } else {
              console.warn("[Scroll Animation] maxScroll is 0 or less. Check .scroll-spacer height and overall page CSS.");
          }

          const frameIndex = Math.min(
              frameCount - 1,
              Math.max(0, Math.floor(scrollFraction * frameCount))
          );

          drawFrame(frameIndex);
      }
  }

  // Event listeners for scroll and resize
  window.addEventListener('scroll', () => requestAnimationFrame(updateImage));
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      requestAnimationFrame(updateImage); // Recalculate and redraw on resize
  });

  // Initial draw to ensure the first frame is displayed immediately after loading
  // This handles cases where page might not be scrolled initially.
  if (imagesLoadedCount === frameCount) {
      updateImage();
  }
}); // --- End of DOMContentLoaded listener ---
document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('typewriter-text');
  const textToType = "Graphic Designer & 3D Artist";
  let charIndex = 0;
  const typingSpeed = 100;    // Speed for typing each character
  const erasingSpeed = 50;    // Speed for erasing each character
  const delayBeforeStart = 1000; // Delay before typing starts (initial and after erase)
  const delayBeforeErase = 2000; // Delay after typing completes before erasing starts

  function typeWriter() {
      if (charIndex < textToType.length) {
          // Typing phase
          textElement.textContent += textToType.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, typingSpeed);
      } else {
          // Typing complete, wait before erasing
          setTimeout(eraseWriter, delayBeforeErase);
      }
  }

  function eraseWriter() {
      if (charIndex > 0) {
          // Erasing phase
          textElement.textContent = textToType.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(eraseWriter, erasingSpeed);
      } else {
          // Erasing complete, wait before typing again (loop)
          setTimeout(typeWriter, delayBeforeStart);
      }
  }

  // Start the initial typewriter effect after a delay
  setTimeout(typeWriter, delayBeforeStart);
});
// --- Hamburger Menu Logic ---
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay'); // The new full-screen menu
    const fullScreenOverlay = document.getElementById('fullScreenOverlay'); // The background dimmer

    if (hamburger && mobileNavOverlay && fullScreenOverlay) { // Ensure elements exist
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            fullScreenOverlay.classList.toggle('active');
            // Prevent body scrolling when menu is open
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a nav link inside the mobile overlay is clicked
        mobileNavOverlay.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', function(event) {
                // Check if the link is an anchor to a section
                if (this.getAttribute('href').startsWith('#')) {
                    event.preventDefault(); // Prevent default jump for smooth scroll

                    hamburger.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    fullScreenOverlay.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling

                    // Smooth scroll to section
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - (document.querySelector('.mobile-header')?.offsetHeight || 0), // Adjust for fixed header
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // For external links or other behaviors, let the default action happen
                    hamburger.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    fullScreenOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when fullScreenOverlay is clicked
        fullScreenOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            fullScreenOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }

    // --- Your existing particles-js, typewriter, and swiper initialization should follow here ---

    // Typewriter effect (make sure it targets the correct element)
    const typewriterText = document.getElementById('typewriter-text');
    const textToType = "I create stunning visual content that not only looks great but also converts. From engaging animations to captivating social media designs, I bring your brand's vision to life with creativity and precision.";
    let i = 0;
    let isDeleting = false;
    let speed = 50; // Typing speed in ms

    function typeWriter() {
        if (!typewriterText) return; // Exit if element not found

        let currentText = textToType.substring(0, i);
        typewriterText.innerHTML = currentText;

        if (!isDeleting && i < textToType.length) {
            i++;
            speed = 50; // Normal typing speed
        } else if (isDeleting && i > 0) {
            i--;
            speed = 30; // Faster deleting speed
        } else if (!isDeleting && i === textToType.length) {
            return; // Stop after typing once if you don't want deletion
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            speed = 500; // Pause before typing again
        }
        setTimeout(typeWriter, speed);
    }

    typeWriter();

    // Swiper initialization (ensure this is placed correctly)
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1, // Show one slide at a time
        spaceBetween: 30, // Space between slides
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // When window width is >= 769px (desktop)
            769: {
                slidesPerView: 3, // Show 3 slides on desktop
                spaceBetween: 30,
            },
            // When window width is between 481px and 768px (tablet)
            481: {
                slidesPerView: 2, // Show 2 slides on tablet
                spaceBetween: 20,
            }
        }
    });

    // Popup Video Logic
    const videoPopup = document.getElementById('video-popup');
    const popupPlayer = document.getElementById('popup-player');
    const videoPopupClose = document.getElementById('video-popup-close');
    const popupTriggers = document.querySelectorAll('.popup-video');

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const videoSrc = this.querySelector('source').src; // Get video source from clicked video
            popupPlayer.src = videoSrc;
            videoPopup.style.display = 'flex'; // Show the popup
            popupPlayer.play(); // Autoplay the video in popup
        });
    });

    videoPopupClose.addEventListener('click', function() {
        videoPopup.style.display = 'none'; // Hide the popup
        popupPlayer.pause(); // Pause the video
        popupPlayer.currentTime = 0; // Reset video to start
    });

    // Close popup if clicked outside video content
    videoPopup.addEventListener('click', function(event) {
        if (event.target === videoPopup) {
            videoPopup.style.display = 'none';
            popupPlayer.pause();
            popupPlayer.currentTime = 0;
        }
    });
});