document.addEventListener('DOMContentLoaded', function() {
    // Initialize page navigation
    initializeNavigation();
    
    // Initialize FAQ accordion functionality
    initializeFAQ();
    
    // Initialize form handling
    initializeForm();
    
    // Set initial orientation class
    setOrientationClass();
    
    // Listen for orientation changes
    window.addEventListener('resize', setOrientationClass);
});

// Function to set the orientation class on the body element
function setOrientationClass() {
    const isPortrait = window.innerHeight > window.innerWidth;
    document.body.classList.toggle('portrait', isPortrait);
    document.body.classList.toggle('landscape', !isPortrait);
}

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
    
    // Add touch feedback if it's a touch event
    if ('ontouchstart' in window) {
        // Get the currently active page for scroll position
        const activePage = document.querySelector('.page.active');
        const scrollPosition = activePage ? activePage.scrollTop : 0;
        
        // Hide all pages with transition
        pages.forEach(page => {
            page.classList.remove('active');
            // Store scroll position to restore later if coming back to this page
            if (page.id) {
                sessionStorage.setItem(`scroll-${page.id}`, scrollPosition);
            }
        });
    } else {
        // For non-touch devices, just remove active class
        pages.forEach(page => {
            page.classList.remove('active');
        });
    }
    
    // Show the target page
    const targetPage = document.getElementById(pageId);
    
    // Apply transition
    setTimeout(() => {
        targetPage.classList.add('active');
        
        // Restore scroll position if available
        const storedScrollPosition = sessionStorage.getItem(`scroll-${pageId}`);
        if (storedScrollPosition) {
            targetPage.scrollTop = parseInt(storedScrollPosition);
        } else {
            targetPage.scrollTop = 0; // Reset to top for new pages
        }
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

// Function to handle form submission with Telegram integration
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
                showNotification('Please fill out all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Send to Telegram
            sendToTelegram(name, email, message);
        });
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to send message to Telegram
async function sendToTelegram(name, email, message) {
    const TOKEN = "7544492723:AAGLIV7UEdLmV43WmHBv_aQvrC-bwyXhJ-k";
    const CHAT_ID = "-1002489337132";
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    // Format the message for Telegram
    const formattedMessage = `
🔔 New Contact Message:
    
From: ${name}
Email: ${email}
Message: ${message}
    `;
    
    try {
        // Show sending message notification
        showNotification('Sending message...', 'info');
        
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: formattedMessage,
                parse_mode: 'HTML'
            }),
        });
        
        const data = await response.json();
        
        if (data.ok) {
            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset the form
            document.querySelector('.contact-form').reset();
        } else {
            console.error('Telegram API error:', data);
            showNotification(`Error sending message: ${data.description}`, 'error');
        }
    } catch (error) {
        console.error('Send to Telegram error:', error);
        showNotification('Could not send message. Please try again later.', 'error');
    }
}

// Function to show notification
function showNotification(message, type) {
    // Check if notification element exists, create if not
    let notificationEl = document.getElementById('notification');
    
    if (!notificationEl) {
        notificationEl = document.createElement('div');
        notificationEl.id = 'notification';
        document.body.appendChild(notificationEl);
    }
    
    // Set the notification style based on type
    notificationEl.className = `notification ${type}`;
    notificationEl.textContent = message;
    
    // Show the notification
    notificationEl.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        notificationEl.classList.remove('show');
    }, 4000);
}

// Add smooth scrolling for all links that have a hash
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip links with just "#" as href
    if (anchor.getAttribute('href') === '#') return;
    
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
