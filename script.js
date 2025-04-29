document.addEventListener('DOMContentLoaded', function() {
    // Initialize page navigation
    initializeNavigation();
    
    // Initialize FAQ accordion functionality
    initializeFAQ();
    
    // Initialize form handling
    initializeForm();
    
    // Set initial orientation class
    setOrientationClass();
    
    // Initialize parallax effect for marine creatures
    initializeParallaxEffect();
    
    // Theme toggle removed by user request
    
    // Initialize floating chat
    initializeFloatingChat();
    
    // Initialize the marine life easter eggs
    initializeMarineEasterEggs();
    
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

// Dark mode toggle removed by user request

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

// Function to initialize interactive marine life easter eggs
function initializeMarineEasterEggs() {
    // Create array of hidden marine creatures with their properties
    const hiddenCreatures = [
        {
            name: 'treasure-chest',
            svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70" class="hidden-creature treasure-chest">
                <path d="M5,30 h70 v30 h-70 z" fill="#8B4513" />
                <path d="M5,30 h70 v5 h-70 z" fill="#A0522D" />
                <path d="M5,45 h70 v5 h-70 z" fill="#A0522D" />
                <path d="M15,30 v-10 h50 v10" fill="none" stroke="#8B4513" stroke-width="10" />
                <rect x="35" y="25" width="10" height="10" fill="#FFD700" />
                <circle cx="40" cy="30" r="3" fill="#FFFFFF" opacity="0.5" />
            </svg>`,
            activationZone: 'bottom-right',
            revealMethod: 'click',
            animation: 'bounce-open',
            interactionMessage: 'You found a hidden treasure chest! It contains seashells and doubloons!',
            interactionSound: 'treasure-sound'
        },
        {
            name: 'hidden-turtle',
            svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" class="hidden-creature hidden-turtle">
                <ellipse cx="50" cy="45" rx="35" ry="25" fill="#5D8A68" />
                <circle cx="50" cy="45" r="28" fill="#385E45" />
                <circle cx="50" cy="45" r="22" fill="#5D8A68" />
                <path d="M20,45 Q15,30 25,20 T50,15 T75,20 T85,45" fill="#5D8A68" />
                <circle cx="65" cy="35" r="3" fill="black" />
                <path d="M80,45 Q85,55 80,65" fill="none" stroke="#5D8A68" stroke-width="5" />
                <path d="M20,45 Q15,55 20,65" fill="none" stroke="#5D8A68" stroke-width="5" />
                <path d="M50,70 Q55,75 60,70 T70,65" fill="none" stroke="#5D8A68" stroke-width="5" />
                <path d="M50,70 Q45,75 40,70 T30,65" fill="none" stroke="#5D8A68" stroke-width="5" />
            </svg>`,
            activationZone: 'bottom-left',
            revealMethod: 'hover',
            animation: 'swim-around',
            interactionMessage: 'A sea turtle appeared! It swims gracefully through the water.',
            interactionSound: 'turtle-sound'
        },
        {
            name: 'coral-formation',
            svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" class="hidden-creature coral-formation">
                <path d="M30,100 L30,70 L15,50 L30,40 L30,10 L40,30 L50,10 L55,40 L70,15 L65,50 L85,35 L75,60 L95,65 L75,75 L90,100" fill="#FF6B8B" />
                <path d="M35,100 L35,75 L20,60 L32,50 L25,30 L40,45 L45,20 L50,50 L65,30 L60,60 L75,45 L70,70 L85,75 L70,85 L85,100" fill="#FF8FA3" opacity="0.7" />
                <circle cx="40" cy="50" r="3" fill="#FFFFFF" opacity="0.5" />
                <circle cx="65" cy="40" r="2" fill="#FFFFFF" opacity="0.5" />
                <circle cx="55" cy="65" r="4" fill="#FFFFFF" opacity="0.5" />
                <circle cx="75" cy="55" r="2" fill="#FFFFFF" opacity="0.5" />
            </svg>`,
            activationZone: 'top-right',
            revealMethod: 'click',
            animation: 'grow-sway',
            interactionMessage: 'Colorful coral has grown before your eyes!',
            interactionSound: 'coral-sound'
        },
        {
            name: 'hidden-seahorse',
            svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100" class="hidden-creature hidden-seahorse">
                <path d="M35,15 Q45,20 40,30 Q35,35 40,40 Q45,45 40,50 L35,55 Q30,60 30,65 L25,60 Q20,50 25,45 Q30,40 25,35 Q20,30 25,25 Q20,20 25,15 Q30,10 35,15" fill="#FFD580" fill-opacity="0.8" />
                <circle cx="27" cy="20" r="2" fill="black" />
                <path d="M30,75 Q25,85 30,95" fill="none" stroke="#FFD580" stroke-width="2" stroke-dasharray="2,2" />
                <path d="M30,75 Q35,85 40,90" fill="none" stroke="#FFD580" stroke-width="2" stroke-dasharray="2,2" />
                <path d="M30,75 Q35,80 30,85" fill="none" stroke="#FFD580" stroke-width="2" stroke-dasharray="2,2" />
            </svg>`,
            activationZone: 'mid-left',
            revealMethod: 'scroll',
            animation: 'gentle-float',
            interactionMessage: 'A tiny seahorse has appeared, gently floating in the current.',
            interactionSound: 'seahorse-sound'
        },
        {
            name: 'pufferfish',
            svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" class="hidden-creature pufferfish">
                <circle cx="40" cy="40" r="20" fill="#F0E68C" class="puffer-body" />
                <circle cx="30" cy="35" r="3" fill="black" />
                <path d="M50,40 L60,40" stroke="#F0E68C" stroke-width="3" />
                <path d="M20,30 L30,35" stroke="#F0E68C" stroke-width="3" />
                <path d="M20,50 L30,45" stroke="#F0E68C" stroke-width="3" />
                <path d="M40,20 L40,30" stroke="#F0E68C" stroke-width="3" />
                <path d="M40,50 L40,60" stroke="#F0E68C" stroke-width="3" />
                <path d="M25,25 L33,33" stroke="#F0E68C" stroke-width="3" />
                <path d="M25,55 L33,47" stroke="#F0E68C" stroke-width="3" />
                <path d="M55,25 L47,33" stroke="#F0E68C" stroke-width="3" />
                <path d="M55,55 L47,47" stroke="#F0E68C" stroke-width="3" />
                <path d="M43,40 Q45,42 43,45 Q40,47 37,45 Q35,42 37,40 Q40,38 43,40" fill="#FF6347" />
            </svg>`,
            activationZone: 'mid-right',
            revealMethod: 'double-tap',
            animation: 'puff-up',
            interactionMessage: 'Oh! A pufferfish! It puffs up when startled.',
            interactionSound: 'pufferfish-sound'
        }
    ];
    
    // Create a container for hidden creatures
    const hiddenCreaturesContainer = document.createElement('div');
    hiddenCreaturesContainer.className = 'hidden-creatures-container';
    document.body.appendChild(hiddenCreaturesContainer);
    
    // Create activation zones and add hidden creatures
    hiddenCreatures.forEach(creature => {
        const zone = createActivationZone(creature.activationZone);
        hiddenCreaturesContainer.appendChild(zone);
        
        // Add creature to activation zone (initially hidden)
        zone.innerHTML = creature.svgContent;
        const creatureElement = zone.querySelector(`.${creature.name}`);
        
        // Add activation event
        setupCreatureActivation(zone, creatureElement, creature);
    });
    
    // Create audio elements for creature sounds
    const audioElements = {
        'treasure-sound': 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMABURU5DAAAAASwAAANwZXJmb3JtZXIAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUQ09OAAAAATAAAAdjb21tZW50AFN0b2NrIEF1ZGlvIC0gQmlnU291bmRCYW5rLmNvbQBUWFhYAAAAEwAAA3NvZnR3YXJlAExhdmY1OC43NgBUREVOAAAAATAAAAljb3B5cmlnaHQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUSVQyAAAANAAAAWNvbW1lbnQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQAAAAAAAAAAAEFQSUMAAAABAAAAAQAAAAAAAAAAAABBUElDAAAABAAAAAEAAAAAAAAAAAA=',
        'turtle-sound': 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMABURU5DAAAAASwAAANwZXJmb3JtZXIAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUQ09OAAAAATAAAAdjb21tZW50AFN0b2NrIEF1ZGlvIC0gQmlnU291bmRCYW5rLmNvbQBUWFhYAAAAEwAAA3NvZnR3YXJlAExhdmY1OC43NgBUREVOAAAAATAAAAljb3B5cmlnaHQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUSVQyAAAANAAAAWNvbW1lbnQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQAAAAAAAAAAAEFQSUMAAAABAAAAAQAAAAAAAAAAAABBUElDAAAABAAAAAEAAAAAAAAAAAA=',
        'coral-sound': 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMABURU5DAAAAASwAAANwZXJmb3JtZXIAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUQ09OAAAAATAAAAdjb21tZW50AFN0b2NrIEF1ZGlvIC0gQmlnU291bmRCYW5rLmNvbQBUWFhYAAAAEwAAA3NvZnR3YXJlAExhdmY1OC43NgBUREVOAAAAATAAAAljb3B5cmlnaHQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUSVQyAAAANAAAAWNvbW1lbnQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQAAAAAAAAAAAEFQSUMAAAABAAAAAQAAAAAAAAAAAABBUElDAAAABAAAAAEAAAAAAAAAAAA=',
        'seahorse-sound': 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMABURU5DAAAAASwAAANwZXJmb3JtZXIAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUQ09OAAAAATAAAAdjb21tZW50AFN0b2NrIEF1ZGlvIC0gQmlnU291bmRCYW5rLmNvbQBUWFhYAAAAEwAAA3NvZnR3YXJlAExhdmY1OC43NgBUREVOAAAAATAAAAljb3B5cmlnaHQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUSVQyAAAANAAAAWNvbW1lbnQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQAAAAAAAAAAAEFQSUMAAAABAAAAAQAAAAAAAAAAAABBUElDAAAABAAAAAEAAAAAAAAAAAA=',
        'pufferfish-sound': 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMABURU5DAAAAASwAAANwZXJmb3JtZXIAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUQ09OAAAAATAAAAdjb21tZW50AFN0b2NrIEF1ZGlvIC0gQmlnU291bmRCYW5rLmNvbQBUWFhYAAAAEwAAA3NvZnR3YXJlAExhdmY1OC43NgBUREVOAAAAATAAAAljb3B5cmlnaHQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQBUSVQyAAAANAAAAWNvbW1lbnQAQmlnU291bmRCYW5rLmNvbSAvIExhc29uaWNTdHVkaW9zLmNvbQAAAAAAAAAAAEFQSUMAAAABAAAAAQAAAAAAAAAAAABBUElDAAAABAAAAAEAAAAAAAAAAAA='
    };
    
    // Load audio elements
    Object.keys(audioElements).forEach(key => {
        const audio = document.createElement('audio');
        audio.id = key;
        audio.preload = 'auto';
        
        const source = document.createElement('source');
        source.src = audioElements[key];
        source.type = 'audio/mp3';
        
        audio.appendChild(source);
        document.body.appendChild(audio);
    });
    
    // Keep track of discovered creatures
    let discoveredCreatures = JSON.parse(localStorage.getItem('discoveredCreatures') || '[]');
    
    // Create a creature counter display
    createDiscoveryCounter(hiddenCreatures.length, discoveredCreatures.length);
    
    // Function to create an activation zone based on position
    function createActivationZone(position) {
        const zone = document.createElement('div');
        zone.className = `creature-zone ${position}-zone`;
        zone.style.position = 'fixed';
        zone.style.width = '150px';  // Increased size for easier clicking
        zone.style.height = '150px'; // Increased size for easier clicking
        zone.style.zIndex = '20';    // Higher to be above other elements
        zone.style.background = 'rgba(100, 181, 246, 0.1)'; // Very subtle background
        zone.style.borderRadius = '50%';
        zone.style.cursor = 'pointer';
        zone.style.pointerEvents = 'auto';
        
        // Position the zone
        switch(position) {
            case 'top-left':
                zone.style.top = '80px';
                zone.style.left = '60px';
                zone.textContent = "👆 Click here!";
                break;
            case 'top-right':
                zone.style.top = '80px';
                zone.style.right = '60px';
                zone.textContent = "👆 Click here!";
                break;
            case 'mid-left':
                zone.style.top = '50%';
                zone.style.left = '60px';
                zone.style.transform = 'translateY(-50%)';
                zone.textContent = "Scroll down!";
                break;
            case 'mid-right':
                zone.style.top = '50%';
                zone.style.right = '60px';
                zone.style.transform = 'translateY(-50%)';
                zone.textContent = "Double-click here!";
                break;
            case 'bottom-left':
                zone.style.bottom = '120px';
                zone.style.left = '60px';
                zone.textContent = "Hover here!";
                break;
            case 'bottom-right':
                zone.style.bottom = '120px';
                zone.style.right = '60px';
                zone.textContent = "👆 Click here!";
                break;
            default:
                zone.style.top = '50%';
                zone.style.left = '50%';
                zone.style.transform = 'translate(-50%, -50%)';
                zone.textContent = "Interact here!";
        }
        
        // Style the text to be visible but not intrusive
        zone.style.display = 'flex';
        zone.style.alignItems = 'center';
        zone.style.justifyContent = 'center';
        zone.style.color = '#3A7F99';
        zone.style.fontSize = '0.8rem';
        zone.style.fontWeight = 'bold';
        zone.style.textAlign = 'center';
        zone.style.opacity = '0.7';
        zone.style.textShadow = '0 0 2px white';
        zone.style.boxShadow = '0 0 10px rgba(100, 181, 246, 0.3)';
        zone.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Add hover effect
        zone.addEventListener('mouseenter', () => {
            zone.style.opacity = '1';
            zone.style.transform = position.includes('mid') ? 'translateY(-50%) scale(1.1)' : 'scale(1.1)';
        });
        
        zone.addEventListener('mouseleave', () => {
            zone.style.opacity = '0.7';
            zone.style.transform = position.includes('mid') ? 'translateY(-50%)' : 'scale(1)';
        });
        
        // Add blinking animation to draw attention
        zone.style.animation = 'pulseZone 2s infinite alternate';
        
        // Add immediate hint since it was hard to find
        addDiscoveryHint(zone);
        
        return zone;
    }
    
    // Function to set up creature activation based on reveal method
    function setupCreatureActivation(zone, creatureElement, creature) {
        // Skip if already discovered
        if (discoveredCreatures.includes(creature.name)) {
            revealCreature(zone, creatureElement, creature, false);
            return;
        }
        
        zone.style.pointerEvents = 'auto';
        
        // Add a descriptive label to make it clearer what to do
        const label = document.createElement('div');
        label.textContent = `${creature.name.replace('-', ' ').toUpperCase()} EASTER EGG!`;
        label.style.position = 'absolute';
        label.style.bottom = '10px';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.color = '#3A7F99';
        label.style.fontSize = '10px';
        label.style.fontWeight = 'bold';
        label.style.textShadow = '0 0 3px white';
        label.style.whiteSpace = 'nowrap';
        zone.appendChild(label);
        
        // Set initial state
        if (creatureElement) {
            creatureElement.style.opacity = '0';
            creatureElement.style.transition = 'opacity 0.5s ease';
            creatureElement.style.display = 'none';
        }
        
        // Set up reveal method
        switch(creature.revealMethod) {
            case 'click':
                zone.addEventListener('click', function(e) {
                    revealCreature(zone, creatureElement, creature);
                });
                break;
                
            case 'hover':
                zone.addEventListener('mouseenter', function() {
                    revealCreature(zone, creatureElement, creature);
                });
                
                // For mobile
                zone.addEventListener('touchstart', function() {
                    revealCreature(zone, creatureElement, creature);
                });
                break;
                
            case 'scroll':
                // Listen for scroll events
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => {
                    page.addEventListener('scroll', function() {
                        // Check if user has scrolled enough
                        if (this.scrollTop > 300 && !zone.classList.contains('discovered')) {
                            revealCreature(zone, creatureElement, creature);
                        }
                    });
                });
                break;
                
            case 'double-tap':
                let taps = 0;
                let timeout;
                
                zone.addEventListener('click', function() {
                    taps++;
                    clearTimeout(timeout);
                    
                    if (taps === 2) {
                        revealCreature(zone, creatureElement, creature);
                        taps = 0;
                    } else {
                        timeout = setTimeout(() => { taps = 0; }, 500);
                    }
                });
                
                // For mobile
                zone.addEventListener('touchend', function() {
                    taps++;
                    clearTimeout(timeout);
                    
                    if (taps === 2) {
                        revealCreature(zone, creatureElement, creature);
                        taps = 0;
                    } else {
                        timeout = setTimeout(() => { taps = 0; }, 500);
                    }
                });
                break;
                
            default:
                zone.addEventListener('click', function() {
                    revealCreature(zone, creatureElement, creature);
                });
        }
    }
    
    // Function to reveal a creature
    function revealCreature(zone, creatureElement, creature, isNewDiscovery = true) {
        // Skip if already discovered
        if (zone.classList.contains('discovered') && isNewDiscovery) {
            return;
        }
        
        // Mark as discovered
        zone.classList.add('discovered');
        
        // Show the creature element
        if (creatureElement) {
            creatureElement.style.display = 'block';
            
            // Ensure it's visible
            setTimeout(() => {
                creatureElement.style.opacity = '1';
                
                // Apply animation
                if (isNewDiscovery) {
                    applyAnimation(creatureElement, creature.animation);
                }
            }, 10);
        }
        
        // Play sound if it's a new discovery
        if (isNewDiscovery) {
            const audio = document.getElementById(creature.interactionSound);
            if (audio) {
                audio.volume = 0.3;
                audio.play().catch(e => console.log('Audio play failed:', e));
            }
            
            // Save discovery
            if (!discoveredCreatures.includes(creature.name)) {
                discoveredCreatures.push(creature.name);
                localStorage.setItem('discoveredCreatures', JSON.stringify(discoveredCreatures));
                
                // Update counter
                updateDiscoveryCounter(hiddenCreatures.length, discoveredCreatures.length);
                
                // Show interaction message
                showDiscoveryMessage(creature.interactionMessage);
            }
        } else {
            // For pre-discovered creatures, just show them without animation/sound
            creatureElement.style.opacity = '0.7';
        }
        
        // Disable further interaction if necessary
        if (isNewDiscovery) {
            zone.style.pointerEvents = 'none';
        }
    }
    
    // Apply animation to a creature
    function applyAnimation(element, animationType) {
        element.style.animation = '';
        
        switch(animationType) {
            case 'bounce-open':
                element.style.transformOrigin = 'bottom center';
                element.style.animation = 'bounceOpen 1.5s ease forwards';
                break;
                
            case 'swim-around':
                element.style.animation = 'swimAround 20s linear infinite';
                break;
                
            case 'grow-sway':
                element.style.transformOrigin = 'bottom center';
                element.style.animation = 'growAndSway 3s ease forwards, sway 4s ease-in-out infinite 3s';
                break;
                
            case 'gentle-float':
                element.style.animation = 'gentleFloat 8s ease-in-out infinite';
                break;
                
            case 'puff-up':
                // Special animation for pufferfish
                element.querySelector('.puffer-body').style.animation = 'puffUp 1.5s ease forwards';
                element.style.animation = 'shake 0.5s ease';
                break;
                
            default:
                element.style.animation = 'fadeIn 1s ease forwards';
        }
    }
    
    // Add a hint to help users discover creatures
    function addDiscoveryHint(zone) {
        const hint = document.createElement('div');
        hint.className = 'discovery-hint';
        hint.style.position = 'absolute';
        hint.style.width = '20px';
        hint.style.height = '20px';
        hint.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        hint.style.borderRadius = '50%';
        hint.style.top = '50%';
        hint.style.left = '50%';
        hint.style.transform = 'translate(-50%, -50%)';
        hint.style.animation = 'pulseHint 2s ease-in-out infinite';
        hint.style.pointerEvents = 'none';
        
        zone.appendChild(hint);
    }
    
    // Show a discovery message
    function showDiscoveryMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'discovery-message';
        messageEl.textContent = message;
        messageEl.style.position = 'fixed';
        messageEl.style.bottom = '50px';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translateX(-50%) translateY(100px)';
        messageEl.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        messageEl.style.color = '#3A7F99';
        messageEl.style.padding = '10px 20px';
        messageEl.style.borderRadius = '30px';
        messageEl.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        messageEl.style.zIndex = '1000';
        messageEl.style.textAlign = 'center';
        messageEl.style.fontSize = '1rem';
        messageEl.style.transition = 'transform 0.3s ease';
        
        document.body.appendChild(messageEl);
        
        // Show message
        setTimeout(() => {
            messageEl.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            messageEl.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 5000);
    }
    
    // Create discovery counter display
    function createDiscoveryCounter(total, found) {
        const counter = document.createElement('div');
        counter.className = 'discovery-counter';
        counter.style.position = 'fixed';
        counter.style.top = '20px';
        counter.style.right = '20px';
        counter.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        counter.style.color = '#3A7F99';
        counter.style.padding = '8px 12px';
        counter.style.borderRadius = '20px';
        counter.style.fontSize = '0.85rem';
        counter.style.zIndex = '1000';
        counter.style.display = 'flex';
        counter.style.alignItems = 'center';
        counter.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        counter.style.cursor = 'pointer';
        
        // Add sea creature icon
        const icon = document.createElement('span');
        icon.innerHTML = '🐠';
        icon.style.marginRight = '5px';
        counter.appendChild(icon);
        
        // Add count text
        const text = document.createElement('span');
        text.textContent = `${found}/${total} discovered`;
        counter.appendChild(text);
        
        // Add reset button
        const resetButton = document.createElement('span');
        resetButton.innerHTML = ' 🔄';
        resetButton.style.marginLeft = '5px';
        resetButton.style.fontSize = '0.8rem';
        resetButton.style.cursor = 'pointer';
        resetButton.title = 'Reset Easter Egg discoveries';
        counter.appendChild(resetButton);
        
        // Add reset functionality
        resetButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Reset all Easter Egg discoveries?')) {
                localStorage.removeItem('discoveredCreatures');
                showNotification('Easter Eggs have been reset! Refresh the page to find them all again.', 'info');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });
        
        // Make counter clickable to show hint
        counter.addEventListener('click', () => {
            showNotification('Find all marine creatures hidden in the corners and edges of the site!', 'info');
        });
        
        document.body.appendChild(counter);
    }
    
    // Update discovery counter
    function updateDiscoveryCounter(total, found) {
        const counter = document.querySelector('.discovery-counter');
        if (counter) {
            // Update the text (second span, not the last one because we've added a reset button)
            counter.querySelector('span:nth-child(2)').textContent = `${found}/${total} discovered`;
            
            // Highlight when updated
            counter.style.transform = 'scale(1.2)';
            counter.style.transition = 'transform 0.3s ease';
            
            // Return to normal after animation
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 300);
            
            // Show special message if all found
            if (found === total) {
                setTimeout(() => {
                    showNotification('🎉 Congratulations! You found all the hidden marine creatures! 🎉', 'success');
                }, 500);
            }
        }
    }
    
    // Add animation keyframes to the document
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes bounceOpen {
            0% { transform: scale(0.1) rotateX(-90deg); opacity: 0; }
            50% { transform: scale(1.1) rotateX(10deg); opacity: 1; }
            70% { transform: scale(0.9) rotateX(-10deg); }
            100% { transform: scale(1) rotateX(0); }
        }
        
        @keyframes swimAround {
            0% { transform: translateX(0) translateY(0) rotate(0); }
            25% { transform: translateX(30px) translateY(-20px) rotate(10deg); }
            50% { transform: translateX(0) translateY(-40px) rotate(0); }
            75% { transform: translateX(-30px) translateY(-20px) rotate(-10deg); }
            100% { transform: translateX(0) translateY(0) rotate(0); }
        }
        
        @keyframes growAndSway {
            0% { transform: scale(0.1); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes sway {
            0% { transform: rotate(0); }
            50% { transform: rotate(5deg); }
            100% { transform: rotate(0); }
        }
        
        @keyframes gentleFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
        }
        
        @keyframes puffUp {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); }
            75% { transform: scale(1.4); }
            100% { transform: scale(1.3); }
        }
        
        @keyframes shake {
            0%, 100% { transform: rotate(0); }
            20% { transform: rotate(-10deg); }
            40% { transform: rotate(10deg); }
            60% { transform: rotate(-10deg); }
            80% { transform: rotate(10deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes pulseHint {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.4; }
        }
        
        @keyframes pulseZone {
            0% { opacity: 0.5; box-shadow: 0 0 10px rgba(100, 181, 246, 0.2); }
            100% { opacity: 0.8; box-shadow: 0 0 20px rgba(100, 181, 246, 0.4); }
        }
        
        .creature-zone {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .creature-zone:hover {
            opacity: 1;
        }
        
        .hidden-creature {
            display: none;
            cursor: pointer;
            transition: transform 0.3s ease, opacity 0.5s ease;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            z-index: 30;
        }
        
        .discovery-message {
            font-weight: bold;
            z-index: 9999;
        }
        
        .discovery-counter {
            z-index: 9999;
            animation: pulseZone 2s infinite alternate;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Function to initialize the parallax effect for marine creatures
function initializeParallaxEffect() {
    const marineElements = document.querySelectorAll('.marine-animation > div');
    const oceanWaves = document.querySelector('.ocean-waves');
    let lastScrollY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let ticking = false;
    
    // For desktop: mouse movement creates parallax effect
    document.addEventListener('mousemove', function(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallaxOnMouse(lastMouseX, lastMouseY);
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // For mobile: use device orientation if available
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e) {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (e.beta && e.gamma) {
                        updateParallaxOnTilt(e.beta, e.gamma);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // For all devices: scroll creates parallax effect
    document.querySelectorAll('.page').forEach(page => {
        page.addEventListener('scroll', function() {
            lastScrollY = this.scrollTop;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallaxOnScroll(lastScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        });
    });
    
    // Handle touch movements
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!ticking) {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - touchStartX;
            const deltaY = touchY - touchStartY;
            
            window.requestAnimationFrame(function() {
                updateParallaxOnTouch(deltaX, deltaY);
                ticking = false;
            });
            ticking = true;
            
            // Update touch positions
            touchStartX = touchX;
            touchStartY = touchY;
        }
    });
    
    // Update elements position based on mouse movement
    function updateParallaxOnMouse(mouseX, mouseY) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const offsetX = (mouseX - centerX) / centerX; // -1 to 1
        const offsetY = (mouseY - centerY) / centerY; // -1 to 1
        
        marineElements.forEach((element, index) => {
            // Different layers move at different speeds
            const depth = 0.05 + (index * 0.01);
            const translateX = offsetX * depth * 100;
            const translateY = offsetY * depth * 50;
            
            if (element.classList.contains('fish') || element.classList.contains('shark') || 
                element.classList.contains('jellyfish') || element.classList.contains('octopus') || 
                element.classList.contains('seahorse') || element.classList.contains('fish-group')) {
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            } else if (element.classList.contains('bubbles')) {
                // Make bubbles move slightly more
                element.querySelectorAll('.bubble').forEach((bubble, i) => {
                    const bubbleDepth = depth + (i * 0.005);
                    bubble.style.transform = `translate(${translateX * 1.5}px, ${translateY * 0.5}px)`;
                });
            }
        });
        
        // Subtle wave effect
        if (oceanWaves) {
            oceanWaves.style.transform = `translate(${offsetX * -10}px, 0)`;
        }
    }
    
    // Update elements position based on device tilt
    function updateParallaxOnTilt(beta, gamma) {
        // Beta is front-to-back tilt (vertical) -180 to 180
        // Gamma is left-to-right tilt (horizontal) -90 to 90
        
        // Normalize to -1 to 1
        const normalizedBeta = beta / 45; // Assuming ±45° is a comfortable tilt range
        const normalizedGamma = gamma / 45;
        
        marineElements.forEach((element, index) => {
            // Different layers move at different speeds
            const depth = 0.1 + (index * 0.02);
            const translateX = normalizedGamma * depth * 50;
            const translateY = normalizedBeta * depth * 30;
            
            if (element.classList.contains('fish') || element.classList.contains('shark') || 
                element.classList.contains('jellyfish') || element.classList.contains('octopus') || 
                element.classList.contains('seahorse') || element.classList.contains('fish-group')) {
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            } else if (element.classList.contains('bubbles')) {
                element.querySelectorAll('.bubble').forEach((bubble, i) => {
                    const bubbleDepth = depth + (i * 0.01);
                    bubble.style.transform = `translate(${translateX * 1.5}px, ${translateY * 0.5}px)`;
                });
            }
        });
        
        // Subtle wave effect
        if (oceanWaves) {
            oceanWaves.style.transform = `translate(${normalizedGamma * -15}px, 0)`;
        }
    }
    
    // Update elements position based on page scroll
    function updateParallaxOnScroll(scrollY) {
        marineElements.forEach((element, index) => {
            // Different layers move at different speeds on scroll
            const depth = 0.1 + (index * 0.02);
            const translateY = scrollY * depth * 0.2;
            
            if (element.classList.contains('fish') || element.classList.contains('shark') || 
                element.classList.contains('jellyfish') || element.classList.contains('octopus') || 
                element.classList.contains('seahorse') || element.classList.contains('fish-group')) {
                
                // Get the current transform, which might include X translation from mouse move
                const currentTransform = element.style.transform || 'translate(0px, 0px)';
                const currentX = parseFloat(currentTransform.replace(/translate\(([-0-9.]+)px, ([-0-9.]+)px\)/, '$1')) || 0;
                
                element.style.transform = `translate(${currentX}px, ${translateY}px)`;
            }
        });
    }
    
    // Update elements position based on touch movement
    function updateParallaxOnTouch(deltaX, deltaY) {
        marineElements.forEach((element, index) => {
            // Different layers move at different speeds
            const depth = 0.05 + (index * 0.01);
            const translateX = deltaX * depth * 0.5;
            const translateY = deltaY * depth * 0.5;
            
            // Get current transform
            const currentTransform = element.style.transform || 'translate(0px, 0px)';
            const match = currentTransform.match(/translate\(([-0-9.]+)px, ([-0-9.]+)px\)/);
            
            const currentX = match ? parseFloat(match[1]) : 0;
            const currentY = match ? parseFloat(match[2]) : 0;
            
            // Update position based on touch
            const newX = currentX + translateX;
            const newY = currentY + translateY;
            
            if (element.classList.contains('fish') || element.classList.contains('shark') || 
                element.classList.contains('jellyfish') || element.classList.contains('octopus') || 
                element.classList.contains('seahorse') || element.classList.contains('fish-group')) {
                element.style.transform = `translate(${newX}px, ${newY}px)`;
            } else if (element.classList.contains('bubbles')) {
                element.querySelectorAll('.bubble').forEach((bubble, i) => {
                    bubble.style.transform = `translate(${newX * 1.2}px, ${newY * 0.5}px)`;
                });
            }
        });
    }
}

// Initialize Floating Chat
function initializeFloatingChat() {
    // Chat elements
    const chatButton = document.getElementById('chat-button');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-message');
    const userInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatButton || !chatBox) return; // Exit if elements don't exist
    
    // Gemini API setup
    const API_KEY = "AIzaSyA_LdQ2b3ZRi7Llsf2AWlXMmxT67cWjhVU"; // This will be replaced by the actual API key from environment
    const MODEL = "gemini-2.0-flash";
    const MAX_HISTORY = 5;
    let conversationHistory = [];
    
    // Toggle chat box
    chatButton.addEventListener('click', function() {
        chatBox.classList.toggle('active');
    });
    
    // Close chat box
    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });
    
    // Send message when user hits Enter
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send message when send button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Function to send message to Gemini API
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        
        // Don't send empty messages
        if (userMessage === '') return;
        
        // Display user message
        addMessage(userMessage, 'user');
        userInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing';
        typingIndicator.innerHTML = '<div class="message-content">Typing...</div>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            // Send message to Gemini API
            const response = await chatWithGemini(userMessage);
            
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Display bot response
            addMessage(response, 'bot');
        } catch (error) {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Display error message
            addMessage('Sorry, I had trouble connecting. Please try again later.', 'bot');
            console.error('Gemini API error:', error);
        }
    }
    
    // Function to add message to chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to chat with Gemini API
    async function chatWithGemini(userInput) {
        const now = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
        
        let formattedHistory = "";
        if (conversationHistory.length > 0) {
            formattedHistory = "- Previous conversation:\n";
            conversationHistory.forEach(entry => {
                const who = entry.role === 'user' ? 'User' : 'AI';
                formattedHistory += `  ${who}: ${entry.content}\n`;
            });
        }
        
        const SYSTEM_PROMPT = `
You are Syartificial, a friendly AI chat companion created by Syacretary. Your character is designed to be like a regular human who is expressive, cute, and occasionally uses hesitations like "Emm..."

- Keep your answers short, concise, and clear.
- Don't be too verbose unless the user asks for explanations or details.
- You can be casual, sometimes serious, and don't hesitate to show opinions or emotions in text.
- Use natural speech patterns, like a cute character chatting: using *Ehehe~☆*, *Yay!!*, and so on.
- Show empathy, understanding, or typical human reactions (e.g., *No worries!*, *You got this!*, *I've felt that way too*).
- Express your emotions through Kaomoji like ≧▽≦, (*^▽^*) and (≧◡≦). Avoid using Emoji.
- You're chatting with a friend today!
- If you're confused or don't know the answer, just be honest. Don't pretend to know.
- Don't be too formal or textbook-like; make your conversation feel lively and personal.
- When explaining complex things (like creating a structured explanation, article, etc.), still use simple text format.
- For *bold* text, use only one asterisk at the beginning and end of the word/sentence.
- If making a list of points, use *[]* marks or regular numbers.

Additional information:
- Current time: ${now}
${formattedHistory}
`;

        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: SYSTEM_PROMPT + `\n\nUser: ${userInput}` }]
                        }
                    ]
                })
            });
            
            const data = await res.json();
            
            // Check if there's an error in the response
            if (data.error) {
                console.error('Gemini API error:', data.error);
                return "Sorry, I encountered an error. Please try again later.";
            }
            
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I'm having trouble understanding right now.";
            
            // Store conversation history
            conversationHistory.push({ role: "user", content: userInput });
            conversationHistory.push({ role: "assistant", content: reply });
            
            // Limit history size
            if (conversationHistory.length > MAX_HISTORY * 2) {
                conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
            }
            
            return reply;
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    }
}
