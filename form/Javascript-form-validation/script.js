/* 
 * DEPENDENCES: validate.js (https://rickharrison.github.io/validate.js/validate.js)
 */
const contactForm = document.querySelector('form');

const errorBox = document.createElement('div');
const errorList = document.createElement('ul');

// initialize contact form
window.addEventListener('load', () => {
  contactForm.noValidate = true;
  errorBox.classList.add('errorbox');
  errorBox.appendChild(errorList);
  contactForm.parentElement.insertBefore(errorBox, contactForm);
});

// バリデートを設定、実行
let validator = new FormValidator(contactForm, [
  {
    name: 'name',
    display: 'Name',
    rules: 'required'
  },
  {
    name: 'email',
    display: 'Email',
    rules: 'required|valid_email',
  },
  {
    name: 'message',
    display: 'Message',
    rules: 'required'
  }
], (errors, event) => {
  // errorList initialize
  while (errorList.firstChild) {
    errorList.firstChild.remove();
  }
  // visibility errorBox
  errorBox.style.display = 'block';

  errors.forEach(error => {
    const errorItem = document.createElement('li');

    error.element.classList.add('invalid');

    errorItem.textContent = error.message;
    errorList.appendChild(errorItem);
  });
});
