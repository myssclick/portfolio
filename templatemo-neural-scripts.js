// Mobile menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Single RAF-throttled scroll handler
let scrollTicking = false;
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

function onScroll() {
    const scrolled = window.pageYOffset;

    if (header) header.classList.toggle('scrolled', scrolled > 50);

    let currentSection = '';
    const scrollPos = scrolled + 100;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            currentSection = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });

    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(onScroll);
        scrollTicking = true;
    }
}, { passive: true });
window.addEventListener('load', onScroll);

// Lightweight particles (no box-shadow, halved frequency)
function createQuantumParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const colors = ['#00ffff', '#ff0080', '#8000ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = `position:fixed;width:${size}px;height:${size}px;background:${color};border-radius:50%;left:${Math.random() * 100}%;top:100vh;pointer-events:none;z-index:-1;will-change:transform,opacity;`;
    document.body.appendChild(particle);

    const drift = (Math.random() - 0.5) * 200;
    particle.animate([
        { transform: 'translateY(0) translateX(0)', opacity: 0 },
        { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 0.7 }
    ], { duration: Math.random() * 3000 + 2000, easing: 'ease-out' }).onfinish = () => particle.remove();
}

setInterval(createQuantumParticle, 3000);

// Scroll-in animations (unobserve after trigger to stop watching)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.timeline-content, .hexagon, .experience-card, .skills-summary, .career-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});
