// register a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // register a service worker
      .then((reg) => console.log('Service Worker: Registered')) // Registration was successful
      .catch((err) => console.log(`Service Worker: ${err}`)); // Registration error
  });
}

const body = document.querySelector('body')
const toggleBtn = document.querySelector('#schemeBtn')
const useLink = document.querySelector('#schemeBtn use')
// toggle button event listener
toggleBtn.addEventListener('click', () => {
    // check the user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem('mode') == 'dark' ) {
        body.classList.remove('scheme-dark')
        body.classList.add('scheme-light')
        useLink.setAttribute("xlink:href", "/images/defs.svg#dark")
        localStorage.setItem('mode', 'light')
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches || localStorage.getItem('mode') == 'light') {
        body.classList.remove('scheme-light')
        body.classList.add('scheme-dark')
        useLink.setAttribute("xlink:href", "/images/defs.svg#light")
        localStorage.setItem('mode', 'dark')
    } 
})