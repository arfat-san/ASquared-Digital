// ============================================
// DOM ELEMENTS
// ============================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const playButton = document.getElementById('playButton');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const viewWorkBtn = document.getElementById('viewWorkBtn');
const getQuoteBtn = document.getElementById('getQuoteBtn');
const navCta = document.querySelector('.nav-cta');

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// PLAY BUTTON & MODAL FUNCTIONALITY
// ============================================

// Play Button Click - Open Video Modal
playButton.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close Modal
closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the modal content
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

buttons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// BUTTON CLICK HANDLERS
// ============================================

// View My Work Button
if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', () => {
        // In a real implementation, this would navigate to portfolio
        console.log('View My Work button clicked');
        alert('In a real implementation, this would navigate to the portfolio section.');
        
        // Example of smooth scroll to a section (if portfolio section exists)
        // document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });
}

// Get Quote Button
if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', () => {
        // In a real implementation, this would open a contact form
        console.log('Get Quote button clicked');
        alert('In a real implementation, this would open a contact form.');
        
        // Example: Open a contact modal
        // openContactModal();
    });
}

// Contact Us Button (in navigation)
if (navCta) {
    navCta.addEventListener('click', () => {
        // In a real implementation, this would navigate to contact section
        console.log('Contact Us button clicked');
        alert('In a real implementation, this would navigate to the contact section.');
        
        // Example of smooth scroll to contact section
        // document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// ADDITIONAL INTERACTIONS
// ============================================

// Add hover effect to navigation links (excluding active)
document.querySelectorAll('.nav-links a:not(.active)').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--color-primary)';
    });
    
    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.color = 'var(--color-text)';
        }
    });
});

// Play button additional hover effect
playButton.addEventListener('mouseenter', () => {
    playButton.style.backgroundColor = 'var(--color-primary)';
    playButton.querySelector('i').style.color = 'var(--color-white)';
});

playButton.addEventListener('mouseleave', () => {
    playButton.style.backgroundColor = 'var(--color-white)';
    playButton.querySelector('i').style.color = 'var(--color-primary)';
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Smooth scroll to a section (example implementation)
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Open contact modal (example implementation)
 */
function openContactModal() {
    // In a real implementation, you would create and show a contact form modal
    console.log('Opening contact modal');
    
    // Example:
    // const contactModal = document.createElement('div');
    // contactModal.className = 'contact-modal';
    // contactModal.innerHTML = '<h2>Contact Form</h2><form>...</form>';
    // document.body.appendChild(contactModal);
}

// ============================================
// SERVICES SECTION INTERACTIONS
// ============================================

// Initialize services section interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesSection();
});

function initializeServicesSection() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add click event to each service card
    serviceCards.forEach(card => {
        // Add keyboard navigation support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.querySelector('.service-title').textContent}`);
        
        // Click/Tap interaction
        card.addEventListener('click', function() {
            // Toggle active state
            const isActive = this.classList.contains('active');
            
            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('active'));
            
            // Toggle active state on clicked card
            if (!isActive) {
                this.classList.add('active');
                this.style.transform = 'translateY(-8px)';
                
                // Optional: Log which service was clicked
                const serviceTitle = this.querySelector('.service-title').textContent;
                console.log(`Service selected: ${serviceTitle}`);
                
                // Announce to screen readers
                announceToScreenReader(`Selected ${serviceTitle} service`);
            }
        });
        
        // Keyboard interaction (Enter/Space)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Enhanced hover effects with smooth color transition
        card.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add a pulsing animation to the icon
            const icon = this.querySelector('.service-icon');
            icon.style.animation = 'pulse 0.6s ease';
            
            // Add hover class for CSS transitions
            this.classList.add('hovering');
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove scale but keep lifted state if active
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'translateY(-8px)';
            }
            
            // Remove animation from icon
            const icon = this.querySelector('.service-icon');
            icon.style.animation = '';
            
            // Remove hover class
            this.classList.remove('hovering');
        });
        
        // Focus and blur events for accessibility
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1.1); }
        }
        
        .service-card.focused {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        /* Smooth transitions for hover effects */
        .service-card {
            transition: transform 0.3s ease, 
                        box-shadow 0.3s ease, 
                        background-color 0.3s ease,
                        border-color 0.3s ease;
        }
        
        .service-card .service-title,
        .service-card .service-description,
        .service-card .service-icon {
            transition: color 0.3s ease, 
                       background-color 0.3s ease,
                       transform 0.3s ease;
        }
        
        /* Initial state for animation */
        .service-card {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .service-card.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        /* Staggered animation delays */
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        .service-card:nth-child(5) { transition-delay: 0.5s; }
        .service-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    
    // Optional: Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate cards when they come into view
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe each service card
        serviceCards.forEach(card => {
            servicesObserver.observe(card);
        });
    }
    
    // Optional: Add smooth scroll to services section from navigation
    // This assumes you have navigation links that can link to #services
    const serviceLinks = document.querySelectorAll('a[href="#services"]');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add focus to first service card for keyboard navigation
                setTimeout(() => {
                    const firstCard = servicesSection.querySelector('.service-card');
                    if (firstCard) firstCard.focus();
                }, 1000);
            }
        });
    });
}

