(function() {
    'use strict';

    // === CONSTANTES ===
    const SCROLL_THRESHOLD = 100;
    const MOBILE_BREAKPOINT = 768;

    // === SÉLECTEURS ===
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // === FONCTIONS UTILITAIRES ===
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    // === MENU MOBILE ===
    function toggleMenu() {
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }
    }

    function closeMenu() {
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    // === HEADER COLLAPSE (desktop only) ===
    function handleScroll() {
        if (!header) return;

        if (isMobile()) {
            header.classList.remove('collapsed');
            return;
        }

        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('collapsed');
        } else {
            header.classList.remove('collapsed');
        }
    }

    // === SMOOTH SCROLL ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    closeMenu();

                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // === ANIMATIONS AU SCROLL ===
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        document.querySelectorAll('.service-card, .realisation-card, .about-stats__item').forEach(el => {
            observer.observe(el);
        });
    }

    // === EVENT LISTENERS ===
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // === INIT ===
    document.addEventListener('DOMContentLoaded', function() {
        handleScroll();
        initSmoothScroll();
        initScrollAnimations();
        console.log('MJ Rénov - Site loaded');
    });

})();
