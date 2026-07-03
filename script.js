// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 1000);
});

// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline with slight delay for smooth effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 300, fill: "forwards" });
    });

    // Cursor Hover Effects
    const hoverables = document.querySelectorAll('a, button, input, select, textarea, .portfolio-item, .service-card, .faq-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll & Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.dataset.progress;
            entry.target.style.width = `${progress}%`;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Animated Counters
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const increment = target / 50;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.innerText = target;
                    clearInterval(counter);
                } else {
                    entry.target.innerText = Math.floor(current);
                }
            }, stepTime);
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Portfolio Modal
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalCategory = modal.querySelector('.modal-category');
const modalTitle = modal.querySelector('.modal-title');
const modalImageWrapper = modal.querySelector('.modal-image-wrapper');
const modalImgTag = modal.querySelector('.modal-img-tag');

const projectData = {
    1: { cat: 'طراحی وب', title: 'فروشگاه آنلاین مدرن', thumb: 'thumb-1' },
    2: { cat: 'رابط کاربری', title: 'اپلیکیشن موبایل بانک', thumb: 'thumb-2' },
    3: { cat: 'برندینگ', title: 'هویت بصری کافه', thumb: 'thumb-3' },
    4: { cat: 'طراحی وب', title: 'سایت آژانس خلاقیت', thumb: 'thumb-4' },
    5: { cat: 'رابط کاربری', title: 'داشبورد مدیریتی', thumb: 'thumb-5' },
    6: { cat: 'برندینگ', title: 'بسته بندی محصول', thumb: 'thumb-6' }
};

document.querySelectorAll('.portfolio-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.project;
        const data = projectData[projectId];
        
        modalCategory.innerText = data.cat;
        modalTitle.innerText = data.title;
        
        // Update background wrapper class
        modalImageWrapper.className = 'modal-image-wrapper ' + data.thumb;
        
        // Update image src and handle display for fallback
        modalImgTag.src = `img/proj-${projectId}.jpg`;
        modalImgTag.style.display = 'block'; // Reset display before attempting to load
        
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Contact Form Validation & Formspree Submission
const form = document.getElementById('contactForm');
const formSuccess = document.querySelector('.form-success');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Text Inputs
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        const group = input.parentElement;
        group.classList.remove('error');
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        } else if (input.type === 'tel') {
            const phoneRegex = /^09[0-9]{9}$/;
            if (!phoneRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        } else if (input.value.trim() === '') {
            group.classList.add('error');
            isValid = false;
        }
    });

    if (isValid) {
        // Change button state to loading
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "در حال ارسال...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";

        // Send data to Formspree
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                form.reset();
                formSuccess.classList.add('active');
                
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                
                setTimeout(() => {
                    formSuccess.classList.remove('active');
                }, 5000);
            } else {
                alert('خطایی در ارسال فرم رخ داد. لطفاً مستقیماً از طریق واتساپ یا تلگرام اقدام کنید.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            }
        }).catch(error => {
            alert('خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        });
    }
});

// 3D Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');
if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic');
if (window.innerWidth > 768) {
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Mouse Parallax for Hero
const heroBlobs = document.querySelectorAll('.blob');
const profileShape = document.querySelector('.profile-bg-shape');
if (window.innerWidth > 768) {
    document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        heroBlobs.forEach((blob, index) => {
            const depth = (index + 1) * 20;
            blob.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
        
        if(profileShape) {
            profileShape.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }
    });
}
// Testimonials Slider Logic
const track = document.getElementById('testimonialTrack');
const slides = track.children;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let slidesToShow = 3;

function updateSlidesToShow() {
    if (window.innerWidth <= 768) slidesToShow = 1;
    else if (window.innerWidth <= 992) slidesToShow = 2;
    else slidesToShow = 3;
    
    // Reset index if out of bounds
    if (currentIndex > slides.length - slidesToShow) {
        currentIndex = Math.max(0, slides.length - slidesToShow);
    }
    updateSlider();
    createDots();
}

function updateSlider() {
    const slideWidth = 100 / slidesToShow;
    // RTL fix: translateX positive value moves to the left visually in RTL
    track.style.transform = `translateX(${currentIndex * slideWidth}%)`;
    updateDots();
}

function createDots() {
    dotsContainer.innerHTML = '';
    const dotCount = slides.length - slidesToShow + 1;
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
        if (i === currentIndex) dots[i].classList.add('active');
    }
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - slidesToShow) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - slidesToShow; // Loop to end
    }
    updateSlider();
});

// Initial setup and resize listener
window.addEventListener('resize', updateSlidesToShow);
updateSlidesToShow();

// Add hover effect for custom cursor on slider buttons and dots
const sliderHoverables = document.querySelectorAll('.slider-btn, .dot');
if (window.innerWidth > 768) {
    sliderHoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}