// Helper function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.padding = '0';
    announcement.style.margin = '-1px';
    announcement.style.overflow = 'hidden';
    announcement.style.clip = 'rect(0, 0, 0, 0)';
    announcement.style.whiteSpace = 'nowrap';
    announcement.style.border = '0';
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove the announcement after a delay
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// ============================================
// PROJECTS CAROUSEL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsCarousel();
});

function initializeProjectsCarousel() {
    // DOM Elements
    const projectsCarousel = document.querySelector('.projects-carousel');
    if (!projectsCarousel) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    const prevArrow = document.querySelector('.carousel-arrow-prev');
    const nextArrow = document.querySelector('.carousel-arrow-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    const totalProjects = projectCards.length;
    let isAnimating = false;
    
    // Initialize carousel
    updateCarousel();
    
    // Event Listeners for Navigation Arrows
    prevArrow.addEventListener('click', function(e) {
        e.preventDefault();
        navigateCarousel(-1);
    });
    
    nextArrow.addEventListener('click', function(e) {
        e.preventDefault();
        navigateCarousel(1);
    });
    
    // Event Listeners for Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            if (index !== currentIndex && !isAnimating) {
                goToSlide(index);
            }
        });
    });
    
    // Keyboard Navigation
    projectsCarousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateCarousel(1);
        }
    });
    
    // Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    projectsCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    projectsCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left - go to next
                navigateCarousel(1);
            } else {
                // Swipe right - go to previous
                navigateCarousel(-1);
            }
        }
    }
    
    // Carousel Navigation Functions
    function navigateCarousel(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Calculate new index
        let newIndex = currentIndex + direction;
        
        // Handle wrap-around
        if (newIndex < 0) {
            newIndex = totalProjects - 1;
        } else if (newIndex >= totalProjects) {
            newIndex = 0;
        }
        
        // Determine animation direction
        const animationClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';
        
        // Hide current card
        projectCards[currentIndex].classList.remove('active', 'slide-in-left', 'slide-in-right');
        
        // Show new card with animation
        projectCards[newIndex].classList.add('active', animationClass);
        
        // Update current index
        currentIndex = newIndex;
        
        // Update indicators
        updateIndicators();
        
        // Reset animation flag after animation completes
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        
        isAnimating = true;
        
        // Determine animation direction
        const direction = index > currentIndex ? 1 : -1;
        const animationClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';
        
        // Hide current card
        projectCards[currentIndex].classList.remove('active', 'slide-in-left', 'slide-in-right');
        
        // Show new card with animation
        projectCards[index].classList.add('active', animationClass);
        
        // Update current index
        currentIndex = index;
        
        // Update indicators
        updateIndicators();
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-current', 'false');
            }
        });
    }
    
    function updateCarousel() {
        // Set initial active states
        projectCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.classList.remove('active');
                card.setAttribute('aria-hidden', 'true');
            }
        });
        
        updateIndicators();
        
        // Add ARIA labels for accessibility
        prevArrow.setAttribute('aria-label', 'Previous project');
        nextArrow.setAttribute('aria-label', 'Next project');
        
        projectsCarousel.setAttribute('aria-roledescription', 'carousel');
        projectsCarousel.setAttribute('aria-label', 'Projects showcase');
    }
    
    // Button hover effects
    const projectCtaButtons = document.querySelectorAll('.project-cta');
    projectCtaButtons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
            
            // In a real implementation, this would navigate to project details
            const projectName = this.closest('.project-card').querySelector('.project-name').textContent;
            console.log(`Viewing project: ${projectName}`);
            
            // Show a message (in production, this would navigate to project page)
            setTimeout(() => {
                alert(`In a real implementation, this would open the "${projectName}" case study page.`);
            }, 300);
        });
        
        // Enhanced hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Auto-rotate carousel (optional)
    let autoRotateInterval;
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            navigateCarousel(1);
        }, 8000); // Change slide every 8 seconds
    }
    
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }
    
    // Start auto-rotate
    startAutoRotate();
    
    // Pause auto-rotate on hover
    projectsCarousel.addEventListener('mouseenter', stopAutoRotate);
    projectsCarousel.addEventListener('mouseleave', startAutoRotate);
    projectsCarousel.addEventListener('touchstart', stopAutoRotate);
    projectsCarousel.addEventListener('touchend', () => {
        setTimeout(startAutoRotate, 3000);
    });
    
    // Helper function for ripple effect
    function createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect CSS if not already present
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.textContent = `
            .project-cta {
                position: relative;
                overflow: hidden;
            }
            
            .project-cta .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// ============================================
// PRICING SECTION INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializePricingSection();
});

function initializePricingSection() {
    // DOM Elements
    const pricingCards = document.querySelectorAll('.pricing-card');
    const pricingCtas = document.querySelectorAll('.pricing-cta');
    
    if (!pricingCards.length) return;
    
    // Card hover effects
    pricingCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function(e) {
            // Don't trigger card click if button was clicked
            if (e.target.closest('.pricing-cta')) return;

            // Remove active class from all cards
            pricingCards.forEach(c => c.classList.remove('active'));

            // Log selection
            const cardTitle = this.querySelector('.pricing-card-title').textContent;
            console.log(`Pricing plan selected: ${cardTitle}`);

            // Announce to screen readers
            announceToScreenReader(`Selected ${cardTitle} pricing plan`);
        });
        
        // Keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Select ${card.querySelector('.pricing-card-title').textContent} pricing plan`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Add glow effect to featured card
            if (this.classList.contains('featured')) {
                this.style.animation = 'subtleGlow 1.5s ease-in-out infinite';
            }
            
            // Add subtle scale to content
            const content = this.querySelector('.pricing-card-content');
            if (content) {
                content.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset featured card animation
            if (this.classList.contains('featured')) {
                this.style.animation = 'subtleGlow 3s ease-in-out infinite';
            }
            
            // Reset content transform
            const content = this.querySelector('.pricing-card-content');
            if (content) {
                content.style.transform = 'translateY(0)';
            }
        });
        
        // Focus and blur for accessibility
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // CTA Button interactions
    pricingCtas.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Get card details
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.pricing-card-title').textContent;
            const price = card.querySelector('.pricing-value').textContent;
            const suffix = card.querySelector('.pricing-suffix').textContent;
            
            console.log(`Viewing pricing details for: ${planName} (₹${price}${suffix})`);
            
            // Show pricing details (in production, this would open a modal or navigate)
            setTimeout(() => {
                showPricingDetails(planName, price, suffix, card.classList.contains('featured'));
            }, 300);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Keyboard focus
        button.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        button.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add CSS for focus states
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .pricing-card:focus,
        .pricing-card:focus-visible,
        .pricing-card.focused {
            outline: none;
            box-shadow: none;
        }
        
        .pricing-card.active {
            border: 1px solid var(--color-border);
        }
        
        .pricing-card.featured.active {
            border: 1px solid var(--color-primary);
        }
    `;
    document.head.appendChild(focusStyle);
    
    // Optional: Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate cards when they come into view
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe each pricing card
        pricingCards.forEach(card => {
            pricingObserver.observe(card);
        });
        
        // Add animation styles
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .pricing-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .pricing-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .pricing-card:nth-child(1) { transition-delay: 0.1s; }
            .pricing-card:nth-child(2) { transition-delay: 0.2s; }
            .pricing-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(animationStyle);
    }
    
    // Function to show pricing details
    function showPricingDetails(planName, price, suffix, isFeatured) {
        // In a real implementation, this would open a modal or navigate
        // For now, we'll show an alert with the details
        const message = `Pricing Details:
        
