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
const toggleBtn = document.querySelector('button')
// toggle button event listener
toggleBtn.addEventListener('click', () => {
    // check the user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.toggle('scheme-light')
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.toggle('scheme-dark')
    } else if (window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
        body.classList.toggle('scheme-dark')
    }
})