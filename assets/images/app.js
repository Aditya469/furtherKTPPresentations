// Presentation Navigation Script
class PresentationController {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.currentSlideIndex = 0;
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideDisplay = document.getElementById('currentSlide');
        this.totalSlidesDisplay = document.getElementById('totalSlides');
        
        this.init();
    }
    
    init() {
        // Set up initial state
        this.updateSlideCounter();
        this.updateNavigationButtons();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Click to advance (optional)
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Initialize first slide
        this.showSlide(0);
    }
    
    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            
            if (i < index) {
                slide.classList.add('prev');
            } else if (i === index) {
                slide.classList.add('active');
            }
        });
        
        this.currentSlideIndex = index;
        this.updateSlideCounter();
        this.updateNavigationButtons();
    }
    
    nextSlide() {
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.showSlide(this.currentSlideIndex + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.showSlide(this.currentSlideIndex - 1);
        }
    }
    
    updateSlideCounter() {
        this.currentSlideDisplay.textContent = this.currentSlideIndex + 1;
        this.totalSlidesDisplay.textContent = this.totalSlides;
    }
    
    updateNavigationButtons() {
        // Update previous button
        if (this.currentSlideIndex === 0) {
            this.prevBtn.disabled = true;
            this.prevBtn.style.opacity = '0.5';
        } else {
            this.prevBtn.disabled = false;
            this.prevBtn.style.opacity = '1';
        }
        
        // Update next button
        if (this.currentSlideIndex === this.totalSlides - 1) {
            this.nextBtn.disabled = true;
            this.nextBtn.style.opacity = '0.5';
        } else {
            this.nextBtn.disabled = false;
            this.nextBtn.style.opacity = '1';
        }
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.showSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.showSlide(this.totalSlides - 1);
                break;
        }
    }
    
    handleClick(e) {
        // Only advance on slide content click, not navigation
        if (e.target.closest('.navigation')) {
            return;
        }
        
        // Optional: Click to advance slides
        // Uncomment if you want click-to-advance functionality
        /*
        const clickX = e.clientX;
        const windowWidth = window.innerWidth;
        
        if (clickX > windowWidth / 2) {
            this.nextSlide();
        } else {
            this.previousSlide();
        }
        */
    }
    
    // Method to go to a specific slide (for future use)
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.showSlide(slideNumber - 1);
        }
    }
    
    // Method for fullscreen mode (optional)
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Additional utility functions for enhanced presentation experience
class PresentationEnhancements {
    constructor(controller) {
        this.controller = controller;
        this.init();
    }
    
    init() {
        // Add smooth scroll behavior
        this.addSmoothScrolling();
        
        // Add presentation timer (optional)
        this.initTimer();
        
        // Add touch/swipe support for mobile
        this.addTouchSupport();
        
        // Add progress indicator
        this.addProgressIndicator();
    }
    
    addSmoothScrolling() {
        // Ensure smooth transitions
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    initTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            // You can display this timer if needed
            // console.log(`Presentation time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.controller.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.controller.previousSlide();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }
    
    addProgressIndicator() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--color-primary);
                transition: width 0.5s var(--ease-standard);
                width: 0%;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(progressBar);
        
        // Update progress when slide changes
        const updateProgress = () => {
            const progress = ((this.controller.currentSlideIndex + 1) / this.controller.totalSlides) * 100;
            progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
        };
        
        // Override the showSlide method to update progress
        const originalShowSlide = this.controller.showSlide.bind(this.controller);
        this.controller.showSlide = function(index) {
            originalShowSlide(index);
            updateProgress();
        };
        
        // Initial progress update
        updateProgress();
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const presentationController = new PresentationController();
    const presentationEnhancements = new PresentationEnhancements(presentationController);
    
    // Make controller globally available for debugging
    window.presentationController = presentationController;
    
    // Add some presentation-specific enhancements
    setupPresentationMode();
});

// Function to setup presentation mode enhancements
function setupPresentationMode() {
    // Prevent context menu on right click (cleaner presentation)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Prevent text selection for cleaner look
    document.addEventListener('selectstart', (e) => {
        if (!e.target.closest('input, textarea')) {
            e.preventDefault();
        }
    });
    
    // Add escape key to exit fullscreen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
        }
        
        // F key for fullscreen toggle
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    });
}

// Utility function for fullscreen toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add window resize handler to ensure proper scaling
window.addEventListener('resize', debounce(() => {
    // Force re-layout after resize
    document.body.style.height = '100vh';
}, 250));

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}