Plan: ${planName}
Price: ₹${price}${suffix}
${isFeatured ? '⭐ Featured Plan' : ''}

In a real implementation, this would open a detailed pricing breakdown with:
- Full scope of work
- Project timelines
- Add-on services
- Next steps to get started`;

        alert(message);
        
        // Alternatively, you could create a modal with more details
        // createPricingModal(planName, price, suffix, isFeatured);
    }
    
    // Helper function for ripple effect
    function createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect CSS if not already present
    if (!document.querySelector('#button-ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'button-ripple-styles';
        rippleStyle.textContent = `
            .pricing-cta .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
            }
            
            .pricing-cta.featured-cta .ripple {
                background-color: rgba(44, 85, 48, 0.2);
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Helper function for screen reader announcements (if not already defined)
function announceToScreenReader(message) {
    if (typeof window.announceToScreenReader === 'undefined') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.margin = '-1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.border = '0';
        
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        // Remove the announcement after a delay
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    } else {
        window.announceToScreenReader(message);
    }
}

// ============================================
// VALUE PROPOSITION SECTION INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeValueSection();
});

function initializeValueSection() {
    // DOM Elements
    const valueSection = document.querySelector('.value-section');
    const illustrationContainer = document.querySelector('.illustration-container');
    
    if (!valueSection || !illustrationContainer) return;
    
    // Add hover effect enhancement for illustration
    illustrationContainer.addEventListener('mouseenter', function() {
        // Add a slight rotation effect on hover
        this.style.transform = 'translateY(-8px) rotate(0.5deg)';
    });
    
    illustrationContainer.addEventListener('mouseleave', function() {
        // Reset transform
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
    
    // Touch device support for hover effects
    illustrationContainer.addEventListener('touchstart', function() {
        this.classList.add('hover-active');
        setTimeout(() => {
            this.classList.remove('hover-active');
        }, 1000);
    });
    
    // Add CSS for touch hover state
    const touchHoverStyle = document.createElement('style');
    touchHoverStyle.textContent = `
        .illustration-container.hover-active {
            transform: translateY(-8px) !important;
            box-shadow: 0 24px 56px rgba(0, 0, 0, 0.12) !important;
        }
    `;
    document.head.appendChild(touchHoverStyle);
    
    // Parallax effect on scroll (subtle)
    function setupParallax() {
        const valueVisual = document.querySelector('.value-visual');
        const illustration = document.querySelector('.illustration-image');
        
        if (!valueVisual || !illustration) return;
        
        // Only add parallax on larger screens
        if (window.innerWidth > 1024) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.1;
                
                // Subtle parallax effect
                valueVisual.style.transform = `translateY(${rate * 0.3}px)`;
                illustration.style.transform = `translateY(${rate * 0.1}px) scale(1.02)`;
            });
        }
    }
    
    setupParallax();
    
    // Re-setup parallax on resize
    window.addEventListener('resize', function() {
        const valueVisual = document.querySelector('.value-visual');
        if (valueVisual) {
            valueVisual.style.transform = '';
        }
        
        const illustration = document.querySelector('.illustration-image');
        if (illustration) {
            illustration.style.transform = '';
        }
        
        setupParallax();
    });
    
    // Scroll animation using Intersection Observer
    if ('IntersectionObserver' in window) {
        const valueText = document.querySelector('.value-text');
        const valueVisual = document.querySelector('.value-visual');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation classes
                    if (valueText) {
                        valueText.classList.add('animate-in', 'visible');
                    }
                    
                    if (valueVisual) {
                        setTimeout(() => {
                            valueVisual.classList.add('animate-in', 'visible');
                        }, 200);
                    }
                    
                    // Unobserve after animation
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe the section
        sectionObserver.observe(valueSection);
        
        // Add animation styles if not already present
        if (!document.querySelector('#value-animation-styles')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'value-animation-styles';
            animationStyle.textContent = `
                .value-text {
                    opacity: 0;
                    transform: translateX(-40px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .value-visual {
                    opacity: 0;
                    transform: translateX(40px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                    transition-delay: 0.2s;
                }
                
                .value-text.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .value-visual.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(animationStyle);
        }
    } else {
        // Fallback for browsers without IntersectionObserver
        const valueText = document.querySelector('.value-text');
        const valueVisual = document.querySelector('.value-visual');
        
        if (valueText) valueText.classList.add('visible');
        if (valueVisual) valueVisual.classList.add('visible');
    }
    
    // Optional: Add subtle color shift animation to emphasis text
    const emphasisText = document.querySelector('.value-headline-emphasis');
    if (emphasisText) {
        // Add pulsing animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes subtlePulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.9;
                }
            }
            
            .value-headline-emphasis {
                position: relative;
                display: inline-block;
                text-decoration: none;
            }
            
            .value-headline-emphasis::after {
                display: none;
            }
        `;
        document.head.appendChild(pulseStyle);
    }
    
    // Add keyboard navigation support
    illustrationContainer.setAttribute('tabindex', '0');
    illustrationContainer.setAttribute('role', 'button');
    illustrationContainer.setAttribute('aria-label', 'Design and development process illustration');
    
    illustrationContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Trigger hover effect on keyboard activation
            this.classList.add('keyboard-active');
            
            // Announce the content
            announceToScreenReader('Design and development process illustration. Shows collaborative design workflow.');
            
            setTimeout(() => {
                this.classList.remove('keyboard-active');
            }, 1000);
        }
    });
    
    // Add CSS for keyboard active state
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .illustration-container.keyboard-active {
            transform: translateY(-8px) !important;
            box-shadow: 0 24px 56px rgba(0, 0, 0, 0.15) !important;
            outline: 2px solid var(--color-primary);
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(keyboardStyle);
}

