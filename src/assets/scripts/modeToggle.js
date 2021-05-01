// dark / light mode toggle
const body = document.querySelector('body');
const toggleBtn = document.querySelector('#schemeBtn');
const useLink = document.querySelector('#schemeBtn use');
// set initial preferences
if (localStorage.getItem('mode') == null) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('scheme-dark');
    body.classList.remove('scheme-light');
    useLink.setAttribute('xlink:href', '/images/defs.svg#light');
    localStorage.setItem('mode', 'dark');
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList.add('scheme-light');
    body.classList.remove('scheme-dark');
    useLink.setAttribute('xlink:href', '/images/defs.svg#dark');
    localStorage.setItem('mode', 'light');
  }
} else {
  if (localStorage.getItem('mode') == 'dark') {
    body.classList.add('scheme-dark');
    body.classList.remove('scheme-light');
    useLink.setAttribute('xlink:href', '/images/defs.svg#light');
    localStorage.setItem('mode', 'dark');
  } else if (localStorage.getItem('mode') == 'light') {
    body.classList.add('scheme-light');
    body.classList.remove('scheme-dark');
    useLink.setAttribute('xlink:href', '/images/defs.svg#dark');
    localStorage.setItem('mode', 'light');
  }
}
// toggle light/dark mode
const toggleMode = async () => {
  // check the user's preferred color scheme
  if (localStorage.getItem('mode') == 'dark') {
    body.classList.remove('scheme-dark');
    body.classList.add('scheme-light');
    useLink.setAttribute('xlink:href', '/images/defs.svg#dark');
    localStorage.setItem('mode', 'light');
  } else if (localStorage.getItem('mode') == 'light') {
    body.classList.remove('scheme-light');
    body.classList.add('scheme-dark');
    useLink.setAttribute('xlink:href', '/images/defs.svg#light');
    localStorage.setItem('mode', 'dark');
  }
};
// toggle button event listener
toggleBtn.addEventListener('click', toggleMode);
