
// This script must be loaded before any stylesheets
(function() {
    // Get the stored theme or use system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.classList.add(`theme-${storedTheme}`);
    } else {
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (window.matchMedia('(prefers-contrast: more)').matches) {
                document.documentElement.classList.add('theme-black');
            } else {
                document.documentElement.classList.add('theme-dark');
            }
        } else {
            document.documentElement.classList.add('theme-light');
        }
    }
})();