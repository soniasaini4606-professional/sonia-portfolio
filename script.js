// Initialize AOS
AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navbar toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero CTA scroll
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Skills Slider
const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const skillItems = document.querySelectorAll('.skill-item');
let currentSlide = 0;
const totalSlides = Math.ceil(skillItems.length / 3); // Show 3 at a time on desktop

function updateSlider() {
    const translateX = -(currentSlide * 33.33); // Approx 1/3 width
    sliderWrapper.style.transform = `translateX(${translateX}%)`;
}

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

// Auto slide
setInterval(() => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updateSlider();
}, 5000);

// Responsive slider adjustment
function handleResize() {
    const width = window.innerWidth;
    if (width < 768) {
        // Mobile: show 1 at a time
        totalSlidesMobile = skillItems.length;
        // Adjust logic if needed
    }
}
window.addEventListener('resize', handleResize);

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
    const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
    const message = formData.get('message') || contactForm.querySelector('textarea').value;

    if (name && email && message) {
        alert('Thank you for your message! I\'ll get back to you soon via email. \\n\\nName: ' + name + '\\nEmail: ' + email + '\\nMessage: ' + message.substring(0, 100) + '...');
        contactForm.reset();
    } else {
        alert('Please fill all fields!');
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            if (progress) {
                progress.style.animationPlayState = 'running';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
