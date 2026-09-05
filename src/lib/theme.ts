/** Storage key for the visitor's explicit theme choice. */
export const THEME_KEY = 'ovrin-theme';

/**
 * Runs before first paint so a dark-mode visitor does not get a light flash on
 * a statically exported page. It must stay in step with ThemeToggle, which
 * applies the same class and colorScheme after hydration.
 */
export const themeInitScript = `(function(){try{
var stored=localStorage.getItem(${JSON.stringify(THEME_KEY)});
var dark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
var el=document.documentElement;
el.classList.toggle('dark',dark);
el.style.colorScheme=dark?'dark':'light';
}catch(e){}})();`;
