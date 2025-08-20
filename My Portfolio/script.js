document.addEventListener('DOMContentLoaded', function() {
    // ============ Theme Toggle ============
    
    const themeCheckbox = document.getElementById('theme-checkbox');
    const themeStyle = document.getElementById('theme-style');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeCheckbox.checked = true;
        themeStyle.href = 'dark-mode.css';
    }
    
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            themeStyle.href = 'dark-mode.css';
            localStorage.setItem('theme', 'dark');
        } else {
            themeStyle.href = 'light-mode.css';
            localStorage.setItem('theme', 'light');
        }
    });

    // ============ Typing Animation ============
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {  // Only run if element exists
        const cursorElement = document.querySelector('.cursor');
        
        const skills = [
            " Web Developer",
            " UI/UX Designer",
            " Skilled Developer in Git/GitHub",
            " Coder",
            " Tech Enthusiast"
        ];
        
        let skillIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentSkill = skills[skillIndex];
            
            if (isDeleting) {
                // Deleting chars
                typedTextElement.textContent = currentSkill.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing chars
                typedTextElement.textContent = currentSkill.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Determine typing speed
            let typeSpeed = 150;
            if (isDeleting) {
                typeSpeed /= 2; // Faster deletion
            }
            
            // When word is complete
            if (!isDeleting && charIndex === currentSkill.length) {
                isEnd = true;
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                skillIndex++;
                if (skillIndex === skills.length) {
                    skillIndex = 0; // Loop back to first skill
                }
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing animation after short delay
        setTimeout(type, 1000);
    }

    // ============ Navigation ============
    // ====== SCROLL MANAGEMENT FIX ======
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
let isProgrammaticScroll = false;
let currentSection = 'home';
const sectionMargin = 100; // Adjust this value as needed

// Function to set active section
function setActiveSection(sectionId) {
    if (currentSection === sectionId) return;
    currentSection = sectionId;
    
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
}

// Handle scroll events
function handleScroll() {
    if (isProgrammaticScroll) return;
    
    const scrollPosition = window.scrollY + (window.innerHeight / 4);
    let newSection = currentSection;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop - sectionMargin && 
            scrollPosition < sectionBottom - sectionMargin) {
            newSection = section.id;
        }
    });
    
    if (newSection !== currentSection) {
        setActiveSection(newSection);
    }
}

// Debounced scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (isProgrammaticScroll) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 100);
});

// Click navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        isProgrammaticScroll = true;
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        setActiveSection(targetId);
        
        setTimeout(() => {
            isProgrammaticScroll = false;
        }, 1000);
    });
});
document.querySelector('.secondary-btn').addEventListener('click', function(e) {
  // Optional: Track downloads with analytics
  console.log('Resume downloaded!');
});
// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would normally send data to a server
            // For now, we'll show a success message
            alert('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Send to Formspree, EmailJS, or your backend
            // sendEmail(data);
        });
    }
});
// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // View My Work button
    const viewWorkBtn = document.getElementById('view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});


// Initialize
setActiveSection('home');
});