// Helper function for screen reader announcements (reuse if exists)
function announceToScreenReader(message) {
    if (typeof window.announceToScreenReader !== 'undefined') {
        window.announceToScreenReader(message);
        return;
    }
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

// ============================================
// CTA / CONTACT SECTION INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeCTASection();
});

function initializeCTASection() {
    // DOM Elements
    const ctaSection = document.querySelector('.cta-section');
    const contactIcons = document.querySelectorAll('.contact-icon');
    const ctaContainer = document.querySelector('.cta-container');
    
    if (!ctaSection) return;
    
    // Add ripple effect to icon circles
    contactIcons.forEach(icon => {
        const iconCircle = icon.querySelector('.icon-circle');
        
        icon.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(iconCircle, e);
            
            // Get which icon was clicked
            const iconType = icon.querySelector('.icon-label').textContent;
            console.log(`Contact method selected: ${iconType}`);
            
            // Track the click (analytics placeholder)
            trackContactClick(iconType);
        });
        
        // Enhanced hover effects
        icon.addEventListener('mouseenter', function() {
            // Add a subtle glow to the circle
            iconCircle.style.boxShadow = '0 12px 32px rgba(44, 85, 48, 0.25), 0 0 0 2px rgba(255, 255, 255, 0.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            // Reset shadow
            iconCircle.style.boxShadow = '';
        });
        
        // Keyboard navigation
        icon.setAttribute('tabindex', '0');
        
        icon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Focus and blur for accessibility
        icon.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        icon.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Container hover effect
    if (ctaContainer) {
        ctaContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        ctaContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Scroll animation using Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the container
                    if (ctaContainer) {
                        ctaContainer.classList.add('animate-in');
                        ctaContainer.style.opacity = '1';
                    }
                    
                    // Animate each icon with delay
                    contactIcons.forEach((icon, index) => {
                        setTimeout(() => {
                            icon.classList.add('animate-in');
                        }, 200 + (index * 100));
                    });
                    
                    // Unobserve after animation
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe the section
        sectionObserver.observe(ctaSection);
    } else {
        // Fallback for browsers without Intersection Observer
        if (ctaContainer) {
            ctaContainer.style.opacity = '1';
        }
        contactIcons.forEach(icon => {
            icon.style.opacity = '1';
        });
    }
    
    // Helper function for ripple effect
    function createRippleEffect(element, event) {
        if (!element) return;
        
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-circle');
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Function to track contact clicks (analytics placeholder)
    function trackContactClick(method) {
        // In a real implementation, this would send data to analytics
        console.log(`Analytics: Contact method clicked - ${method}`);
        
        // Example: Google Analytics event
        // gtag('event', 'contact_click', {
        //     'method': method,
        //     'event_category': 'Engagement',
        //     'event_label': 'Contact Section'
        // });
    }
    
    // Add CSS for focused state if not already present
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .contact-icon.focused {
            outline: 2px solid var(--color-primary);
            outline-offset: 4px;
            border-radius: 16px;
        }
        
        .contact-icon.focused .icon-circle {
            outline: 2px solid #ffffff;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
    
    // Optional: Add copy email functionality on double-click
    const emailIcon = document.querySelector('a[href^="mailto:"]');
    if (emailIcon) {
        let clickTimer;
        let clickCount = 0;
        
        emailIcon.addEventListener('click', function(e) {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                
                // Copy email to clipboard
                const email = this.getAttribute('href').replace('mailto:', '');
                copyToClipboard(email);
                
                // Show feedback
                showCopyFeedback('Email copied to clipboard!', emailIcon);
            }
        });
    }
    
    // Copy to clipboard helper function
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Email copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    }
    
    // Show copy feedback
    function showCopyFeedback(message, element) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--color-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: var(--font-body);
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(feedback);
        
        // Show feedback
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide feedback after 3 seconds
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 3000);
    }
}

