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
  console.log('DOM fully loaded and parsed');

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
      loop: slides.length >= 2,
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
        768: { slidesPerView: 2, loop: slides.length >= 4 },
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
        return; 
      }
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

  // Contact Form Logic (Replaces Form with Status Message)
  const contactFormSection = document.getElementById('contact-form-section');
  const contactForm = document.getElementById('contact-page-form');
  const formStatusMessageSection = document.getElementById('form-status-message');

  console.log('Contact form section:', contactFormSection);
  console.log('Contact form element:', contactForm);
  console.log('Form status message section:', formStatusMessageSection);

  if (contactFormSection && contactForm && formStatusMessageSection) {
    console.log('All elements for form replacement found. Setting up...');

    const successIconSvg = `
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-5">
        <svg class="h-10 w-10 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>`;

    const errorIconSvg = `
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-5">
        <svg class="h-10 w-10 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>`;

    const displayFormStatus = (isSuccess, titleText, messageData) => {
      if (!formStatusMessageSection || !contactFormSection) {
        console.error('Form status section or contact form section not found for displayFormStatus');
        return;
      }
      
      const iconHtml = isSuccess ? successIconSvg : errorIconSvg;
      const titleColor = isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

      let statusHTML = '';

      if (isSuccess) {
        // messageData for success will be an object: { primaryMessage: string, userEmail: string, timelineIntro: string, timeline: array of objects }
        statusHTML = `
          ${iconHtml}
          <h2 class="text-2xl font-bold mb-2 ${titleColor}">${titleText}</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">${messageData.primaryMessage.replace(/\n/g, '<br>')}</p>
          
          <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg my-6 text-left">
            <h3 class="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Email Confirmation Sent</h3>
            <p class="text-sm text-gray-700 dark:text-gray-400">
              We've sent a confirmation email to <strong>${messageData.userEmail}</strong>. 
              Please check your email (and spam/junk folder) for a copy of your message and our response timeline.
            </p>
          </div>

          <div class="my-8 text-left">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">${messageData.timelineIntro}</h3>
            <ol class="relative border-l border-gray-200 dark:border-gray-700 space-y-6">
              ${messageData.timeline.map((item, index) => `
                <li class="ml-6">
                  <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-800 dark:bg-blue-900">
                    <span class="font-bold text-blue-600 dark:text-blue-300">${index + 1}</span>
                  </span>
                  <h4 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">${item.title}</h4>
                  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">${item.description}</p>
                </li>
              `).join('')}
            </ol>
          </div>
          
          <button id="back-to-home-button" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Back to Homepage
          </button>
        `;
      } else {
        // messageData for error is just the errorMessage string
        statusHTML = `
          ${iconHtml}
          <h2 class="text-2xl font-bold mb-3 ${titleColor}">${titleText}</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">${messageData.replace(/\n/g, '<br>')}</p>
          <button id="try-again-button" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
            Try Again
          </button>
        `;
      }

      formStatusMessageSection.innerHTML = statusHTML;

      if (isSuccess) {
        const backButton = formStatusMessageSection.querySelector('#back-to-home-button');
        if (backButton) {
          backButton.onclick = () => {
            window.location.href = 'index.html'; // Or your homepage URL
          };
        }
      } else {
        const tryAgainButton = formStatusMessageSection.querySelector('#try-again-button');
        if (tryAgainButton) {
          tryAgainButton.onclick = () => {
            formStatusMessageSection.classList.add('hidden');
            formStatusMessageSection.innerHTML = ''; // Clear it
            contactFormSection.classList.remove('hidden');
             if (submitButton) { 
               submitButton.disabled = false;
               submitButton.innerHTML = originalButtonContent;
             }
          };
        }
      }

      contactFormSection.classList.add('hidden');
      formStatusMessageSection.classList.remove('hidden');
      
      if (formStatusMessageSection.hasAttribute('data-aos')) {
         AOS.refreshHard(); 
      }
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');
    let originalButtonContent = submitButton ? submitButton.innerHTML : 'Send Message'; // Store initial button content
    
    contactForm.addEventListener('submit', async function(event) {
      console.log('Contact form submitted! Event listener triggered.');
      event.preventDefault();

      if (submitButton) {
        // originalButtonContent is already stored, no need to update it here again
        submitButton.disabled = true;
        submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      // Hide any previous status messages before new submission
      // and ensure form section is visible if it was hidden by a previous error.
      if (!formStatusMessageSection.classList.contains('hidden')) {
          formStatusMessageSection.classList.add('hidden');
      }
      if (contactFormSection.classList.contains('hidden')) {
          contactFormSection.classList.remove('hidden');
      }


      const formDataPayload = {
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        privacy_agreed: document.getElementById('privacy').checked
      };

      try {
        const response = await fetch('https://gdjtzahijnlncmluraaj.supabase.co/functions/v1/contact-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataPayload)
        });

        if (response.ok) {
          const userEmail = formDataPayload.email; // Get email from the submitted form data
          displayFormStatus(
            true, 
            'Message Sent Successfully!', 
            {
              primaryMessage: 'Thank you for reaching out to Elite Mutual Fund. We\'ve received your message and will get back to you within 24 hours.',
              userEmail: userEmail,
              timelineIntro: "What Happens Next?",
              timeline: [
                {
                  title: "Message Review",
                  description: "Our support team will review your message and determine the best expert to assist you with your financial needs."
                },
                {
                  title: "Expert Response",
                  description: "Within 24 hours, one of our financial advisors will reach out to you with personalized guidance and solutions."
                },
                {
                  title: "Follow-up Support",
                  description: "We'll continue to support you throughout your financial journey with ongoing advice and assistance."
                }
              ]
            }
          );
          contactForm.reset();
        } else {
          let errorMessage = 'Message failed to send. Please try again.';
          try {
            const errorResult = await response.json();
            if (errorResult && errorResult.error) { errorMessage = errorResult.error.message || errorResult.error; }
            else if (errorResult && errorResult.message) { errorMessage = errorResult.message; }
            else if (response.statusText) { errorMessage = `Error ${response.status}: ${response.statusText}`; }
          } catch (e) { /* Use generic message */ }
          displayFormStatus(false, 'Submission Failed', errorMessage);
          // When an error occurs, the form is hidden and status shown. 
          // Submit button will be re-enabled in finally, but form remains hidden.
          // Consider adding a "Try Again" button in displayFormStatus for errors.
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        displayFormStatus(false, 'Error', 'An error occurred while sending your message. Please try again later.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonContent;
          // If an error occurred and the form was replaced by status,
          // the button is restored but remains hidden with the form.
          // This is why a "Try Again" button in the status message would be good for errors.
        }
      }
    });

  } else {
    console.warn('Key elements for contact form (form section, form, or status message section) not found. Functionality will be limited.');
  }

}); // End of DOMContentLoaded
