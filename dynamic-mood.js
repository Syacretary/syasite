// Function to initialize dynamic mood colors
function initializeDynamicMoodColors() {
    // Define our color moods
    const colorMoods = {
        calm: {
            primary: '#79C7D3',
            secondary: '#3A7F99',
            accent: '#184759',
            background: '#F0F8FF',
            text: '#333333',
            description: 'Calm',
            icon: '🌊'
        },
        energetic: {
            primary: '#FF7043',
            secondary: '#E64A19',
            accent: '#BF360C',
            background: '#FFF8F0',
            text: '#3E2723',
            description: 'Energetic',
            icon: '⚡'
        },
        creative: {
            primary: '#9C27B0',
            secondary: '#7B1FA2',
            accent: '#4A148C',
            background: '#F3E5F5',
            text: '#37474F',
            description: 'Creative',
            icon: '🎨'
        },
        professional: {
            primary: '#0288D1',
            secondary: '#01579B',
            accent: '#01579B',
            background: '#E1F5FE',
            text: '#263238',
            description: 'Professional',
            icon: '💼'
        },
        friendly: {
            primary: '#7CB342',
            secondary: '#33691E',
            accent: '#558B2F',
            background: '#F1F8E9',
            text: '#33691E',
            description: 'Friendly',
            icon: '🌱'
        }
    };
    
    // Initialize with default mood (calm)
    let currentMood = 'calm';
    
    // Try to load saved mood
    try {
        const savedMood = localStorage.getItem('userMood');
        if (savedMood && colorMoods[savedMood]) {
            currentMood = savedMood;
        }
    } catch (e) {
        console.error('Error loading mood:', e);
    }
    
    // Function to apply color mood
    function applyColorMood(mood) {
        const colors = colorMoods[mood];
        
        // Apply to CSS variables
        document.documentElement.style.setProperty('--primary-color', colors.primary);
        document.documentElement.style.setProperty('--secondary-color', colors.secondary);
        document.documentElement.style.setProperty('--accent-color', colors.accent);
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--text-color', colors.text);
        
        // Save preference
        localStorage.setItem('userMood', mood);
        currentMood = mood;
        
        // Update indicator if exists
        updateMoodIndicator();
    }
    
    // Apply the initial mood
    applyColorMood(currentMood);
    
    // Create a mood selector widget
    function createMoodSelector() {
        // Create the mood widget
        const moodWidget = document.createElement('div');
        moodWidget.className = 'mood-widget';
        moodWidget.style.position = 'fixed';
        moodWidget.style.bottom = '20px';
        moodWidget.style.right = '20px';
        moodWidget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        moodWidget.style.padding = '8px';
        moodWidget.style.borderRadius = '30px';
        moodWidget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        moodWidget.style.zIndex = '1000';
        moodWidget.style.display = 'flex';
        moodWidget.style.alignItems = 'center';
        moodWidget.style.cursor = 'pointer';
        moodWidget.style.transition = 'all 0.3s ease';
        
        // Create the indicator
        const indicator = document.createElement('div');
        indicator.className = 'mood-indicator';
        indicator.style.display = 'flex';
        indicator.style.alignItems = 'center';
        indicator.style.justifyContent = 'center';
        indicator.style.fontSize = '18px';
        indicator.style.marginRight = '8px';
        indicator.textContent = colorMoods[currentMood].icon;
        moodWidget.appendChild(indicator);
        
        // Create the label
        const label = document.createElement('div');
        label.className = 'mood-label';
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.color = colorMoods[currentMood].primary;
        label.textContent = `Mood: ${colorMoods[currentMood].description}`;
        moodWidget.appendChild(label);
        
        // Create the options menu (initially hidden)
        const optionsMenu = document.createElement('div');
        optionsMenu.className = 'mood-options';
        optionsMenu.style.position = 'absolute';
        optionsMenu.style.bottom = '100%';
        optionsMenu.style.right = '0';
        optionsMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        optionsMenu.style.borderRadius = '15px';
        optionsMenu.style.padding = '10px';
        optionsMenu.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        optionsMenu.style.display = 'none';
        optionsMenu.style.flexDirection = 'column';
        optionsMenu.style.gap = '8px';
        optionsMenu.style.width = '200px';
        optionsMenu.style.marginBottom = '10px';
        
        // Add options for each mood
        Object.keys(colorMoods).forEach(mood => {
            const option = document.createElement('div');
            option.className = 'mood-option';
            option.dataset.mood = mood;
            option.style.display = 'flex';
            option.style.alignItems = 'center';
            option.style.padding = '8px 12px';
            option.style.borderRadius = '10px';
            option.style.cursor = 'pointer';
            option.style.transition = 'background-color 0.2s ease';
            option.style.backgroundColor = mood === currentMood ? colorMoods[mood].background : 'transparent';
            
            // Hover effect
            option.addEventListener('mouseenter', () => {
                option.style.backgroundColor = colorMoods[mood].background;
            });
            
            option.addEventListener('mouseleave', () => {
                if (mood !== currentMood) {
                    option.style.backgroundColor = 'transparent';
                }
            });
            
            // Icon
            const icon = document.createElement('span');
            icon.style.marginRight = '8px';
            icon.style.fontSize = '18px';
            icon.textContent = colorMoods[mood].icon;
            option.appendChild(icon);
            
            // Text
            const text = document.createElement('span');
            text.textContent = colorMoods[mood].description;
            text.style.color = colorMoods[mood].primary;
            text.style.fontWeight = mood === currentMood ? 'bold' : 'normal';
            option.appendChild(text);
            
            // Click handler
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                applyColorMood(mood);
                optionsMenu.style.display = 'none';
                showMoodAnimation(mood);
            });
            
            optionsMenu.appendChild(option);
        });
        
        moodWidget.appendChild(optionsMenu);
        
        // Toggle menu on click
        moodWidget.addEventListener('click', () => {
            if (optionsMenu.style.display === 'none') {
                optionsMenu.style.display = 'flex';
            } else {
                optionsMenu.style.display = 'none';
            }
        });
        
        // Close menu when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!moodWidget.contains(e.target)) {
                optionsMenu.style.display = 'none';
            }
        });
        
        document.body.appendChild(moodWidget);
        
        // Function to update the mood indicator
        function updateMoodIndicator() {
            indicator.textContent = colorMoods[currentMood].icon;
            label.textContent = `Mood: ${colorMoods[currentMood].description}`;
            label.style.color = colorMoods[currentMood].primary;
            
            // Update selected option in menu
            const options = optionsMenu.querySelectorAll('.mood-option');
            options.forEach(option => {
                const moodType = option.dataset.mood;
                const textEl = option.querySelector('span:last-child');
                
                if (moodType === currentMood) {
                    option.style.backgroundColor = colorMoods[moodType].background;
                    textEl.style.fontWeight = 'bold';
                } else {
                    option.style.backgroundColor = 'transparent';
                    textEl.style.fontWeight = 'normal';
                }
            });
        }
    }
    
    // Create mood animation
    function showMoodAnimation(mood) {
        const colors = colorMoods[mood];
        
        // Create animation container
        const animContainer = document.createElement('div');
        animContainer.style.position = 'fixed';
        animContainer.style.top = '0';
        animContainer.style.left = '0';
        animContainer.style.width = '100%';
        animContainer.style.height = '100%';
        animContainer.style.backgroundColor = colors.background;
        animContainer.style.opacity = '0';
        animContainer.style.zIndex = '9000';
        animContainer.style.pointerEvents = 'none';
        animContainer.style.transition = 'opacity 0.5s ease';
        
        // Create mood icon
        const icon = document.createElement('div');
        icon.style.position = 'absolute';
        icon.style.top = '50%';
        icon.style.left = '50%';
        icon.style.transform = 'translate(-50%, -50%) scale(0)';
        icon.style.fontSize = '120px';
        icon.style.transition = 'transform 0.5s ease';
        icon.textContent = colors.icon;
        
        // Create label
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.bottom = '40%';
        label.style.left = '0';
        label.style.width = '100%';
        label.style.textAlign = 'center';
        label.style.fontSize = '24px';
        label.style.fontWeight = 'bold';
        label.style.color = colors.primary;
        label.style.opacity = '0';
        label.style.transform = 'translateY(20px)';
        label.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        label.textContent = colors.description + ' Mode';
        
        animContainer.appendChild(icon);
        animContainer.appendChild(label);
        document.body.appendChild(animContainer);
        
        // Animation sequence
        setTimeout(() => {
            animContainer.style.opacity = '0.95';
        }, 0);
        
        setTimeout(() => {
            icon.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
        
        setTimeout(() => {
            label.style.opacity = '1';
            label.style.transform = 'translateY(0)';
        }, 600);
        
        setTimeout(() => {
            animContainer.style.opacity = '0';
        }, 2000);
        
        setTimeout(() => {
            document.body.removeChild(animContainer);
        }, 2500);
        
        // Play a sound based on mood
        playMoodSound(mood);
    }
    
    // Play a sound when mood changes
    function playMoodSound(mood) {
        const audioMap = {
            calm: 'https://freesound.org/data/previews/416/416079_7882947-lq.mp3',       // Water sound
            energetic: 'https://freesound.org/data/previews/256/256113_3263906-lq.mp3',  // Energetic sound
            creative: 'https://freesound.org/data/previews/263/263133_4284968-lq.mp3',   // Creative sound
            professional: 'https://freesound.org/data/previews/416/416710_5121236-lq.mp3', // Professional sound
            friendly: 'https://freesound.org/data/previews/35/35730_182358-lq.mp3'       // Friendly sound
        };
        
        if (audioMap[mood]) {
            const audio = new Audio(audioMap[mood]);
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    // Create interactive events that change the mood based on user behavior
    function setupMoodChangeEvents() {
        // Track user actions
        let clickCount = 0;
        let scrollDistance = 0;
        let pageVisits = new Set();
        let lastMoodChange = Date.now();
        const COOLDOWN = 30000; // 30 seconds cooldown between automatic mood changes
        
        // Listen for fast clicking (energetic)
        document.addEventListener('click', () => {
            clickCount++;
            
            // If user clicks frequently in a short time, switch to energetic
            if (clickCount > 5 && Date.now() - lastMoodChange > COOLDOWN) {
                applyColorMood('energetic');
                showNotification('Your quick clicks have activated Energetic mode!', 'info');
                lastMoodChange = Date.now();
                clickCount = 0;
            }
            
            // Reset click counter after a delay
            setTimeout(() => {
                clickCount = Math.max(0, clickCount - 1);
            }, 2000);
        });
        
        // Listen for deep scrolling (professional)
        document.querySelectorAll('.page').forEach(page => {
            page.addEventListener('scroll', () => {
                scrollDistance += 10;
                
                // If user scrolls a lot, switch to professional
                if (scrollDistance > 2000 && Date.now() - lastMoodChange > COOLDOWN) {
                    applyColorMood('professional');
                    showNotification('Your deep reading has activated Professional mode!', 'info');
                    lastMoodChange = Date.now();
                    scrollDistance = 0;
                }
            });
        });
        
        // Listen for page navigation (creative)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetPage = item.getAttribute('data-page');
                
                if (targetPage) {
                    pageVisits.add(targetPage);
                    
                    // If user visits many different pages, switch to creative
                    if (pageVisits.size > 3 && Date.now() - lastMoodChange > COOLDOWN) {
                        applyColorMood('creative');
                        showNotification('Your explorative browsing has activated Creative mode!', 'info');
                        lastMoodChange = Date.now();
                        pageVisits = new Set();
                    }
                }
            });
        });
        
        // Contact form interaction (friendly)
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const formFields = contactForm.querySelectorAll('input, textarea');
            let formInteractions = 0;
            
            formFields.forEach(field => {
                field.addEventListener('input', () => {
                    formInteractions++;
                    
                    // If user is filling out contact form, switch to friendly
                    if (formInteractions > 10 && Date.now() - lastMoodChange > COOLDOWN) {
                        applyColorMood('friendly');
                        showNotification('Your message writing has activated Friendly mode!', 'info');
                        lastMoodChange = Date.now();
                        formInteractions = 0;
                    }
                });
            });
        }
    }
    
    // Create and set up the CSS variables for our color system
    function setupColorSystem() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-color: ${colorMoods.calm.primary};
                --secondary-color: ${colorMoods.calm.secondary};
                --accent-color: ${colorMoods.calm.accent};
                --background-color: ${colorMoods.calm.background};
                --text-color: ${colorMoods.calm.text};
            }
            
            body, .page {
                background-color: var(--background-color);
                color: var(--text-color);
                transition: background-color 0.5s ease, color 0.5s ease;
            }
            
            .nav-item {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                transition: all 0.3s ease;
            }
            
            .nav-item:hover {
                background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: var(--secondary-color);
                transition: color 0.3s ease;
            }
            
            a {
                color: var(--primary-color);
                transition: color 0.3s ease;
            }
            
            a:hover {
                color: var(--accent-color);
            }
            
            button, .button {
                background-color: var(--primary-color);
                color: white;
                transition: background-color 0.3s ease;
            }
            
            button:hover, .button:hover {
                background-color: var(--secondary-color);
            }
            
            input, textarea {
                border-color: var(--primary-color);
                transition: border-color 0.3s ease;
            }
            
            input:focus, textarea:focus {
                border-color: var(--accent-color);
            }
            
            .notification {
                background-color: var(--primary-color);
                transition: background-color 0.3s ease;
            }
            
            @keyframes moodTransition {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Initialize everything
    setupColorSystem();
    createMoodSelector();
    setupMoodChangeEvents();
    
    // Initially show the current mood
    setTimeout(() => {
        showMoodAnimation(currentMood);
    }, 1000);
}