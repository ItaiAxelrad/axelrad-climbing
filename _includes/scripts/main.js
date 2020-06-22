// register a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator
      .serviceWorker
      .register('/sw.js') // register a service worker
      .then(reg => console.log('Service Worker: Registered')) // Registration was successful
      .catch(err => console.log(`Service Worker: ${err}`)); // Registration error
  });
};