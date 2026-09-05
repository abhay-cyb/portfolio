import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Magnetic Button Effect
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const position = el.getBoundingClientRect();
    const x = e.clientX - position.left - position.width / 2;
    const y = e.clientY - position.top - position.height / 2;

    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.6,
      ease: 'power3.out',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1.2, 0.4)',
    });
  });
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {
  
  // Hero Section Reveal
  const tl = gsap.timeline();
  
  tl.fromTo('.reveal-text', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
  );
  
  tl.fromTo('.reveal-image',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
    "-=0.6"
  );

  // Scroll Animations
  
  // Fade up sections
  const sections = gsap.utils.toArray('.section');
  sections.forEach((section, i) => {
    if(section.id === 'hero') return; // Skip hero as it's handled above
    
    gsap.fromTo(section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Staggered Timeline Items
  gsap.fromTo('.timeline-item',
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: "top 75%",
      }
    }
  );

  // Staggered Cards (Leadership, Skills, Achievements)
  const cardContainers = ['.grid-cards', '.skills-grid', '.metrics-grid'];
  
  cardContainers.forEach(container => {
    gsap.fromTo(`${container} .glass-card`,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        }
      }
    );
  });

  // Vision Mantra Text
  gsap.fromTo('.vision-mantra span',
    { y: 30, opacity: 0, scale: 0.9 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.vision-mantra',
        start: "top 80%",
      }
    }
  );
});
