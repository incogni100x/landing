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
  console.log('DOM fully loaded and parsed'); // Log 1

  // Initialize AOS animations with reduced motion preference check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  AOS.init({
    once: true,
    duration: prefersReducedMotion ? 0 : 800,
    easing: 'ease-out-cubic',
    disable: prefersReducedMotion ? true : 'mobile'
  });

  // Initialize Swiper for testimonials
  const testimonialSwiperElement = document.querySelector('.testimonial-swiper');
  if (testimonialSwiperElement) {
    const slides = testimonialSwiperElement.querySelectorAll('.swiper-slide');
    new Swiper(testimonialSwiperElement, {
      modules: [Navigation, Pagination, Autoplay],
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
        firstSlideMessage: 'This is the first testimonial',
        lastSlideMessage: 'This is the last testimonial',
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: slides.length >= 2, // Simplified loop condition
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1, loop: slides.length >= 2 },
        768: { slidesPerView: 2, loop: slides.length >= 4 }, // Loop if enough for 2 views * 2
        1024: { slidesPerView: 3, loop: slides.length > 3 },
      }
    });
  }
  
  // Initialize Swiper for Trusted By section
  const trustedBySwiperElement = document.querySelector('.trusted-by-swiper');
  if (trustedBySwiperElement) {
    new Swiper(trustedBySwiperElement, {
      modules: [Autoplay, Pagination],
      loop: true,
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.trusted-by-pagination',
        clickable: true,
      },
    });
  }
  
  // Mobile menu toggles
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
          });
        });
      } else {
        mobileMenu.style.opacity = '';
        mobileMenu.style.transform = '';
      }
    });
  }

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
      if (icon) icon.classList.toggle('rotate-180');
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

  const mobileMoreDropdownButton = document.getElementById('mobile-dropdown-button');
  const mobileMoreDropdown = document.getElementById('mobile-dropdown');
  const mobileMoreDropdownIcon = document.getElementById('mobile-dropdown-icon');
  if (mobileMoreDropdownButton && mobileMoreDropdown && mobileMoreDropdownIcon) {
    mobileMoreDropdownButton.addEventListener('click', function() {
      const expanded = mobileMoreDropdownButton.getAttribute('aria-expanded') === 'true';
      mobileMoreDropdownButton.setAttribute('aria-expanded', String(!expanded));
      mobileMoreDropdown.classList.toggle('hidden');
      if (!mobileMoreDropdown.classList.contains('hidden')) {
        mobileMoreDropdownIcon.style.transform = 'rotate(180deg)';
        mobileMoreDropdown.style.maxHeight = '0';
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

  // Dark mode toggle
  const darkModeToggle = document.querySelector('button[aria-label="Toggle dark mode"]');
  if (darkModeToggle) {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.getItem('darkMode') === 'enabled' || (systemPrefersDark && localStorage.getItem('darkMode') === null)) {
      document.documentElement.classList.add('dark');
    }
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('darkMode', document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled');
    });
  }
  
  // Animated counters
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length > 0) {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (prefersReducedMotion) {
        counter.innerText = target;
      } else {
        let count = 0;
        const speed = 200;
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href !== '#0') {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // Contact Form Modal Logic
  const contactForm = document.getElementById('contact-page-form');
  const confirmationModal = document.getElementById('confirmation-modal');
  const closeModalButton = document.getElementById('close-confirmation-modal');
  const modalIconContainer = document.getElementById('modal-icon-container');
  const modalIconSvg = document.getElementById('modal-icon-svg');
  const modalTitleElement = document.getElementById('modal-title-element');
  const modalMessageElement = document.getElementById('modal-message-element');

  console.log('Contact form element (inside DOMContentLoaded):', contactForm);
  console.log('Confirmation modal element (inside DOMContentLoaded):', confirmationModal);
  console.log('Close modal button (inside DOMContentLoaded):', closeModalButton);

  if (contactForm && confirmationModal && closeModalButton && modalIconContainer && modalIconSvg && modalTitleElement && modalMessageElement) {
    console.log('All contact form related elements found. Setting up modal functions and listeners...');

    const successIconPath = "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    const errorIconPath = "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z";

    const showModal = (isSuccess, title, message) => {
      console.log('showModal called with:', isSuccess, title, message);
      modalTitleElement.textContent = title;
      modalMessageElement.textContent = message;

      modalIconContainer.classList.remove('bg-green-100', 'dark:bg-green-900/30', 'bg-red-100', 'dark:bg-red-900/30');
      modalIconSvg.classList.remove('text-green-600', 'dark:text-green-400', 'text-red-600', 'dark:text-red-400');
      
      const iconPathEl = modalIconSvg.querySelector('path');

      if (isSuccess) {
        modalIconContainer.classList.add('bg-green-100', 'dark:bg-green-900/30');
        modalIconSvg.classList.add('text-green-600', 'dark:text-green-400');
        if (iconPathEl) iconPathEl.setAttribute('d', successIconPath);
      } else {
        modalIconContainer.classList.add('bg-red-100', 'dark:bg-red-900/30');
        modalIconSvg.classList.add('text-red-600', 'dark:text-red-400');
        if (iconPathEl) iconPathEl.setAttribute('d', errorIconPath);
      }

      // Use .active class as defined in style.css
      confirmationModal.classList.add('active'); 

      // We still want the immediate opacity/scale for the animation start point if needed,
      // though .active should handle visibility and final opacity/scale.
      // Let's ensure the base Tailwind classes for the hidden state are definitely removed.
      confirmationModal.classList.remove('invisible', 'opacity-0');
      const modalContent = confirmationModal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.classList.remove('scale-95');
        // The .modal.active .modal-content rule in CSS should handle scaling to 1
      }
    };

    const hideModal = () => {
      console.log('hideModal called');
      // Remove .active class
      confirmationModal.classList.remove('active');

      // Optionally, re-add Tailwind initial hidden states if .active is the sole controller
      // For now, let's assume .active removal is enough if CSS is set up for it.
      // confirmationModal.classList.add('invisible', 'opacity-0'); 
      // const modalContent = confirmationModal.querySelector('.modal-content');
      // if (modalContent) {
      //   modalContent.classList.add('scale-95');
      // }
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.innerHTML : 'Send Message';

    contactForm.addEventListener('submit', async function(event) {
      console.log('Contact form submitted! Event listener triggered.');
      event.preventDefault();

      let originalButtonContent = '';
      if (submitButton) {
        originalButtonContent = submitButton.innerHTML; // Store original content
        submitButton.disabled = true;
        // Replace text with a spinner SVG
        submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const privacyAgreed = document.getElementById('privacy').checked;

      try {
        const response = await fetch('https://gdjtzahijnlncmluraaj.supabase.co/functions/v1/contact-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            privacy_agreed: privacyAgreed
          })
        });

        if (response.ok) {
          showModal(
            true, 
            'Message Sent!', 
            'Thank you for reaching out! We have received your message and sent a confirmation to your email. Please check your inbox (and spam/junk folder). You can reply to that email if you need to add more details.'
          );
          contactForm.reset();
        } else {
          let errorMessage = 'Message failed to send. Please try again.';
          try {
            const errorResult = await response.json();
            if (errorResult && errorResult.error) {
              errorMessage = errorResult.error.message || errorResult.error;
            } else if (errorResult && errorResult.message) {
              errorMessage = errorResult.message;
            } else if (response.statusText) {
              errorMessage = `Error ${response.status}: ${response.statusText}`;
            }
          } catch (e) {
            // If parsing error JSON fails, use the generic message
          }
          showModal(false, 'Submission Failed', errorMessage);
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showModal(false, 'Error', 'An error occurred while sending your message. Please try again later.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonContent; // Restore original content
        }
      }
    });

    closeModalButton.addEventListener('click', hideModal);

    confirmationModal.addEventListener('click', function(event) {
      if (event.target === confirmationModal) {
        hideModal();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && confirmationModal.classList.contains('visible')) {
        hideModal();
      }
    });

  } else {
    console.warn('Contact form or modal elements not found. Modal functionality will not be available.');
  }
  // End of Contact Form Modal Logic

}); // End of DOMContentLoaded
