// Main Interactions for Jourdan 2040
document.addEventListener('DOMContentLoaded', () => {
    console.log('System 2040 Initialized');
    
    // Add hover sound effect (optional, keep subtle)
    // const hoverSound = new Audio('assets/hover.mp3'); 
    
    // Dynamic entry animations for cards
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(card);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 11, 20, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(5, 11, 20, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});
