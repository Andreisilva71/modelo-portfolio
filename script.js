document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle Mobile Menu
    if (mobileBtn && overlay) {
        mobileBtn.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Intersection Observer for scroll animations (fade-up elements)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Active Navigation Link & Footer visibility updating based on scroll position
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => {
        const href = link.getAttribute('href');
        if(href.startsWith('#')) return document.querySelector(href);
        return null;
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
        let current = 'home'; // default to home
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // offset for header

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Hide social links on Desktop and Mobile when "Sobre" is active
        if (current === 'sobre') {
            document.body.classList.add('section-sobre-active');
        } else {
            document.body.classList.remove('section-sobre-active');
        }

        // Update Nav links (desktop)
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update Mobile Nav links
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
