// register a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // register a service worker
      .then((reg) => console.log('Service Worker: Registered')) // Registration was successful
      .catch((err) => console.log(`Service Worker: ${err}`)); // Registration error
  });
}
// mobile menu toggle
const menuBtn = document.querySelector('#menuBtn');
const menuSvg = document.querySelector('#menuSvg use');
const mobileNav = document.querySelector('#navlinks');
const mobileLinks = document.querySelectorAll('#navlinks a');
// toggle event function
const toggle = () => {
  if (mobileNav.getAttribute('aria-expanded') === 'false') {
    mobileNav.classList.replace('closed', 'open');
    mobileNav.setAttribute('aria-expanded', 'true');
    // change menu icon
    menuSvg.setAttribute('xlink:href', '/images/defs.svg#times');
    menuSvg.setAttribute('viewBox', '0 0 352 512');
  } else if (mobileNav.getAttribute('aria-expanded') === 'true') {
    mobileNav.classList.replace('open', 'closed');
    mobileNav.setAttribute('aria-expanded', 'false');
    // change menu icon
    menuSvg.setAttribute('xlink:href', '/images/defs.svg#bars');
    menuSvg.setAttribute('viewBox', '0 0 448 512');
  }
};
// open full curtain navigation menu
menuBtn.addEventListener('click', toggle);
// close menu when user clicks a link
mobileLinks.forEach((link) => {
  link.addEventListener('click', toggle);
});

