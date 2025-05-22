import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations with reduced motion preference check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  AOS.init({
    once: true,
    duration: prefersReducedMotion ? 0 : 800,
    easing: 'ease-out-cubic',
    disable: prefersReducedMotion ? true : 'mobile'
  });

  // Initialize Swiper with proper modules (ensure this is the primary Swiper instance)
  // Note: The inline script also had a Swiper init. We'll use this one as the main.
  const testimonialSwiperElement = document.querySelector('.testimonial-swiper');
  if (testimonialSwiperElement) {
    const slides = testimonialSwiperElement.querySelectorAll('.swiper-slide');
    const testimonialSwiper = new Swiper(testimonialSwiperElement, {
      modules: [Navigation, Pagination, Autoplay],
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
        firstSlideMessage: 'This is the first testimonial',
        lastSlideMessage: 'This is the last testimonial',
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: slides.length >= (1 * 2), // Ensure enough slides for loop with 1 view
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          loop: slides.length >= (1 * 2), // Enough for 1 view
        },
        768: {
          slidesPerView: 2,
          loop: slides.length >= (2 * 2), // Enough for 2 views
        },
        1024: {
          slidesPerView: 3,
          loop: slides.length > 3, // Only loop if more than 3 slides for 3 slidesPerView
        },
      }
    });
  }
  
  // Initialize Swiper for Trusted By section
  const trustedBySwiperElement = document.querySelector('.trusted-by-swiper');
  if (trustedBySwiperElement) {
    const trustedBySwiper = new Swiper(trustedBySwiperElement, {
      modules: [Autoplay, Pagination],
      loop: true,
      slidesPerView: 1, // Show 1 logo at a time
      autoplay: {
        delay: 2000, // Adjusted delay to match your example
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.trusted-by-pagination',
        clickable: true,
      },
      // Breakpoints are not strictly necessary if slidesPerView is always 1
      // but we can keep them if you plan to change slidesPerView for other sections later
      // For now, I'll simplify by removing them as slidesPerView is 1 across all.
      // breakpoints: {
      //   640: {
      //     slidesPerView: 1,
      //   },
      //   768: {
      //     slidesPerView: 1,
      //   },
      //   1024: {
      //     slidesPerView: 1,
      //   }
      // }
    });
  }
  
  // Mobile menu toggle with improved accessibility and animation (from inline script)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      console.log('Menu button clicked!'); 
      console.log('mobileMenu element:', mobileMenu);

      if (!mobileMenu) {
        console.error('mobileMenu element NOT FOUND!');
        return; // Stop if menu element is not found
      }

      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', String(!expanded)); 
      
      console.log('Before toggle, mobileMenu classes:', mobileMenu.className);
      mobileMenu.classList.toggle('hidden');
      console.log('After toggle, mobileMenu classes:', mobileMenu.className);
      
      // Add slide animation
      if (!mobileMenu.classList.contains('hidden')) {
        console.log('Entering animation block for visible menu.');
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            });
        });
      } else {
        console.log('Menu is now hidden, resetting styles.');
        mobileMenu.style.opacity = '';
        mobileMenu.style.transform = '';
      }
    });
  }

  // Mobile "Calculators" dropdown toggle
  const mobileCalculatorsButton = document.getElementById('mobile-calculators-dropdown-button');
  const mobileCalculatorsDropdown = document.getElementById('mobile-calculators-dropdown');
  const mobileCalculatorsIcon = document.getElementById('mobile-calculators-dropdown-icon');


  if (mobileCalculatorsButton && mobileCalculatorsDropdown) {
    mobileCalculatorsButton.addEventListener('click', function(event) {
      event.preventDefault(); 
      const expanded = mobileCalculatorsButton.getAttribute('aria-expanded') === 'true';
      mobileCalculatorsButton.setAttribute('aria-expanded', String(!expanded));
      mobileCalculatorsDropdown.classList.toggle('hidden');
      
      const icon = mobileCalculatorsIcon || mobileCalculatorsButton.querySelector('svg');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
      // Animation for calculators dropdown (similar to "More" dropdown)
      if (!mobileCalculatorsDropdown.classList.contains('hidden')) {
        mobileCalculatorsDropdown.style.maxHeight = '0';
         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mobileCalculatorsDropdown.style.maxHeight = mobileCalculatorsDropdown.scrollHeight + 'px';
            });
        });
      } else {
        mobileCalculatorsDropdown.style.maxHeight = '0';
      }
    });
  }
  
  // Mobile "More" dropdown toggle (from inline script)
  const mobileMoreDropdownButton = document.getElementById('mobile-dropdown-button'); // ID from index.html
  const mobileMoreDropdown = document.getElementById('mobile-dropdown'); // ID from index.html
  const mobileMoreDropdownIcon = document.getElementById('mobile-dropdown-icon'); // ID from index.html

  if (mobileMoreDropdownButton && mobileMoreDropdown && mobileMoreDropdownIcon) {
    mobileMoreDropdownButton.addEventListener('click', function() {
      const expanded = mobileMoreDropdownButton.getAttribute('aria-expanded') === 'true';
      mobileMoreDropdownButton.setAttribute('aria-expanded', String(!expanded));
      mobileMoreDropdown.classList.toggle('hidden');
      
      if (!mobileMoreDropdown.classList.contains('hidden')) {
        mobileMoreDropdownIcon.style.transform = 'rotate(180deg)';
        mobileMoreDropdown.style.maxHeight = '0';
        // Ensure styles are applied before transition for scrollHeight calculation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                 mobileMoreDropdown.style.maxHeight = mobileMoreDropdown.scrollHeight + 'px';
            });
        });
      } else {
        mobileMoreDropdownIcon.style.transform = 'rotate(0)';
        mobileMoreDropdown.style.maxHeight = '0';
      }
    });
  }

  // Dark mode toggle (from inline script)
  const darkModeToggle = document.querySelector('button[aria-label="Toggle dark mode"]');
  if (darkModeToggle) {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('darkMode') === 'enabled' || (systemPrefersDark && localStorage.getItem('darkMode') === null)) {
      document.documentElement.classList.add('dark');
    }
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }
  
  // Animated counters (logic from inline script, slightly adapted from existing main.js)
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length > 0) {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (prefersReducedMotion) {
        counter.innerText = target; // Set final value if reduced motion
      } else {
        let count = 0;
        const speed = 200; // Lower is faster
        const increment = target / speed;
        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCount();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(counter);
      }
    });
  }

  // Smooth scrolling for anchor links (from inline script)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href !== '#0') { // Ensure href is valid and not just a placeholder
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          if (!prefersReducedMotion) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            targetElement.scrollIntoView();
          }
          // Update focus for accessibility
          targetElement.setAttribute('tabindex', '-1'); 
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

}); // End of DOMContentLoaded
