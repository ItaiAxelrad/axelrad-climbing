// clear list
const removeChildren = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

// fetch data from JSON file
const getData = async (path) => {
  // fetch the data
  const response = await fetch(path);
  const data = await response.json();
  return data;
};

// search input
const search_input = document.getElementById('search');
const results = document.getElementById('results');
const links = document.querySelectorAll('a')
let search_term = '';
let currentYear = '';
var posts = [];

// make a list item
const makeListItem = (post) => {
  let li = document.createElement('li');
  li.classList.add('list-item', 'h-card');
  tags = [];
  post.tags.forEach((tag) => {
    tags.push(
      `<a href="/tags/${tag
        .toLowerCase()
        .replace(' ', '-')}" class="tag p-category" rel="tag">${tag}</a>`
    );
  });

  li.innerHTML = `
        <time datetime="${post.htmlDateString}" class="dt-published">${
    post.date.monthDay
  }</time> 
        <img
              src="${post.url}/${post.thumbnail}?nf_resize=fit&w=128"
              width="64" height="64"
              alt="${post.title}"
              class="thumbnail"
              loading="lazy"
        />
        <strong><a href="${post.url}" class="p-name">${post.title}</a></strong>
        <div class="taglist">
          ${tags.join('')}
        </div>
  `;
  return li;
};

search_input.addEventListener('input', (e) => {
  // saving the input value
  search_term = e.target.value;
  // re-displaying specs based on the new search_term
  if (search_term.length > 1) {
    showResults(posts);
  } else {
    removeChildren(results);
    posts.forEach((post, i) => {
      let postYear = post.date.year;
      if (currentYear != postYear || i == 0) {
        currentYear = postYear;
        let listHeader = document.createElement('li');
        listHeader.innerHTML = `<h2 id="${postYear}" class="list-header">${postYear}</h2>`;
        results.appendChild(listHeader);
      }
      let li = makeListItem(post);
      results.appendChild(li);
    });
  }
});
// show search results
const showResults = async (posts) => {
  try {
    // clear the results
    removeChildren(results);
    // filter array
    posts
      .filter((post) => {
        if (
          post.title.toLowerCase().includes(search_term.toLowerCase()) ||
          post.tags.includes(search_term)
        ) {
          return post.title;
        };
        // return post.title
        //   ? post.title.toLowerCase().includes(search_term.toLowerCase())
        //   : null;
      })
      .forEach((post, i) => {
        let postYear = post.date.year;
        if (currentYear != postYear || i == 0) {
          currentYear = postYear;
          let listHeader = document.createElement('li');
          listHeader.innerHTML = `<h2 id="${postYear}" class="list-header">${postYear}</h2>`;
          results.appendChild(listHeader);
        }
        let li = makeListItem(post);
        results.appendChild(li);
      });
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  try {
    data = await getData('/data/posts.json');
    posts = data.reverse();
  } catch (error) {
    console.log(error);
  }
};

init();

// tags to search instead
links.forEach((link) => {
  if (link.classList.contains('tag')) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      search_input.value = event.target.textContent;
      search_input.dispatchEvent(new Event('input'));
    });
  }
});
