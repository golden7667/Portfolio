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

    // 1.7. Python 3D Component Engine & VanillaTilt Perspective Initializer
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.tilt-card, .hover-card, .glass-card');
        tiltElements.forEach(el => {
            if (!el.classList.contains('tilt-card')) {
                el.classList.add('tilt-card');
            }
            if (!el.classList.contains('preserve-3d')) {
                el.classList.add('preserve-3d');
            }
        });

        fetch('/api/3d-portfolio-components')
            .then(res => res.json())
            .then(data => {
                const maxTilt = data.components ? data.components.skills.maxTilt : 16;
                const perspective = data.components ? data.components.skills.perspective : 1200;

                VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
                    max: maxTilt,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.35,
                    scale: 1.04,
                    perspective: perspective
                });
            })
            .catch(() => {
                VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
                    max: 16,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.35,
                    scale: 1.04,
                    perspective: 1200
                });
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

    // 3. Navbar scroll effect & Mobile Menu Toggle
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            } else {
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-times');
            }
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (mobileMenuIcon) {
                    mobileMenuIcon.classList.remove('fa-times');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            });
        });
    }

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
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });
                
                const result = await response.json();
                
                if (response.ok && result.status === 'success') {
                    showSuccessModal();
                    contactForm.reset();
                    showToast('success', '✨ Message Sent! Notification email sent to goldenkrsingh921@gmail.com and SMS alert dispatched to +91 7667711403!');
                } else {
                    throw new Error(result.message || 'Server error');
                }
            } catch (error) {
                showToast('error', error.message || '❌ Something went wrong. Please try again later.');
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

    // 5. Python-Driven Full-Screen 3D Cyan Wireframe Polyhedron & Cyber Particle Background Engine
    function init3DPythonBackground() {
        const bgCanvas = document.getElementById('bg3dCanvas');
        if (!bgCanvas || typeof THREE === 'undefined') return;

        const bgScene = new THREE.Scene();
        bgScene.fog = new THREE.FogExp2(0x020617, 0.008);

        const bgCamera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        bgCamera.position.set(0, 0, 48);

        const bgRenderer = new THREE.WebGLRenderer({
            canvas: bgCanvas,
            alpha: true,
            antialias: true
        });
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
        bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const bgGroup = new THREE.Group();
        bgScene.add(bgGroup);

        // Ambient & Dynamic Point Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        bgScene.add(ambientLight);

        // Dynamic 3D Cursor Point Light (Illuminates 3D Cyan Wireframe & Particles as cursor moves)
        const cursorLight = new THREE.PointLight(0x38bdf8, 5.5, 75);
        cursorLight.position.set(0, 0, 20);
        bgScene.add(cursorLight);

        const cyanGlowLight = new THREE.PointLight(0x06b6d4, 4.0, 80);
        cyanGlowLight.position.set(-20, 5, 5);
        bgScene.add(cyanGlowLight);

        let polyhedronMesh = null;
        let nodePointsMesh = null;
        let particleSystem = null;
        let pSpinData = { spinX: 0.003, spinY: 0.006 };

        // Fetch 3D spatial node matrices calculated by Python
        fetch('/api/3d-background-nodes')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    // 1. Render 3D Cyan Geodesic Polyhedron Wireframe Mesh computed by Python
                    if (data.polyhedron) {
                        const pData = data.polyhedron;
                        pSpinData.spinX = pData.spin[0];
                        pSpinData.spinY = pData.spin[1];

                        // Create Geodesic Icosahedron Geometry (Sphere Polyhedron)
                        const pGeo = new THREE.IcosahedronGeometry(pData.radius, pData.detail);
                        
                        // Cyan Wireframe Material matching the screenshot
                        const pMat = new THREE.MeshStandardMaterial({
                            color: 0x38bdf8,
                            wireframe: true,
                            transparent: true,
                            opacity: 0.75,
                            roughness: 0.1,
                            metalness: 0.9,
                            emissive: 0x0284c7,
                            emissiveIntensity: 0.45
                        });

                        polyhedronMesh = new THREE.Mesh(pGeo, pMat);
                        polyhedronMesh.position.set(pData.pos[0], pData.pos[1], pData.pos[2]);

                        // Add Glowing Node Vertices on Polyhedron Vertices
                        const pVerts = pGeo.attributes.position.array;
                        const vPositions = new Float32Array(pVerts.length);
                        for (let i = 0; i < pVerts.length; i++) {
                            vPositions[i] = pVerts[i];
                        }
                        const vGeo = new THREE.BufferGeometry();
                        vGeo.setAttribute('position', new THREE.BufferAttribute(vPositions, 3));
                        const vMat = new THREE.PointsMaterial({
                            color: 0x38bdf8,
                            size: 0.4,
                            transparent: true,
                            opacity: 0.9
                        });
                        nodePointsMesh = new THREE.Points(vGeo, vMat);
                        polyhedronMesh.add(nodePointsMesh);

                        bgGroup.add(polyhedronMesh);
                    }

                    // 2. Render 350+ Glowing Cyan & Electric Blue Depth Particles computed by Python
                    if (data.particles && data.particles.length > 0) {
                        const count = data.particles.length;
                        const posArray = new Float32Array(count * 3);
                        const colorArray = new Float32Array(count * 3);

                        data.particles.forEach((pt, i) => {
                            posArray[i * 3] = pt.pos[0];
                            posArray[i * 3 + 1] = pt.pos[1];
                            posArray[i * 3 + 2] = pt.pos[2];

                            const c = new THREE.Color(pt.color);
                            colorArray[i * 3] = c.r;
                            colorArray[i * 3 + 1] = c.g;
                            colorArray[i * 3 + 2] = c.b;
                        });

                        const particleGeo = new THREE.BufferGeometry();
                        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                        particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

                        const particleMat = new THREE.PointsMaterial({
                            size: 0.35,
                            vertexColors: true,
                            transparent: true,
                            opacity: 0.85
                        });

                        particleSystem = new THREE.Points(particleGeo, particleMat);
                        bgScene.add(particleSystem);
                    }
                }
            })
            .catch(err => console.error("Could not fetch 3D background data from Python:", err));

        // Mouse & Scroll Parallax Tracking
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        let scrollY = 0;
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        // Animation Loop
        let clock = new THREE.Clock();

        function animate3DBg() {
            requestAnimationFrame(animate3DBg);

            const elapsedTime = clock.getElapsedTime();

            // Dynamic Cursor Light Tracking in 3D Space
            cursorLight.position.x = mouseX * 30;
            cursorLight.position.y = -mouseY * 30;

            // Rotate Floating 3D Geodesic Polyhedron Wireframe Mesh
            if (polyhedronMesh) {
                polyhedronMesh.rotation.x += pSpinData.spinX;
                polyhedronMesh.rotation.y += pSpinData.spinY;
                polyhedronMesh.position.y = 4.0 + Math.sin(elapsedTime * 1.2) * 1.2;
            }

            // Animate Swirling Cyber Particle Field
            if (particleSystem) {
                particleSystem.rotation.y = elapsedTime * 0.025;
                particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03;
            }

            // Parallax camera lerp + Scroll Space Depth Glide
            targetX = mouseX * 7;
            targetY = -mouseY * 7 - (scrollY * 0.02);

            bgCamera.position.x += (targetX - bgCamera.position.x) * 0.04;
            bgCamera.position.y += (targetY - bgCamera.position.y) * 0.04;
            bgCamera.lookAt(0, 0, 0);

            bgRenderer.render(bgScene, bgCamera);
        }

        animate3DBg();

        // Window Resize Listener
        window.addEventListener('resize', () => {
            bgCamera.aspect = window.innerWidth / window.innerHeight;
            bgCamera.updateProjectionMatrix();
            bgRenderer.setSize(window.innerWidth, window.innerHeight);
            bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    // Initialize Python-driven 3D Background Engine
    init3DPythonBackground();

});
