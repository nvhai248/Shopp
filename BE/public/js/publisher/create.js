let urlImage = '';

function openCreatePublisher() {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'Create new Publisher';
  document.getElementById('modal-content').innerHTML = `
  <form id="modal-form" class="w-[600px]">
  <div class="flex flex-row justify-between">
    <div>
    <div class="mb-4 relative">
    <label for="publisher-avatar" class="block text-gray-700">Avatar</label>
    <input
      type="file"
      id="publisher-avatar"
      name="avatar"
      accept="image/*"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    <div class="w-full bg-white border border-gray-300 rounded-md flex items-center justify-center py-2 px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span class="text-gray-500">Select File</span>
    </div>
  </div>

  <div id="preview-container" class="hidden">
    <img id="image-preview" class="w-full rounded-md mt-2" />
  </div>
    </div>

    <div class="ml-3 flex flex-col w-[350px]">
    <div class="mb-4">
    <label for="publisher-name" class="block text-gray-700">Name</label>
    <input
      type="text"
      id="publisher-name"
      name="name"
      class="w-full px-3 py-2 mt-1 border rounded-md"
    />
  </div>

  <div class="mb-4">
    <label for="publisher-description" class="block text-gray-700">Description</label>
    <textarea
      id="publisher-description"
      name="description"
      class="w-full px-3 py-2 mt-1 border rounded-md"
    ></textarea>
  </div>

  <div class="mb-4">
    <label for="publisher-address" class="block text-gray-700">Address</label>
    <input
      type="text"
      id="publisher-address"
      name="address"
      class="w-full px-3 py-2 mt-1 border rounded-md"
    />
  </div>

  <div class="mb-4">
    <label for="publisher-phoneNumber" class="block text-gray-700">Phone Number</label>
    <input
      type="text"
      id="publisher-phoneNumber"
      name="phoneNumber"
      class="w-full px-3 py-2 mt-1 border rounded-md"
    />
  </div>
    </div>
  </div>
 

  
</form>
`;
  document.getElementById('modal-action').innerHTML = `<button
    onclick="createNewPublisher()"
    class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
  >
    Create publisher
  </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');

  // Add event listener for file input
  document
    .getElementById('publisher-avatar')
    .addEventListener('change', function () {
      const file = this.files[0];
      const imagePreview = document.getElementById('image-preview');
      const previewContainer = document.getElementById('preview-container');

      if (file) {
        uploadFile(file);

        const reader = new FileReader();

        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          previewContainer.classList.remove('hidden');
        };

        reader.readAsDataURL(file);
      } else {
        imagePreview.src = '';
        previewContainer.classList.add('hidden');
      }
    });
}

async function uploadFile(file) {
  const url = 'http://localhost:8080/upload';

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'File upload failed');
    }

    const result = await response.json();

    urlImage = result.data.url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
}

async function createNewPublisher() {
  const name = document.getElementById('publisher-name').value;
  const description = document.getElementById('publisher-description').value;
  const address = document.getElementById('publisher-address').value;
  const phoneNumber = document.getElementById('publisher-phoneNumber').value;

  const query = `
  mutation CreatePublisher {
      createPublisher(
          createPublisherInput: {
              name: "${name}"
              description: "${description}"
              address: "${address}"
              phoneNumber: "${phoneNumber}"
              avatar: "${urlImage}"
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
    showNotification(
      'Can not create new Publisher, Some thing when wrong!',
      'fail',
    );
  } else {
    closeModal();
    window.location.reload();
  }
}
