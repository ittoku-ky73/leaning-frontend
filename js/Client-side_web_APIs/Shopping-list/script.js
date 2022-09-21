const shoppingInput = document.querySelector('#item');
const shoppingBtn = document.querySelector('button');
const shoppingList = document.querySelector('ul');

shoppingBtn.addEventListener('click', function () {
  if (shoppingInput.value === '') {
    return;
  }

  let value = shoppingInput.value;

  const myli = document.createElement('li');
  const myspan = document.createElement('span');
  const mybtn = document.createElement('button');

  myspan.textContent = value;
  mybtn.textContent = 'DELETE';

  mybtn.addEventListener('click', function () {
    myli.remove();
  });

  myli.appendChild(myspan);
  myli.appendChild(mybtn);
  shoppingList.appendChild(myli);

  shoppingInput.value = '';
  shoppingInput.focus();
});
