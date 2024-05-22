let avatar;
let thumbnails = [];

function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    imagePreview.src = reader.result;

    previewContainer.classList.remove('hidden');
  };

  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);

    avatar = input.files[0];
  }
}

// JavaScript to handle thumbnail previews and removal
function previewThumbnails(event) {
  const input = event.target;
  const thumbnailsContainer = document.getElementById('thumbnails-container');
  const files = input.files;

  for (const file of files) {
    thumbnails.push(file);

    const reader = new FileReader();

    reader.onload = function (e) {
      const thumbnailDiv = document.createElement('div');
      thumbnailDiv.classList.add('relative');

      const thumbnailImage = document.createElement('img');
      thumbnailImage.src = e.target.result;
      thumbnailImage.classList.add(
        'w-24',
        'h-24',
        'object-cover',
        'rounded-md',
      );

      const removeButton = document.createElement('button');
      removeButton.classList.add(
        'absolute',
        'top-0',
        'right-0',
        'bg-red-500',
        'text-white',
        'rounded-full',
        'w-6',
        'h-6',
        'flex',
        'items-center',
        'justify-center',
      );
      removeButton.innerHTML = '&times;';
      removeButton.onclick = () => {
        thumbnailDiv.remove();
        updateInputFiles(input, file.name);
        thumbnails = thumbnails.filter(
          (thumbnail) => thumbnail.name !== file.name,
        );
      };

      thumbnailDiv.appendChild(thumbnailImage);
      thumbnailDiv.appendChild(removeButton);
      thumbnailsContainer.appendChild(thumbnailDiv);
    };

    reader.readAsDataURL(file);
  }
}

function updateInputFiles(input, removedFileName) {
  const dt = new DataTransfer();
  for (const file of input.files) {
    if (file.name !== removedFileName) {
      dt.items.add(file);
    }
  }
  input.files = dt.files;
}

let authors = [];

function addAuthors() {
  const input = document.getElementById('product-authors').value;
  if (input.trim() !== '') {
    const container = document.getElementById('authors-container');

    const authorDiv = document.createElement('div');
    authorDiv.className =
      'flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2 mr-2';

    const authorName = document.createElement('span');
    authorName.className = 'text-gray-700';
    authorName.textContent = input;

    authors.push(input);

    const deleteButton = document.createElement('button');
    deleteButton.className =
      'bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 ml-2';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      authorDiv.remove();
      authors = authors.filter((author) => author !== input);
    };

    authorDiv.appendChild(authorName);
    authorDiv.appendChild(deleteButton);
    container.appendChild(authorDiv);

    document.getElementById('product-authors').value = '';
  }
}

document
  .getElementById('product-authors')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addAuthors();
    }
  });

async function submitCreateProduct() {
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const categoryId = document.getElementById('product-category').value;
  const publisherId = document.getElementById('product-publisher').value;

  const urlAvatar = await uploadFile(avatar);
  let imageUrls = [];

  for (let i = 0; i < thumbnails.length; i++) {
    imageUrls.push(await uploadFile(thumbnails[i]));
  }

  const query = `
  mutation CreateProduct {
      createProduct(
          createProductInput: {
              name: "${name}"
              description: "${description}"
              categoryId: "${categoryId}"
              publisherId: "${publisherId}"
              price: ${price}
              avatar: "${urlAvatar}"
              author: ${JSON.stringify(authors)}
              images: ${JSON.stringify(imageUrls)}
          }
      ) {
          id
      }
    }
  `;

  const response = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  if (result.errors) {
    console.log(result.errors);

    showNotification(
      `Can not create new Publisher: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully created Product!');
    window.location.href = '/category-product';
  }
}
