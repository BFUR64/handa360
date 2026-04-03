// @ts-check

// TODO WTF Does this thing do? It needs a listener + proper theme via browser preferences.
function toggleTheme() {
        const mode = /** @type {HTMLImageElement} */ (document.getElementById('theme-toggle'));
        document.body.classList.toggle('dark');
        if(mode.src.match('light-assets/images/light-mode.png.png')){
            mode.src = ('assets/images/dark-mode.png');
        }else{mode.src = ('assets/images/light-mode.png');}
}