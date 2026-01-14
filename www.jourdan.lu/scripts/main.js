// Jourdan 2040 - High Performance & Accessibility Script
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 0. Promo Banner Logic
    const promoBanner = document.getElementById('promo-banner');
    const closePromo = document.querySelector('.close-promo');

    if (closePromo && promoBanner) {
        closePromo.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }

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

    // 2. Scroll Reveal Animations (Staggered & Performance Optimized)
    const revealElements = document.querySelectorAll('.card, h2, .info-box, .hero-content');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Optional: Stagger transition delay for grid items
        // if (el.classList.contains('card')) { el.style.transitionDelay = '0.1s'; }
        revealObserver.observe(el);
    });

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

    // 4. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});
