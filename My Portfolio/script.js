document.addEventListener('DOMContentLoaded', function() {
    // ============ Mobile Navigation ============
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    mobileNavToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close sidebar when clicking on a nav link (on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                mobileNavToggle.querySelector('i').classList.remove('fa-times');
                mobileNavToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // ============ Theme Toggle ============
    const themeCheckbox = document.getElementById('theme-checkbox');
    const themeStyle = document.getElementById('theme-style');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeCheckbox.checked = true;
        themeStyle.href = 'css/dark-mode.css';
    }
    
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            themeStyle.href = 'css/dark-mode.css';
            localStorage.setItem('theme', 'dark');
        } else {
            themeStyle.href = '';
            localStorage.setItem('theme', 'light');
        }
    });

    // ============ Typing Animation ============
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
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
    const sections = document.querySelectorAll('.section');
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
    
    // ============ FIXED: View My Work Button ============
    const viewWorkBtn = document.getElementById('view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            
            isProgrammaticScroll = true;
            window.scrollTo({
                top: portfolioSection.offsetTop,
                behavior: 'smooth'
            });
            
            setActiveSection('portfolio');
            
            setTimeout(() => {
                isProgrammaticScroll = false;
            }, 1000);
        });
    }
    
    // Resume download tracking
    document.querySelector('.secondary-btn').addEventListener('click', function(e) {
        console.log('Resume downloaded!');
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
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
            alert('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize
    setActiveSection('home');
});
