const shippingCheckBox = document.querySelector('#shipping-checkbox');
const shippingName = document.querySelector('#shipping-name');
const shippingAddress = document.querySelector('#shipping-address');
const shippingPode = document.querySelector('#shipping-pcode');

function toggleReadOnly(bool) {
  shippingCheckBox.checked = bool;
  shippingName.readOnly = bool;
  shippingAddress.readOnly = bool;
  shippingPode.readOnly = bool;
}

// initialize
toggleReadOnly(true);

shippingCheckBox.addEventListener('change', () => {
  (shippingCheckBox.checked) ? toggleReadOnly(true) : toggleReadOnly(false)
});
