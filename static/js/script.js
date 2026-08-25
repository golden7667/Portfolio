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

    // 3D Profile Button Click Handler
    const btn3dProfile = document.getElementById('btn3dProfile');
    if (btn3dProfile) {
        btn3dProfile.addEventListener('click', (e) => {
            const profileContainer = document.getElementById('profilePhotoContainer');
            if (profileContainer) {
                profileContainer.classList.add('animate-bounce');
                setTimeout(() => profileContainer.classList.remove('animate-bounce'), 1000);
                
                const rect = profileContainer.getBoundingClientRect();
                const fakeEvent = {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                };
                for (let i = 0; i < 25; i++) {
                    setTimeout(() => {
                        if (typeof spawnStar === 'function') spawnStar(fakeEvent);
                    }, i * 25);
                }
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

    // 8. Python Code Execution Simulator Engine
    function initPythonSimulator() {
        const codeInput = document.getElementById('pythonCodeInput');
        const lineNumbers = document.getElementById('lineNumbers');
        const runBtn = document.getElementById('runCodeBtn');
        const resetBtn = document.getElementById('resetCodeBtn');
        const copyBtn = document.getElementById('copyCodeBtn');
        const clearTermBtn = document.getElementById('clearTerminalBtn');
        const currentFileName = document.getElementById('currentFileName');
        const consoleText = document.getElementById('consoleLogText');
        const terminalStatusText = document.getElementById('terminalStatusText');
        
        const execTimeBadge = document.getElementById('execTimeBadge');
        const execLinesBadge = document.getElementById('execLinesBadge');
        const execMemBadge = document.getElementById('execMemBadge');

        if (!codeInput || !runBtn) return;

        // Code Presets Dictionary
        const presets = {
            ml_training: {
                filename: 'ml_pipeline.py',
                code: `# Machine Learning Preprocessing & Model Evaluation Simulator\n# Built for Golden Kumar's ML Portfolio\n\nimport math\nimport random\n\nprint("--- ML DATASET TRAIN/TEST SPLIT & METRICS ---")\n\n# 1. Generate Synthetic Dataset (Features X, Labels y)\nsamples = 50\nfeatures = [[round(random.uniform(1.0, 10.0), 2), round(random.uniform(20, 80), 2)] for _ in range(samples)]\nlabels = [1 if (f[0] * 1.5 + f[1] * 0.2) > 15 else 0 for f in features]\n\n# 2. Perform 80/20 Train-Test Split\nsplit_idx = int(samples * 0.8)\ntrain_X, test_X = features[:split_idx], features[split_idx:]\ntrain_y, test_y = labels[:split_idx], labels[split_idx:]\n\nprint(f"Total Samples: {samples}")\nprint(f"Train Set Size: {len(train_X)} samples")\nprint(f"Test Set Size:  {len(test_X)} samples")\n\n# 3. Predict & Calculate Model Metrics\ncorrect_predictions = sum(1 for x, y in zip(test_X, test_y) if (x[0] * 1.5 + x[1] * 0.2 > 15) == bool(y))\naccuracy = (correct_predictions / len(test_y)) * 100\n\nprint(f"\\n[Model Metrics]:")\nprint(f"Accuracy: {accuracy:.2f}%")\nprint(f"Status: Model successfully evaluated!")`
            },
            steel_prediction: {
                filename: 'steel_analytics.py',
                code: `# Steel Mechanical Properties Prediction Algorithm\n# Simulates Tensile Strength & Yield Stress Estimation\n\nimport math\n\nprint("=== STEEL MECHANICAL PROPERTIES ANALYTICS ===")\n\n# Chemical composition (% elements)\nalloys = [\n    {"id": "Steel-A1", "C": 0.25, "Mn": 1.20, "Si": 0.35, "Cr": 0.50},\n    {"id": "Steel-B2", "C": 0.40, "Mn": 1.45, "Si": 0.40, "Cr": 0.85},\n    {"id": "Steel-C3", "C": 0.18, "Mn": 0.90, "Si": 0.20, "Cr": 0.15},\n]\n\ndef predict_yield_stress(c, mn, si, cr):\n    # Regression formula simulation: YS = 220 + 380*C + 85*Mn + 110*Si + 95*Cr\n    return 220 + (380 * c) + (85 * mn) + (110 * si) + (95 * cr)\n\nprint("Sample ID | Carbon(%) | Manganese(%) | Estimated Yield Stress (MPa)")\nprint("-" * 65)\n\nfor alloy in alloys:\n    ys = predict_yield_stress(alloy["C"], alloy["Mn"], alloy["Si"], alloy["Cr"])\n    print(f"{alloy['id']:<9} | {alloy['C']:^9.2f} | {alloy['Mn']:^12.2f} | {ys:>12.2f} MPa")\n\nprint("\\nPrediction complete: Alloys meet structural compliance standards.")`
            },
            face_vector: {
                filename: 'facial_verification.py',
                code: `# Facial Vector Recognition Distance Engine\n# Biometric Verification Simulation for Attendance Tracking\n\nimport math\n\nprint(">>> BIOMETRIC FACE RECOGNITION MATCHING ENGINE <<<")\n\n# 128-D Feature Embedding Vector Simulation (Truncated)\nknown_face_encoding = [0.142, -0.052, 0.311, 0.892, -0.421, 0.198, -0.076, 0.542]\nscanned_face_encoding = [0.145, -0.049, 0.308, 0.885, -0.415, 0.201, -0.071, 0.539]\n\ndef euclidean_distance(v1, v2):\n    return math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))\n\ndistance = euclidean_distance(known_face_encoding, scanned_face_encoding)\nthreshold = 0.40  # Matching tolerance threshold\n\nprint(f"Scanned Face Vector Dimension: {len(scanned_face_encoding)}-D")\nprint(f"Calculated Euclidean Distance: {distance:.5f}")\nprint(f"Match Threshold Limit:        {threshold:.2f}")\n\nif distance < threshold:\n    confidence = (1.0 - distance) * 100\n    print(f"\\n✅ MATCH CONFIRMED! Identity Verified with {confidence:.2f}% Confidence.")\n    print("Attendance Logged: Student ID #2022CS089 -> PRESENT")\nelse:\n    print("\\n❌ ACCESS DENIED! Face vector distance exceeds match threshold.")`
            },
            polyhedron_math: {
                filename: 'mesh_generator.py',
                code: `# 3D Cyan Geodesic Polyhedron Wireframe Generator\n# Python Math Engine powering portfolio's WebGL Background\n\nimport math\n\nprint("=== 3D GEODESIC POLYHEDRON MESH METRICS ===")\n\nradius = 16.5\nvertices_count = 42\nfaces_count = 80\n\n# Golden Ratio for Icosahedron vertex positioning\nphi = (1 + math.sqrt(5)) / 2\nscale = radius / math.sqrt(1 + phi**2)\n\nnodes = [\n    (-1 * scale, phi * scale, 0),\n    (1 * scale, phi * scale, 0),\n    (-1 * scale, -phi * scale, 0),\n    (1 * scale, -phi * scale, 0)\n]\n\nprint(f"Polyhedron Radius: {radius} units")\nprint(f"Golden Ratio (phi): {phi:.6f}")\nprint(f"Generated Nodes Sample:")\n\nfor idx, (x, y, z) in enumerate(nodes, start=1):\n    print(f"  Node #{idx}: X={x:+.3f}, Y={y:+.3f}, Z={z:+.3f}")\n\nprint(f"\\n3D Spatial Mesh status: {vertices_count} Vertices & {faces_count} Polyhedron Triangles Ready.")`
            },
            custom: {
                filename: 'custom_script.py',
                code: `# Custom Python 3 Playground\n# Write your own Python code below and click "Run Code"!\n\ndef calculate_stats(numbers):\n    total = sum(numbers)\n    avg = total / len(numbers)\n    return total, avg\n\ndata = [15, 42, 88, 93, 27, 64]\ntotal, avg = calculate_stats(data)\n\nprint(f"Dataset: {data}")\nprint(f"Sum: {total}")\nprint(f"Average: {avg:.2f}")`
            }
        };

        let activePresetKey = 'ml_training';

        // Update Line Numbers Column
        function updateLineNumbers() {
            const lines = codeInput.value.split('\n').length;
            let numbersHtml = '';
            for (let i = 1; i <= Math.max(lines, 10); i++) {
                numbersHtml += `${i}<br>`;
            }
            lineNumbers.innerHTML = numbersHtml;
        }

        // Load Preset into Editor
        function loadPreset(presetKey) {
            activePresetKey = presetKey;
            const preset = presets[presetKey] || presets.ml_training;
            codeInput.value = preset.code;
            if (currentFileName) currentFileName.textContent = preset.filename;
            updateLineNumbers();
            
            // Tab active UI state
            document.querySelectorAll('.simulator-tab').forEach(tab => {
                if (tab.dataset.preset === presetKey) {
                    tab.classList.add('active');
                    tab.classList.remove('text-gray-400');
                } else {
                    tab.classList.remove('active');
                    tab.classList.add('text-gray-400');
                }
            });
        }

        // Tab Switch Listeners
        document.querySelectorAll('.simulator-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const key = tab.dataset.preset;
                loadPreset(key);
            });
        });

        // Sync Line Numbers on Typing & Scroll
        codeInput.addEventListener('input', updateLineNumbers);
        codeInput.addEventListener('scroll', () => {
            lineNumbers.scrollTop = codeInput.scrollTop;
        });

        // Tab Key Support in Textarea
        codeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = codeInput.selectionStart;
                const end = codeInput.selectionEnd;
                codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);
                codeInput.selectionStart = codeInput.selectionEnd = start + 4;
                updateLineNumbers();
            } else if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runPythonScript();
            }
        });

        // Run Code Handler
        async function runPythonScript() {
            const code = codeInput.value;
            if (!code || !code.trim()) return;

            // UI Loading state
            runBtn.disabled = true;
            runBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin text-xs"></i> Running...`;
            if (terminalStatusText) {
                terminalStatusText.textContent = 'Executing...';
                terminalStatusText.className = 'text-yellow-400 font-semibold';
            }

            consoleText.textContent = 'Executing Python code in sandboxed runtime...';
            consoleText.className = 'terminal-output text-xs md:text-sm font-mono text-yellow-300 animate-pulse';

            try {
                const res = await fetch('/api/simulate-python', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: code })
                });

                const data = await res.json();

                if (res.ok && data.status === 'success') {
                    consoleText.className = 'terminal-output text-xs md:text-sm font-mono text-cyan-300';
                    consoleText.textContent = data.output;

                    if (terminalStatusText) {
                        terminalStatusText.textContent = 'Success (0)';
                        terminalStatusText.className = 'text-emerald-400 font-semibold';
                    }

                    if (execTimeBadge) execTimeBadge.innerHTML = `<i class="fas fa-stopwatch text-cyan-400"></i> ${data.executionTimeMs} ms`;
                    if (execLinesBadge) execLinesBadge.innerHTML = `<i class="fas fa-file-code text-indigo-400"></i> ${data.linesExecuted} lines`;
                    if (execMemBadge) execMemBadge.innerHTML = `<i class="fas fa-memory text-purple-400"></i> ${data.memory}`;

                    if (typeof showToast === 'function') {
                        showToast('success', `⚡ Python executed in ${data.executionTimeMs} ms!`);
                    }
                } else {
                    consoleText.className = 'terminal-output text-xs md:text-sm font-mono text-red-400';
                    consoleText.textContent = (data.error || data.output || 'Execution Error');

                    if (terminalStatusText) {
                        terminalStatusText.textContent = 'Failed (1)';
                        terminalStatusText.className = 'text-red-400 font-semibold';
                    }

                    if (execTimeBadge) execTimeBadge.innerHTML = `<i class="fas fa-stopwatch text-red-400"></i> ${data.executionTimeMs || 0} ms`;
                    if (execLinesBadge) execLinesBadge.innerHTML = `<i class="fas fa-file-code text-indigo-400"></i> ${data.linesExecuted || 0} lines`;
                    if (execMemBadge) execMemBadge.innerHTML = `<i class="fas fa-memory text-purple-400"></i> 0 MB`;
                }
            } catch (err) {
                consoleText.className = 'terminal-output text-xs md:text-sm font-mono text-red-400';
                consoleText.textContent = `[System Error]: Could not connect to Python simulator backend endpoint.\n${err.message}`;
                if (terminalStatusText) {
                    terminalStatusText.textContent = 'Network Error';
                    terminalStatusText.className = 'text-red-400 font-semibold';
                }
            } finally {
                runBtn.disabled = false;
                runBtn.innerHTML = `<i class="fas fa-play text-xs"></i> <span>Run Code</span> <span class="text-[10px] opacity-75 font-mono ml-1 hidden sm:inline">(Ctrl+Enter)</span>`;
            }
        }

        runBtn.addEventListener('click', runPythonScript);

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                loadPreset(activePresetKey);
                if (typeof showToast === 'function') showToast('warning', 'Editor code reset to preset defaults.');
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(codeInput.value);
                if (typeof showToast === 'function') showToast('success', '📋 Python code copied to clipboard!');
            });
        }

        if (clearTermBtn) {
            clearTermBtn.addEventListener('click', () => {
                consoleText.textContent = '[Console cleared]';
                consoleText.className = 'terminal-output text-xs md:text-sm font-mono text-gray-500';
            });
        }

        // Initialize default preset
        loadPreset('ml_training');
    }

    initPythonSimulator();

});

