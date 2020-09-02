// set the observer options
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

// create observer
const observer = new IntersectionObserver( entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // add an observed class to the section
      entry.target.classList.add('observed'); 
      // check the section's id
      document.querySelectorAll('aside a').forEach( link => {
        if(link.hash === `#${entry.target.id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
  });
}, options);
// Observe all sections that have an `id` applied
document.querySelectorAll('h2[id]').forEach(section => {
  observer.observe(section);
});