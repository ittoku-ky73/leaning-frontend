const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
/* Declaring the alternative text for each image file */
const images = [
  {
    src: 'images/pic1.jpg',
    alt: 'child eye',
  },
  {
    src: 'images/pic2.jpg',
    alt: 'desert',
  },
  {
    src: 'images/pic3.jpg',
    alt: 'hydrangea',
  },
  {
    src: 'images/pic4.jpg',
    alt: 'egypt',
  },
  {
    src: 'images/pic5.jpg',
    alt: 'butterfly',
  },
];

/* Looping through images */
images.forEach(image => {
  const newImage = new Image();
  newImage.src = image.src;
  newImage.alt = image.alt;
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', image.src);
  });
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  if (overlay.classList.contains('dark')) {
    btn.textContent = 'Lighten';
    overlay.classList.replace('dark', 'light');
  }
  else if (overlay.classList.contains('light')) {
    btn.textContent = 'Darken';
    overlay.classList.replace('light', 'dark');
  }
});
