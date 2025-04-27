document.addEventListener('DOMContentLoaded', function() {
    // Initialize page navigation
    initializeNavigation();
    
    // Initialize FAQ accordion functionality
    initializeFAQ();
    
    // Initialize form handling
    initializeForm();
});

// Function to handle navigation between pages
function initializeNavigation() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const backButtons = document.querySelectorAll('.back-button');
    
    // Add click event to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
    
    // Add click event to back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Function to navigate to a specific page
function navigateToPage(pageId) {
    // Get all pages
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the target page
    const targetPage = document.getElementById(pageId);
    
    // Apply transition
    setTimeout(() => {
        targetPage.classList.add('active');
    }, 50);
}

// Function to handle FAQ accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Function to handle form submission
function initializeForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Simulate form submission - in a real app, you would send this to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add a simple loading animation
window.addEventListener('load', function() {
    const homePage = document.getElementById('home');
    setTimeout(() => {
        homePage.classList.add('active');
    }, 300);
});
