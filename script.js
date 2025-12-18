<script>

// ===========================
// Smooth Scroll & Header
// ===========================
document.addEventListener('DOMContentLoaded', function() {

    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const companiesBar = document.getElementById('companiesBar');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const companiesBarHeight = companiesBar.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===========================
    // Scroll Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.company-card, .stat-item, .feature-item, .service-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===========================
    // Companies Bar Interactions
    // ===========================
    const companyItems = document.querySelectorAll('.company-item');
    companyItems.forEach(item => {
        item.addEventListener('click', function() {
            const companyName = this.querySelector('.company-name').textContent;
            console.log('Kliknięto firmę:', companyName);

            // Highlight effect
            companyItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===========================
    // Contact Form
    // ===========================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            // Symulacja wysyłki (tutaj klient doda właściwy endpoint)
            alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
            this.reset();

            // Tu będzie integracja z prawdziwym API
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }

    // ===========================
    // Language Switcher
    // ===========================
    const langSwitch = document.querySelector('.lang-switch a');
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = this.getAttribute('data-lang');

            if (currentLang === 'en') {
                // Przełącz na polską wersję
                this.textContent = 'EN';
                this.setAttribute('data-lang', 'pl');
                // Tutaj logika zmiany treści na polski
            } else {
                // Przełącz na angielską wersję
                this.textContent = 'PL';
                this.setAttribute('data-lang', 'en');
                // Tutaj logika zmiany treści na angielski
            }
        });
    }

    // ===========================
    // Parallax Effect (subtle)
    // ===========================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // ===========================
    // Stats Counter Animation
    // ===========================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const number = entry.target.querySelector('.stat-number');
                if (number) {
                    const text = number.textContent;
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.replace(/[0-9]/g, '');

                    number.dataset.suffix = suffix;
                    number.textContent = '0' + suffix;
                    animateCounter(number, value);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===========================
    // Add active state to companies bar
    // ===========================
    const style = document.createElement('style');
    style.textContent = `
        .company-item.active {
            background-color: rgba(200,90,60,0.2);
        }
    `;
    document.head.appendChild(style);

});

// ===========================
// Window Resize Handler
// ===========================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    }, 250);
});
</script>