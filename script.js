// Language switching functionality
// Debugging language switch
console.log('Initializing language switch...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    const langButtons = document.querySelectorAll('.language-selector button');
    const htmlElement = document.getElementById('main-html');
    
    if (!htmlElement) {
        console.error('Main HTML element not found');
        return;
    }

    console.log(`Found ${langButtons.length} language buttons`);
    
    // Load translations and update page
    async function loadLanguage(lang) {
        console.log(`Loading language: ${lang}`);
        try {
            const response = await fetch(`translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const translations = await response.json();
            console.log('Translations loaded:', translations);
            
            // Update all translatable elements
            const elements = document.querySelectorAll('[data-translate]');
            console.log(`Found ${elements.length} translatable elements`);
            
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.value = translations[key];
                    } else {
                        element.textContent = translations[key];
                    }
                    console.log(`Updated element with key: ${key}`);
                } else {
                    console.warn(`Translation missing for key: ${key}`);
                }
            });
            
            // Update HTML lang attribute
            htmlElement.setAttribute('lang', lang);
            console.log(`Updated HTML lang attribute to: ${lang}`);
            
            // Update active button state
            langButtons.forEach(button => {
                const isActive = button.dataset.lang === lang;
                button.classList.toggle('active', isActive);
                console.log(`Button ${button.dataset.lang} active: ${isActive}`);
            });
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
            console.log(`Saved language preference: ${lang}`);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Set initial language
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'de';
    console.log(`Setting initial language to: ${preferredLanguage}`);
    loadLanguage(preferredLanguage);

    // Add click handlers to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            console.log(`Language button clicked: ${lang}`);
            loadLanguage(lang);
        });
        
        console.log(`Added click handler for button: ${button.dataset.lang}`);
    });
    
    console.log('Language switch initialization complete');
});
