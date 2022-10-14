const toggleButton = document.querySelector('.toggle-button-container input');
const toggleLabel = document.querySelector('.toggle-button-container label');

toggleButton.checked = false;
toggleLabel.textContent = 'Off';

toggleButton.addEventListener('change', () => {
  toggleLabel.textContent = (toggleButton.checked) ? 'On' : 'Off';
});
