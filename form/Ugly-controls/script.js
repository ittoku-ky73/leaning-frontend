const fileContainer = document.querySelector('.file-picker');
const fileInput = document.querySelector('#file');
const fileList = document.createElement('ul');

fileContainer.appendChild(fileList);

fileInput.addEventListener('change', () => {
  // clean file list
  while (fileList.firstChild) {
    fileList.removeChild(fileList.firstChild);
  }

  // read selected files
  for (const file of fileInput.files) {
    const listItem = document.createElement('li');
    listItem.textContent = `${file.name}, ${returnFileSize(file.size)}`
    fileList.appendChild(listItem);
  }

  // return formatted file size text
  function returnFileSize(size) {
    if (size < 1024) {
      return size + 'bytes';
    } else if (size >= 1024 && size < 1048576) {
      return (size / 1024).toFixed(1) + 'KB';
    } else if (size >= 1048576) {
      return (size / 1048576).toFixed(1) + 'MB';
    }
  }
});
