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
    
    // Initialize dynamic mood color palette
    initializeDynamicMoodColors();
    
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
            }
        });
    }
}

// Function to initialize the floating chat with AI
function initializeFloatingChat() {
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style.position = 'fixed';
    chatContainer.style.bottom = '70px';
    chatContainer.style.right = '20px';
    chatContainer.style.width = '300px';
    chatContainer.style.height = '400px';
    chatContainer.style.backgroundColor = 'white';
    chatContainer.style.borderRadius = '10px';
    chatContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    chatContainer.style.display = 'none';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.zIndex = '1000';
    chatContainer.style.overflow = 'hidden';
    
    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.style.padding = '10px';
    chatHeader.style.backgroundColor = '#3A7F99';
    chatHeader.style.color = 'white';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.style.cursor = 'pointer';
    chatHeader.innerHTML = 'Chat with Syacretary AI <span class="close-chat" style="cursor: pointer;">×</span>';
    
    // Create chat messages container
    const chatMessages = document.createElement('div');
    chatMessages.className = 'chat-messages';
    chatMessages.style.padding = '10px';
    chatMessages.style.flexGrow = '1';
    chatMessages.style.overflowY = 'auto';
    chatMessages.style.display = 'flex';
    chatMessages.style.flexDirection = 'column';
    chatMessages.style.gap = '10px';
    
    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'chat-input-container';
    inputContainer.style.padding = '10px';
    inputContainer.style.borderTop = '1px solid #eee';
    inputContainer.style.display = 'flex';
    inputContainer.style.gap = '10px';
    
    // Create input
    const chatInput = document.createElement('input');
    chatInput.className = 'chat-input';
    chatInput.type = 'text';
    chatInput.placeholder = 'Type your message...';
    chatInput.style.flexGrow = '1';
    chatInput.style.padding = '8px';
    chatInput.style.border = '1px solid #ddd';
    chatInput.style.borderRadius = '20px';
    
    // Create send button
    const sendButton = document.createElement('button');
    sendButton.className = 'chat-send-button';
    sendButton.textContent = 'Send';
    sendButton.style.padding = '8px 15px';
    sendButton.style.backgroundColor = '#3A7F99';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '20px';
    sendButton.style.cursor = 'pointer';
    
    // Create chat toggle button
    const chatToggle = document.createElement('div');
    chatToggle.className = 'chat-toggle';
    chatToggle.style.position = 'fixed';
    chatToggle.style.bottom = '20px';
    chatToggle.style.right = '20px';
    chatToggle.style.width = '50px';
    chatToggle.style.height = '50px';
    chatToggle.style.backgroundColor = '#3A7F99';
    chatToggle.style.borderRadius = '50%';
    chatToggle.style.color = 'white';
    chatToggle.style.display = 'flex';
    chatToggle.style.justifyContent = 'center';
    chatToggle.style.alignItems = 'center';
    chatToggle.style.cursor = 'pointer';
    chatToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    chatToggle.style.zIndex = '999';
    chatToggle.innerHTML = '<span style="font-size: 25px;">💬</span>';
    
    // Assemble the chat UI
    inputContainer.appendChild(chatInput);
    inputContainer.appendChild(sendButton);
    
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(inputContainer);
    
    // Add to the document
    document.body.appendChild(chatContainer);
    document.body.appendChild(chatToggle);
    
    // Add event listeners
    chatToggle.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
        chatToggle.style.display = 'none';
        
        // Add welcome message if the chat is empty
        if (chatMessages.childElementCount === 0) {
            addMessage('Hello! I\'m Syacretary AI. How can I assist you today?', 'bot');
        }
    });
    
    chatHeader.querySelector('.close-chat').addEventListener('click', function() {
        chatContainer.style.display = 'none';
        chatToggle.style.display = 'flex';
    });
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send a message
    async function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Clear input
            chatInput.value = '';
            
            // Add user message to chat
            addMessage(message, 'user');
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator message bot-message';
            typingIndicator.textContent = 'Thinking...';
            typingIndicator.style.backgroundColor = '#e6f2f5';
            typingIndicator.style.alignSelf = 'flex-start';
            typingIndicator.style.borderRadius = '15px';
            typingIndicator.style.padding = '8px 15px';
            typingIndicator.style.maxWidth = '80%';
            chatMessages.appendChild(typingIndicator);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Process with AI
            try {
                const response = await chatWithGemini(message);
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                // Add AI response
                addMessage(response, 'bot');
            } catch (error) {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                // Add error message
                addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
                console.error('Chat error:', error);
            }
        }
    }
    
    // Function to add a message to the chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        
        // Style based on sender
        if (sender === 'user') {
            messageElement.style.backgroundColor = '#3A7F99';
            messageElement.style.color = 'white';
            messageElement.style.alignSelf = 'flex-end';
        } else {
            messageElement.style.backgroundColor = '#e6f2f5';
            messageElement.style.alignSelf = 'flex-start';
        }
        
        messageElement.style.borderRadius = '15px';
        messageElement.style.padding = '8px 15px';
        messageElement.style.maxWidth = '80%';
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to chat with Gemini API
    async function chatWithGemini(userInput) {
        try {
            const apiKey = 'GEMINI_API_KEY'; // To be replaced with actual key
            const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
            
            // Prepare the request data
            const requestData = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: userInput }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            };
            
            // Make the API request
            const response = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const responseData = await response.json();
            console.log('Gemini API response:', responseData);
            
            // Extract and return the generated text
            if (responseData.candidates && responseData.candidates.length > 0 &&
                responseData.candidates[0].content &&
                responseData.candidates[0].content.parts &&
                responseData.candidates[0].content.parts.length > 0) {
                return responseData.candidates[0].content.parts[0].text;
            } else {
                return "I'm sorry, I wasn't able to generate a response. Please try again.";
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return "I'm having trouble connecting to my brain right now. Please try again later.";
        }
    }
}
