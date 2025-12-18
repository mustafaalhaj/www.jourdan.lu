// Jourdan 2040 - High Performance & Accessibility Script
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle State
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Animation for hamburger icon (simple class toggle if needed, or CSS based)
            menuToggle.classList.toggle('open');

            // Trap focus if menu is open (basic implementation)
            if (!isExpanded) {
                // Menu opening
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                // Menu closing
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Intersection Observer for Animations (Performance Optimized)
    const cards = document.querySelectorAll('.card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px' // Start slightly before
        });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            // Use CSS transition defined in stylesheet, but we can delay here if needed
            // card.style.transitionDelay = `${index * 0.1}s`; 
            observer.observe(card);
        });
    } else {
        // Fallback for older browsers
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
    }

    // 3. Header Scroll Effect (Performance Optimized)
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0'; // Compact mode
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = ''; // Default
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
});
