document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.querySelector('.theme-selector select');

    // Initialize theme from localStorage or system preference
    const initializeTheme = () => {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                applyTheme(savedTheme);
                themeSelector.value = savedTheme;
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultTheme = prefersDark ? 'dark' : 'light';
                applyTheme(defaultTheme);
                themeSelector.value = defaultTheme;
            }
        } catch (error) {
            console.error('Error initializing theme:', error);
            // Fallback to light theme if there's an error
            applyTheme('light');
            themeSelector.value = 'light';
        }
    };

    // Listen for theme changes
    themeSelector.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        applyTheme(selectedTheme);
        try {
            localStorage.setItem('theme', selectedTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    });

    initializeTheme();
});

function applyTheme(theme) {
    try {
        // Remove any existing theme classes
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-black');

        // Add the selected theme class
        document.documentElement.classList.add(`theme-${theme}`);

        // Update meta-theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        // Set appropriate color based on theme
        const themeColors = {
            light: '#ffffff',
            dark: '#333333',
            black: '#000000'
        };
        metaThemeColor.content = themeColors[theme];
    } catch (error) {
        console.error('Error applying theme:', error);
        // Fallback to the light theme
        document.documentElement.classList.add('theme-light');
    }
}