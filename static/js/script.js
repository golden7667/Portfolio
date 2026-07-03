// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // 1.5. Initialize Particles.js (Starry Background)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.8, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } 
                },
                "size": { 
                    "value": 2.5, 
                    "random": true, 
                    "anim": { "enable": false } 
                },
                "line_linked": { "enable": false },
                "move": { 
                    "enable": true, 
                    "speed": 0.5, 
                    "direction": "top", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "out", 
                    "bounce": false 
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "repulse" }, 
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                },
                "modes": { 
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 200, "size": 4, "duration": 2, "opacity": 1, "speed": 3 }, 
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Typewriter Effect for Hero Section
    const roles = ["Machine Learning Engineer", "Python Developer", "Frontend Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    const typewriterElement = document.getElementById('typewriter');

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if(typewriterElement) {
        setTimeout(typeEffect, 1000); // Start after 1 second
    }

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 4. Update Footer Year dynamically
    document.getElementById('year').textContent = new Date().getFullYear();

    // 5. Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-text').forEach(el => el.classList.add('hidden'));
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            if (!name) { document.getElementById('nameError').classList.remove('hidden'); isValid = false; }
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) { document.getElementById('emailError').classList.remove('hidden'); isValid = false; }
            if (!subject) { document.getElementById('subjectError').classList.remove('hidden'); isValid = false; }
            if (message.length < 20) { document.getElementById('messageError').classList.remove('hidden'); isValid = false; }
            
            if (!isValid) {
                showToast('warning', 'Please fix the errors in the form.');
                contactForm.classList.add('shake');
                setTimeout(() => contactForm.classList.remove('shake'), 300);
                return;
            }
            
            // Loading State
            const btn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            
            btn.disabled = true;
            btnText.textContent = 'Sending...';
            btnSpinner.classList.remove('hidden');
            
            try {
                const response = await fetch('https://formsubmit.co/ajax/goldenkrsingh921@gmail.com', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        _subject: "New Portfolio Submission: " + subject
                    })
                });
                
                const result = await response.json();
                
                if (response.ok && result.success === 'true') {
                    showSuccessModal();
                    contactForm.reset();
                    showToast('success', 'Message sent successfully! Check your email.');
                } else {
                    throw new Error(result.message || 'Server error');
                }
            } catch (error) {
                showToast('error', '❌ Something went wrong. Please try again later.');
            } finally {
                // Restore button
                btn.disabled = false;
                btnText.textContent = 'Send Message';
                btnSpinner.classList.add('hidden');
            }
        });
    }

    // Modal Logic
    const successModal = document.getElementById('successModal');
    const successModalContent = document.getElementById('successModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function showSuccessModal() {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        // Trigger reflow
        void successModal.offsetWidth;
        successModal.classList.remove('opacity-0');
        successModalContent.classList.remove('scale-95');
    }

    function hideSuccessModal() {
        successModal.classList.add('opacity-0');
        successModalContent.classList.add('scale-95');
        setTimeout(() => {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
        }, 300);
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', hideSuccessModal);

    // Toast Logic
    function showToast(type, text) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        let bgColor = 'bg-gray-800';
        let icon = '';
        
        if (type === 'success') { bgColor = 'bg-green-600'; icon = '<i class="fas fa-check-circle mr-2"></i>'; }
        if (type === 'error') { bgColor = 'bg-red-600'; icon = '<i class="fas fa-exclamation-circle mr-2"></i>'; }
        if (type === 'warning') { bgColor = 'bg-yellow-500 text-gray-900'; icon = '<i class="fas fa-exclamation-triangle mr-2"></i>'; }
        
        toast.className = `toast-enter flex items-center px-4 py-3 rounded-lg shadow-lg text-white ${bgColor}`;
        toast.innerHTML = `${icon} <span>${text}</span>`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.replace('toast-enter', 'toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    // 6. Interactive Star Burst on Profile Photo Hover/Click
    const profilePhotoContainer = document.getElementById('profilePhotoContainer');
    if (profilePhotoContainer) {
        
        function spawnStar(e) {
            const star = document.createElement('i');
            star.className = 'fas fa-star text-yellow-300 absolute pointer-events-none z-[100]';
            
            // Random size between 8px and 23px
            const size = Math.random() * 15 + 8;
            star.style.fontSize = `${size}px`;
            
            // Fixed position based on mouse coordinates
            star.style.left = `${e.clientX}px`;
            star.style.top = `${e.clientY}px`;
            star.style.position = 'fixed';
            
            // Random trajectory
            const tx = (Math.random() - 0.5) * 300;
            const ty = (Math.random() - 0.5) * 300;
            
            star.style.setProperty('--tx', `${tx}px`);
            star.style.setProperty('--ty', `${ty}px`);
            
            star.style.animation = 'star-fly 1.2s ease-out forwards';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 1200);
        }

        // Spawn occasional stars on hover/mousemove
        profilePhotoContainer.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) {
                spawnStar(e);
            }
        });

        // Spawn a massive burst of stars on click
        profilePhotoContainer.addEventListener('click', (e) => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => spawnStar(e), i * 30);
            }
        });
    }

    // 7. Global Mouse Star Trail Effect
    let lastStarTime = 0;
    document.addEventListener('mousemove', (e) => {
        // Prevent stars from spawning when hovering over the profile photo, as it has its own effect
        if (e.target.closest('#profilePhotoContainer')) return;
        
        const now = Date.now();
        // Spawn a trailing star every 60ms
        if (now - lastStarTime > 60) {
            spawnGlobalStar(e.clientX, e.clientY);
            lastStarTime = now;
        }
    });

    function spawnGlobalStar(x, y) {
        const star = document.createElement('i');
        // Alternating colors for magical effect
        const colors = ['text-blue-400', 'text-purple-400', 'text-yellow-200'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        star.className = `fas fa-star ${randomColor} absolute pointer-events-none z-[100]`;
        
        // Smaller stars for the trail
        const size = Math.random() * 6 + 4; 
        star.style.fontSize = `${size}px`;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.position = 'fixed';
        
        // Gentle downward drift
        const tx = (Math.random() - 0.5) * 40;
        const ty = Math.random() * 40 + 20; 
        
        star.style.setProperty('--tx', `${tx}px`);
        star.style.setProperty('--ty', `${ty}px`);
        
        star.style.animation = 'star-fly 0.7s ease-out forwards';
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 700);
    }

});