// ============================================
// FOOTER SECTION INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
});

function initializeFooter() {
    // Set current year in copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links in footer
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger.active');
                const navLinks = document.querySelector('.nav-links.active');
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Contact link interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        // Add click tracking
        link.addEventListener('click', function() {
            const linkType = this.textContent.trim();
            console.log(`Footer contact link clicked: ${linkType}`);
            
            // Analytics tracking (placeholder)
            trackFooterInteraction(linkType);
        });
        
        // Add hover effect enhancement
        link.addEventListener('mouseenter', function() {
            const icon = this.closest('.contact-item').querySelector('.contact-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.closest('.contact-item').querySelector('.contact-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Keyboard navigation
        link.setAttribute('tabindex', '0');
    });
    
    // Book a Call functionality
    const bookCallLink = document.querySelector('a.contact-link[href="#contact"]');
    if (bookCallLink) {
        bookCallLink.addEventListener('click', function(e) {
            // If it's the "Schedule a call" link, open a calendar modal
            if (this.textContent.includes('Schedule a call')) {
                e.preventDefault();
                openBookingModal();
            }
        });
    }
    
    // Add intersection observer for footer animations
    if ('IntersectionObserver' in window) {
        const footer = document.querySelector('.site-footer');
        if (footer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Trigger column animations
                        const columns = document.querySelectorAll('.footer-column');
                        columns.forEach((column, index) => {
                            setTimeout(() => {
                                column.style.opacity = '1';
                                column.style.transform = 'translateY(0)';
                            }, 100 * index);
                        });
                        
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(footer);
        }
    }
    
    // Function to track footer interactions
    function trackFooterInteraction(action) {
        // In a real implementation, send to analytics
        console.log(`Analytics: Footer interaction - ${action}`);
        
        // Example: Google Analytics event
        // gtag('event', 'footer_click', {
        //     'action': action,
        //     'event_category': 'Engagement',
        //     'event_label': 'Footer Section'
        // });
    }
    
    // Function to open booking modal
    function openBookingModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'booking-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'booking-modal-content';
        modalContent.style.cssText = `
            background-color: var(--color-white);
            border-radius: var(--border-radius-xl);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 28px;
                color: var(--color-text-light);
                cursor: pointer;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            ">&times;</button>
            
            <h3 style="
                font-family: var(--font-heading);
                font-size: 28px;
                color: var(--color-primary);
                margin: 0 0 16px 0;
            ">Schedule a Call</h3>
            
            <p style="
                color: var(--color-text-light);
                margin-bottom: 32px;
                line-height: 1.6;
            ">Let's discuss your project. Select a time that works for you.</p>
            
            <div style="
                background-color: var(--color-bg);
                padding: 24px;
                border-radius: var(--border-radius-lg);
                margin-bottom: 32px;
            ">
                <h4 style="
                    font-family: var(--font-heading);
                    font-size: 18px;
                    color: var(--color-text);
                    margin: 0 0 16px 0;
                ">Available Time Slots</h4>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button class="time-slot" style="
                        background-color: var(--color-white);
                        border: 1px solid var(--color-border);
                        border-radius: var(--border-radius);
                        padding: 16px;
                        text-align: left;
                        font-family: var(--font-body);
                        font-size: 16px;
                        color: var(--color-text);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    ">Tomorrow, 10:00 AM - 11:00 AM</button>
                    
                    <button class="time-slot" style="
                        background-color: var(--color-white);
                        border: 1px solid var(--color-border);
                        border-radius: var(--border-radius);
                        padding: 16px;
                        text-align: left;
                        font-family: var(--font-body);
                        font-size: 16px;
                        color: var(--color-text);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    ">Tomorrow, 2:00 PM - 3:00 PM</button>
                    
                    <button class="time-slot" style="
                        background-color: var(--color-white);
                        border: 1px solid var(--color-border);
                        border-radius: var(--border-radius);
                        padding: 16px;
                        text-align: left;
                        font-family: var(--font-body);
                        font-size: 16px;
                        color: var(--color-text);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    ">Day after tomorrow, 11:00 AM - 12:00 PM</button>
                </div>
            </div>
            
            <p style="
                color: var(--color-text-light);
                font-size: 14px;
                text-align: center;
                margin: 0;
            ">Or email us at <a href="mailto:hello@asquared.digital" style="color: var(--color-primary); text-decoration: none;">hello@asquared.digital</a> to arrange another time.</p>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal handlers
        const closeButton = modalContent.querySelector('.modal-close');
        closeButton.addEventListener('click', closeBookingModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeBookingModal();
            }
        });
        
        // Time slot selection
        const timeSlots = modalContent.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                timeSlots.forEach(s => {
                    s.style.backgroundColor = 'var(--color-white)';
                    s.style.borderColor = 'var(--color-border)';
                    s.style.color = 'var(--color-text)';
                });
                
                this.style.backgroundColor = 'var(--color-primary)';
                this.style.borderColor = 'var(--color-primary)';
                this.style.color = 'var(--color-white)';
                
                // Show confirmation
                setTimeout(() => {
                    closeBookingModal();
                    alert('Excellent! We\'ve scheduled your call. You\'ll receive a confirmation email shortly.');
                }, 500);
            });
        });
        
        // Escape key to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeBookingModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        function closeBookingModal() {
            modalOverlay.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Add CSS for booking modal
    const bookingModalStyle = document.createElement('style');
    bookingModalStyle.textContent = `
        .time-slot:hover {
            background-color: rgba(44, 85, 48, 0.05) !important;
            border-color: var(--color-primary) !important;
        }
        
        .modal-close:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
    `;
    document.head.appendChild(bookingModalStyle);
}