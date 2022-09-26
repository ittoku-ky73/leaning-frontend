const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'YOUR-NYTIMES-API-KEY';

const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

nav.style.display = 'none';

let pageNumber = 0;

function fetchNYTimes() {
  // url => https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=YOUR-API-KEY&page=0&q=cats&fq=document_type:("article")&begin_date=20170301&end_date=20170312
  let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

  if (startDate.value !== '') {
    url += '&begin_date=' + startDate.value;
  }
  if (endDate.value !== '') {
    url += '&begin_date=' + startDate.value;
  }

  fetch(url)
    .then(res => res.json())
    .then(json => displayNYTimes(json))
    .catch(err => console.error(`fetch probrem: ${err}`));
}

function displayNYTimes(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  const articles = json.response.docs;

  if (articles.length === 10) {
    nav.style.display = 'block';
  }
  else {
    nav.style.display = 'none';
  }

  if (articles.length === 0) {
    const mypara = document.createElement('p');
    mypara.textContent = 'No results returned';
    section.appendChild(mypara);
  }
  else {
    articles.forEach(article => {
      const myarticle = document.createElement('article');
      const myheading = document.createElement('h2');
      const mylink = document.createElement('a');
      const myimg = document.createElement('img');
      const mypara1 = document.createElement('p');
      const mypara2 = document.createElement('p');
      const clearfix = document.createElement('div');

      mylink.href = article.web_url;
      mylink.textContent = article.headline.main;
      mypara1.textContent = article.snippet;
      mypara2.textContent = 'Keywords:';
      article.keywords.map(keyword => {
        const myspan = document.createElement('span');
        myspan.textContent += keyword.value + ' ';
        mypara2.appendChild(myspan);
      });
      article.multimedia.map(multimedia => {
        myimg.src = 'https://www.nytimes.com/' + multimedia.url;
        myimg.alt = article.headline.main;
      });
      clearfix.setAttribute('class', 'clearfix');

      myarticle.appendChild(myheading);
      myheading.appendChild(mylink);
      myarticle.appendChild(myimg);
      myarticle.appendChild(mypara1);
      myarticle.appendChild(mypara2);
      myarticle.appendChild(clearfix);
      section.appendChild(myarticle);
    })
  }
}

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  pageNumber = 0;
  fetchNYTimes();
});

nextBtn.addEventListener('click', function (e) {
  e.preventDefault();
  pageNumber++;
  fetchNYTimes();
});

previousBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (pageNumber > 0) {
    pageNumber--;
  } else {
    return;
  }
  fetchNYTimes();
});
