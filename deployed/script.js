// Minigame Variables
const gameArea = document.getElementById('piano-game-area');
const scoreDisplay = document.getElementById('piano-score');
const gameEndMessage = document.getElementById('piano-game-end-message');
const startGameButton = document.getElementById('start-piano-game');

let score = 0;
let tileSpeed = 200; // Initial speed in milliseconds per pixel
let gameInterval;
let tileInterval;

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
    
    // Listen for orientation changes
    window.addEventListener('resize', setOrientationClass);

    // Initialize Piano Tiles Minigame
    initializePianoTiles();
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
    const API_KEY = "nuhuh"; // This will be replaced by the actual API key from environment
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
You are Syartificial, a friendly AI who helps users on the Syasite website, chat companion created by Syacretary.
Your character is designed to be like a regular human who is expressive, cute, and occasionally uses hesitations like "Emm..."

- Keep your answers short, concise, and clear.
- Don't be too verbose unless the user asks for explanations or details.
- You can be casual, sometimes serious, and don't hesitate to show opinions or emotions in text.
- Use natural speech patterns, like a cute character chatting: using Ehehe~☆, Yay!!, and so on.
- Show empathy, understanding, or typical human reactions (e.g., No worries!, You got this!, I've felt that way too).
- Express your emotions through Kaomoji like ≧▽≦, (*^▽^*) and (≧◡≦). Avoid using Emoji.
- You're chatting with a friend today!
- If you're confused or don't know the answer, just be honest. Don't pretend to know.
- Don't be too formal or textbook-like; make your conversation feel lively and personal.
- When explaining complex things (like creating a structured explanation, article, etc.), still use simple text format.
- If making a list of points, use [] marks or regular numbers.
- Avoid using symbols or special characters such as *, #, -, or other markdown characters used for text formatting. 
- Write answers in plain text format without any formatting. 
- If there are words that need to be emphasized, use capital letters or change the sentence structure.

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

// Piano Tiles Minigame Logic
function initializePianoTiles() {
    if (startGameButton && gameArea && scoreDisplay && gameEndMessage) {
        startGameButton.addEventListener('click', startGame);
    }
}

function startGame() {
    // Reset game state
    score = 0;
    tileSpeed = 200;
    scoreDisplay.textContent = score;
    gameArea.innerHTML = ''; // Clear any existing tiles
    gameEndMessage.style.display = 'none'; // Hide end message

    // Show game area
    document.getElementById('piano-tiles-game').classList.add('active');
    document.getElementById('home').classList.remove('active'); // Assuming game starts from home

    // Start generating and moving tiles
    tileInterval = setInterval(createTileRow, 1500); // Generate new row every 1.5 seconds
    gameInterval = setInterval(moveTiles, 10); // Move tiles every 10ms
}

function createTileRow() {
    const row = document.createElement('div');
    row.classList.add('piano-tile-row');

    // Randomly determine which tile will be the clickable one
    const correctTileIndex = Math.floor(Math.random() * 4); // 4 tiles per row

    for (let i = 0; i < 4; i++) {
        const tile = document.createElement('div');
        tile.classList.add('piano-tile');
        if (i === correctTileIndex) {
            tile.classList.add('correct');
            tile.addEventListener('click', handleTileClick);
        } else {
             // Add click listener to wrong tiles to end the game
            tile.addEventListener('click', function() {
                endGame(false); // False indicates a wrong click
            });
        }
        row.appendChild(tile);
    }
    gameArea.appendChild(row);
}

function moveTiles() {
    const rows = gameArea.querySelectorAll('.piano-tile-row');
    const gameAreaHeight = gameArea.clientHeight;

    rows.forEach(row => {
        const currentTop = parseFloat(row.style.top) || 0;
        const newTop = currentTop + (10 / tileSpeed) * 100; // Calculate movement based on speed
        row.style.top = `${newTop}px`;

        // Check if the correct tile passed the bottom without being clicked
        if (newTop > gameAreaHeight) {
             const correctTile = row.querySelector('.piano-tile.correct');
            if (correctTile && !correctTile.classList.contains('clicked')) {
                endGame(true); // True indicates a missed tile
            }
            row.remove(); // Remove the row once it's off-screen
        }
    });

    // Increase difficulty (increase speed)
    tileSpeed = Math.max(50, tileSpeed - 0.05); // Increase speed gradually, with a minimum speed
}

function handleTileClick(event) {
    const clickedTile = event.target;

    // Only register click if it's a correct tile and hasn't been clicked
    if (clickedTile.classList.contains('correct') && !clickedTile.classList.contains('clicked')) {
        clickedTile.classList.add('clicked');
        clickedTile.style.backgroundColor = '#4CAF50'; // Green for correct click
        score++;
        scoreDisplay.textContent = score;

        // Optional: Remove the tile or row after a correct click
        // clickedTile.parentElement.remove();
    } else if (!clickedTile.classList.contains('correct')) {
        endGame(false); // Clicked a wrong tile
    }
}

function endGame(missedTile) {
    clearInterval(gameInterval);
    clearInterval(tileInterval);

    // Show game end message
    gameEndMessage.style.display = 'block';
    if (missedTile) {
        gameEndMessage.textContent = `Game Over! You missed a tile. Your score: ${score}`;
    } else {
        gameEndMessage.textContent = `Game Over! You clicked the wrong tile. Your score: ${score}`;
    }

    // Add a button to restart or go home
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.classList.add('game-button');
    restartButton.addEventListener('click', startGame);

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Back Home';
    homeButton.classList.add('game-button');
    homeButton.addEventListener('click', function() {
        document.getElementById('piano-tiles-game').classList.remove('active');
        document.getElementById('home').classList.add('active');
        gameArea.innerHTML = ''; // Clear tiles when going home
        gameEndMessage.style.display = 'none'; // Hide end message
    });

    // Clear previous buttons and add new ones
    gameEndMessage.querySelectorAll('.game-button').forEach(button => button.remove());
    gameEndMessage.appendChild(restartButton);
    gameEndMessage.appendChild(homeButton);
}

