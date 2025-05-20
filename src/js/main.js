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

  // Initialize Swiper with proper modules
  const swiper = new Swiper('.testimonial-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    a11y: {
      prevSlideMessage: 'Previous testimonial',
      nextSlideMessage: 'Next testimonial',
      firstSlideMessage: 'This is the first testimonial',
      lastSlideMessage: 'This is the last testimonial',
    },
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
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
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });
  
  // Mobile menu toggle with improved accessibility
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Initialize testimonial slider with improved accessibility
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.testimonial-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      a11y: {
        lastSlideMessage: 'This is the last testimonial',
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }
  
  // Animated counters
  const counters = document.querySelectorAll('.counter-value');
  
  if (counters.length > 0 && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
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
          
          updateCount();
          observer.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  }
});
