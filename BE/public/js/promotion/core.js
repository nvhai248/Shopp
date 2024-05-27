let items = [];
let banner;

function checkPromotionLevel() {
  var promotionLevel = document.getElementById('promotion-level').value;
  var addButton = document.getElementById('add-new-item-button');

  if (promotionLevel === 'ORDER') {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}

// Call the function on page load to set the initial state of the button
document.addEventListener('DOMContentLoaded', function () {
  checkPromotionLevel();
});

async function returnAllProduct() {
  const query = `
          query Products {
            products(searchConditionInput: {
              limit: 1000,
              page: 1
            }) {
              data {
                id
                name
                avatar
              }
            }
          }
        `;

  try {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (!result.errors) {
      return result.data.products.data;
    } else {
      console.error(result.errors);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function showModalAddPromotionItem() {
  const modal = document.getElementById('modal');
  const products = await returnAllProduct();
  document.getElementById('modal-title').innerHTML = 'Add Promotion Item';
  document.getElementById('modal-content').innerHTML = `
      <label for="product-select">Select Product:</label>
      <select id="product-select" class="w-full mt-2 mb-2"></select>
      <img id='product-add-image-preview' class='w-[200px] rounded-md my-4' />
  
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" class="w-full h-[40px] border-2 mt-2 mb-2" />
      <span id="quantity-error" class="text-red-600"></span>`;

  document.getElementById('modal-action').innerHTML = `
      <button
        id="add-item-button"
        onclick="confirmAddItem()"
        class="px-6 py-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
        disabled
      >
        Add
      </button>`;

  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = products
    .map(
      (product) => `
          <option value="${product.id}" data-avatar="${product.avatar}" data-name="${product.name}">
            ${product.name}
          </option>`,
    )
    .join('');

  function validateSalePrice() {
    const salePrice = parseFloat(document.getElementById('quantity').value);
    const addButton = document.getElementById('add-item-button');

    if (isNaN(salePrice) || salePrice <= 0) {
      document.getElementById('quantity-error').innerText =
        'Quantity must be greater than 0.';
      addButton.disabled = true;
    } else {
      document.getElementById('quantity-error').innerText = '';
      addButton.disabled = false;
    }
  }

  document.getElementById('quantity').addEventListener('input', function (e) {
    // This will replace any non-numeric characters with an empty string
    this.value = this.value.replace(/[^0-9.]/g, '');
    validateSalePrice();
  });

  productSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const avatar = selectedOption.getAttribute('data-avatar');
    document.getElementById('product-add-image-preview').src = avatar;
    validateSalePrice(); // Re-validate when product changes
  });

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');

  // Trigger the change event to set the initial price
  const changeEvent = new Event('change');
  productSelect.dispatchEvent(changeEvent);
}

function confirmAddItem() {
  const productSelect = document.getElementById('product-select');
  const selectedOption = productSelect.selectedOptions[0];
  const productId = selectedOption.value;
  const productName = selectedOption.getAttribute('data-name');
  const productAvatar = selectedOption.getAttribute('data-avatar');
  const quantity = document.getElementById('quantity').value;

  if (
    !productId ||
    !productName ||
    !productAvatar ||
    !quantity ||
    quantity <= 0
  ) {
    alert('Please select a valid product and quantity.');
    return;
  }

  const containerItem = document.getElementById('container-item');
  const newItem = document.createElement('tr');
  newItem.classList.add('h-[10rem]');
  newItem.innerHTML = `
      <td class='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
        <div class='flex items-center'>
          <div class='flex-shrink-0 w-[7rem] h-auto'>
            <img src='${productAvatar}' alt='${productName}' />
          </div>
          <div class='ml-4'>
            <div class='text-sm font-medium leading-5 text-gray-900'>
              ${productName}
            </div>
            <div class='text-sm leading-5 text-gray-500'>
              ${productId}
            </div>
          </div>
        </div>
      </td>
      <td class='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
        <div class='text-sm leading-5 text-gray-900'>
          ${quantity}
        </div>
      </td>`;

  items.push({
    id: productId,
    quantity: quantity,
  });

  containerItem.appendChild(newItem);

  // Close the modal
  const modal = document.getElementById('modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
}
