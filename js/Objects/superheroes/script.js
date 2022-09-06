const header = document.querySelector('header');
const section = document.querySelector('section');

let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

// XMLHttpRequest example
//
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.addEventListener('load', function () {
//   const superHeroes = request.response

//   populateHeader(superHeroes);
//   showHeroes(superHeroes);
// });

// fetch example
//
fetch(requestURL)
  .then(response => {
    return response.json();
  })
  .then(superHeroes => {
    populateHeader(superHeroes);
    showHeroes(superHeroes);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

function populateHeader(obj) {
  const h1 = document.createElement('h1');
  h1.textContent = obj['squadName'];
  header.appendChild(h1);

  const para = document.createElement('p');
  para.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
  header.appendChild(para);
}

function showHeroes(obj) {
  const heroes = obj['members'];

  heroes.forEach(hero => {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const ul = document.createElement('ul');

    h2.textContent = hero.name;
    para1.textContent = `Secret identity: ${hero.secretIdentity}`;
    para2.textContent = `Age: ${hero.age}`;
    para3.textContent = `Superpowers:`;

    const superPowers = hero.powers;
    superPowers.forEach(power => {
      const li = document.createElement('li');
      li.textContent = power;
      ul.appendChild(li);
    });

    article.appendChild(h2);
    article.appendChild(para1);
    article.appendChild(para2);
    article.appendChild(para3);
    article.appendChild(ul);

    section.appendChild(article);
  });
}
