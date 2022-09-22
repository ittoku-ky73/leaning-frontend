// fetch API ver.
fetch('products.json')
  .then(response => response.json())
  .then(json => canStore(json))
  .catch(err => console.error(`Fetch probrem: ${err}`))

// // XHR ver.
// let request = new XMLHttpRequest();
// request.open('GET', 'products.json');
// request.responseType = 'json';
// request.addEventListener('load', function () {
//   request.status === 200
//     ? canStore(request.response)
//     : console.error(`XHR probrem: ${err}`);
// });
// request.send();

function canStore(products) {
  const button = document.querySelector('button');
  const main = document.querySelector('main');

  button.addEventListener('click', (e) => {
    // for form element
    e.preventDefault();

    const select = document.querySelector('#category');
    const input = document.querySelector('#searchTerm');

    let category = select.value;
    let searchTerm = input.value;

    switch (category) {
      case 'all':
      case 'vegetables':
      case 'meat':
      case 'soup':
        display(category, searchTerm);
        break;
      default:
        console.Error('unknown category');
        return -1;
    }
  });

  function display(category, searchTerm) {
    // remove all main child
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    let results = [];
    searchTerm = searchTerm.toLowerCase().trim();

    // filter products
    products.forEach(product => {
      let match = false;
      // category filter
      if (product['type'] === category && searchTerm === '') {
        match = true;
      }
      // searchTerm filter
      if (product['type'] === category || category === 'all') {
        if (product['name'].search(searchTerm) >= 0 && searchTerm !== '') {
          match = true;
        }
      }
      // no filter
      if (category === 'all' && searchTerm === '') {
        match = true;
      }
      if (match) {
        results.push(product);
      }
    });

    results.forEach(result => {
      const mysection = document.createElement('section');
      const myh2 = document.createElement('h2');
      const mypara = document.createElement('p');
      const myimage = document.createElement('img');

      let imageURL = 'images/' + result['image'];

      myh2.textContent = result['name'];
      mypara.textContent = result['price'];
      myimage.src = imageURL;

      mysection.appendChild(myh2);
      mysection.appendChild(mypara);
      mysection.appendChild(myimage);
      main.appendChild(mysection);
    });
  }

  // initialize
  display('all', '');
}
