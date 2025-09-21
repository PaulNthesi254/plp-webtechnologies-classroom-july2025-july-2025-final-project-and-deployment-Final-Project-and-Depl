
        // Page Navigation
        let currentPage = 'home';

        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            document.getElementById(pageId).classList.add('active');

            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`[href="#${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            currentPage = pageId;

            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mobile Navigation Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('href').substring(1);
                    showPage(pageId);
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        });

        // Search Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('remedySearch');
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    const searchTerm = e.target.value.toLowerCase();
                    const remedyCards = document.querySelectorAll('.remedy-detailed-card');
                    
                    remedyCards.forEach(card => {
                        const text = card.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            }
        });

        // Filter Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const filterTabs = document.querySelectorAll('.filter-tab');
            
            filterTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    filterTabs.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    const remedyCards = document.querySelectorAll('.remedy-detailed-card');
                    
                    remedyCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        });

        // Herb Details Modal
        const herbDetails = {
            turmeric: {
                name: 'Turmeric',
                latin: 'Curcuma longa',
                image: '🌿',
                description: 'Turmeric is a powerful anti-inflammatory spice that has been used in traditional medicine for thousands of years.',
                benefits: [
                    'Reduces inflammation and joint pain',
                    'Supports digestive health',
                    'Boosts immune system',
                    'May help prevent heart disease',
                    'Contains powerful antioxidants'
                ],
                preparation: [
                    'Golden milk: Mix 1 tsp turmeric powder with warm milk',
                    'Turmeric paste: Mix with water for topical application',
                    'Add to curries and cooking',
                    'Take as supplement (consult healthcare provider)'
                ],
                precautions: 'May interact with blood thinners. Consult doctor if pregnant or taking medications.',
                dosage: '1-3 grams daily, best absorbed with black pepper and healthy fats'
            },
            ginger: {
                name: 'Ginger',
                latin: 'Zingiber officinale',
                image: '🫚',
                description: 'Ginger is renowned for its digestive properties and ability to combat nausea.',
                benefits: [
                    'Relieves nausea and motion sickness',
                    'Aids digestion and reduces bloating',
                    'Anti-inflammatory properties',
                    'May reduce muscle pain',
                    'Supports immune system'
                ],
                preparation: [
                    'Fresh ginger tea: Steep sliced ginger in hot water',
                    'Add to smoothies and juices',
                    'Use in cooking and baking',
                    'Crystallized ginger for travel sickness'
                ],
                precautions: 'May interact with blood thinners. Use cautiously with gallstones.',
                dosage: '1-4 grams daily, or 2-3 cups of ginger tea'
            },
            garlic: {
                name: 'Garlic',
                latin: 'Allium sativum',
                image: '🧄',
                description: 'Garlic is a potent antimicrobial herb with cardiovascular benefits.',
                benefits: [
                    'Supports immune system function',
                    'May lower blood pressure',
                    'Helps reduce cholesterol',
                    'Natural antimicrobial properties',
                    'May help prevent heart disease'
                ],
                preparation: [
                    'Fresh cloves: Crush and let sit for 10 minutes before consuming',
                    'Add to cooking for daily intake',
                    'Garlic oil for topical use',
                    'Aged garlic supplements'
                ],
                precautions: 'May interact with blood thinners. Can cause digestive upset in large amounts.',
                dosage: '1-2 fresh cloves daily, or follow supplement instructions'
            },
            honey: {
                name: 'Honey',
                latin: 'Mel',
                image: '🍯',
                description: 'Raw honey is a natural antimicrobial with wound healing properties.',
                benefits: [
                    'Natural cough suppressant',
                    'Wound healing properties',
                    'Antimicrobial activity',
                    'Soothes sore throats',
                    'Provides natural energy'
                ],
                preparation: [
                    'Take 1-2 teaspoons for cough relief',
                    'Mix with warm water and lemon',
                    'Apply topically to minor wounds',
                    'Use in herbal teas'
                ],
                precautions: 'Not suitable for infants under 12 months. Choose raw, unprocessed honey.',
                dosage: '1-2 tablespoons daily for adults'
            },
            echinacea: {
                name: 'Echinacea',
                latin: 'Echinacea purpurea',
                image: '🌱',
                description: 'Echinacea is widely used to support immune system function.',
                benefits: [
                    'Supports immune system',
                    'May reduce cold duration',
                    'Anti-inflammatory properties',
                    'Wound healing support',
                    'Antioxidant activity'
                ],
                preparation: [
                    'Tea: Steep dried herb for 10-15 minutes',
                    'Tincture: Follow bottle instructions',
                    'Capsules: Take as directed',
                    'Fresh juice: Small amounts only'
                ],
                precautions: 'May cause allergic reactions in some people. Avoid if allergic to plants in daisy family.',
                dosage: 'Follow product instructions, typically used for short periods (7-10 days)'
            },
            peppermint: {
                name: 'Peppermint',
                latin: 'Mentha piperita',
                image: '🌿',
                description: 'Peppermint is cooling and digestive, excellent for stomach issues.',
                benefits: [
                    'Relieves digestive discomfort',
                    'Reduces nausea and bloating',
                    'Cooling and refreshing',
                    'May help with headaches',
                    'Antimicrobial properties'
                ],
                preparation: [
                    'Tea: Steep fresh or dried leaves',
                    'Essential oil: Dilute for topical use',
                    'Fresh leaves in water',
                    'Peppermint capsules for IBS'
                ],
                precautions: 'Essential oil is very concentrated - always dilute. May worsen acid reflux in some people.',
                dosage: '2-3 cups of tea daily, or follow supplement instructions'
            }
        };

        function showHerbDetails(herbKey) {
            const herb = herbDetails[herbKey];
            if (!herb) return;

            const modalContent = document.getElementById('herbModalContent');
            modalContent.innerHTML = `
                <div class="herb-modal-header">
                    <div class="herb-modal-icon">${herb.image}</div>
                    <div>
                        <h2>${herb.name}</h2>
                        <p class="herb-modal-latin">${herb.latin}</p>
                    </div>
                </div>
                <div class="herb-modal-body">
                    <p class="herb-description">${herb.description}</p>
                    
                    <div class="herb-section">
                        <h3><i class="fas fa-heart"></i> Health Benefits</h3>
                        <ul>
                            ${herb.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="herb-section">
                        <h3><i class="fas fa-mortar-pestle"></i> Preparation Methods</h3>
                        <ul>
                            ${herb.preparation.map(method => `<li>${method}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="herb-section">
                        <h3><i class="fas fa-pills"></i> Recommended Dosage</h3>
                        <p>${herb.dosage}</p>
                    </div>
                    
                    <div class="herb-section warning">
                        <h3><i class="fas fa-exclamation-triangle"></i> Precautions</h3>
                        <p>${herb.precautions}</p>
                    </div>
                </div>
            `;

            document.getElementById('herbModal').style.display = 'block';
        }

        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('herbModal');
            const closeBtn = document.querySelector('.close');

            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Contact Form Submission
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = new FormData(contactForm);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const subject = formData.get('subject');
                    const message = formData.get('message');
                    
                    // Basic validation
                    if (!name || !email || !message) {
                        alert('Please fill in all required fields.');
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert('Please enter a valid email address.');
                        return;
                    }
                    
                    // Simulate form submission
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                });
            }
        });

        // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.feature-card, .remedy-card, .herb-card, .condition-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Initialize scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.feature-card, .remedy-card, .herb-card, .condition-card');
            
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

        // Loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // Animate hero elements
            setTimeout(() => {
                document.querySelectorAll('.hero .fade-in').forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 500);
        });

        // Add interactive effects to cards
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.feature-card, .remedy-card, .herb-card, .condition-card, .remedy-detailed-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Quick remedy cards click effect
        document.addEventListener('DOMContentLoaded', function() {
            const remedyCards = document.querySelectorAll('.remedy-card');
            
            remedyCards.forEach(card => {
                card.addEventListener('click', function() {
                    showPage('remedies');
                });
            });
        });

        // Add CSS for modal herb details
        const herbModalStyles = `
            .herb-modal-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--background-light);
            }
            
            .herb-modal-icon {
                font-size: 4rem;
            }
            
            .herb-modal-latin {
                font-style: italic;
                color: var(--text-light);
                font-size: 1.1rem;
            }
            
            .herb-description {
                font-size: 1.1rem;
                margin-bottom: 30px;
                line-height: 1.8;
            }
            
            .herb-section {
                margin-bottom: 25px;
                padding: 20px;
                background: var(--background-light);
                border-radius: 15px;
            }
            
            .herb-section.warning {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
            }
            
            .herb-section h3 {
                color: var(--primary-color);
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .herb-section.warning h3 {
                color: #856404;
            }
            
            .herb-section ul {
                list-style: none;
                padding-left: 0;
            }
            
            .herb-section li {
                position: relative;
                padding-left: 25px;
                margin-bottom: 10px;
                line-height: 1.6;
            }
            
            .herb-section li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--secondary-color);
                font-weight: bold;
            }
        `;

        // Add modal styles
        const modalStyleSheet = document.createElement('style');
        modalStyleSheet.textContent = herbModalStyles;
        document.head.appendChild(modalStyleSheet);

        // Add loading styles
        const loadingStyles = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            .hero .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
        `;

        const loadingStyleSheet = document.createElement('style');
        loadingStyleSheet.textContent = loadingStyles;
        document.head.appendChild(loadingStyleSheet);
  