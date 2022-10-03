const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('button');

let db;

window.addEventListener('load', () => {
  const request = window.indexedDB.open('memo_db', 1);

  // Database initialize event
  request.addEventListener('error', () => console.error('Database failed to open'));
  request.addEventListener('success', requestSuccess);
  request.addEventListener('upgradeneeded', requestUpgradeNeeded);
  // Database add event
  form.addEventListener('submit', addItem);
});

// Database request success
function requestSuccess(e) {
  db = e.target.result;

  displayData();
}

// Database needed upgrade
function requestUpgradeNeeded(e) {
  db = e.target.result;
  let objectStore = db.createObjectStore('memo_os', { keyPath: 'id', autoIncrement: true });

  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('body', 'body', { unique: false });
}

// Database add action
function addItem(e) {
  e.preventDefault();

  const transaction = db.transaction(['memo_os'], 'readwrite');
  const objectStore = transaction.objectStore('memo_os');

  const newItem = { title: titleInput.value, body: bodyInput.value };
  const request = objectStore.add(newItem);

  request.addEventListener('success', () => {
    titleInput.value = '';
    bodyInput.value = '';
    titleInput.focus();
  });
  transaction.addEventListener('complete', displayData);
}

// Database delete action
function deleteItem(e) {
  const transaction = db.transaction(['memo_os'], 'readwrite');
  const objectStore = transaction.objectStore('memo_os');

  const parent = e.target.parentNode;
  const memoId = Number(parent.getAttribute('data-memo-id'));
  const request = objectStore.delete(memoId);

  request.addEventListener('success', () => {
    titleInput.focus();
  });
  transaction.addEventListener('complete', () => {
    parent.remove();

    if (!list.firstChild) {
      list.appendChild(noMemoStore());
    }
  });
}

// display memo to HTML
function displayData() {
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }

  const transaction = db.transaction(['memo_os'], 'readwrite');
  const objectStore = transaction.objectStore('memo_os');
  const openCursor = objectStore.openCursor();

  openCursor.addEventListener('success', (e) => {
    const cursor = e.target.result;

    if (cursor) {
      const myitem = document.createElement('li');
      const myh3 = document.createElement('h3');
      const mypara = document.createElement('p');
      const mybtn = document.createElement('button');

      myitem.setAttribute('data-memo-id', cursor.value.id);
      myh3.textContent = cursor.value.title;
      mypara.textContent = cursor.value.body;
      mybtn.textContent = 'Delete';
      mybtn.addEventListener('click', deleteItem);

      myitem.appendChild(myh3);
      myitem.appendChild(mypara);
      myitem.appendChild(mybtn);
      list.appendChild(myitem);

      cursor.continue();
    }
    else {
      if (!list.firstChild) {
        list.appendChild(noMemoStore());
      }
    }
  });
}

// create li element
function noMemoStore() {
  const myitem = document.createElement('li');
  myitem.textContent = 'No memo stored';
  return myitem;
}
