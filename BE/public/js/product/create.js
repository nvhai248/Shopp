// JavaScript to handle image preview
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
  }
}

// JavaScript to handle thumbnail previews and removal
function previewThumbnails(event) {
  const input = event.target;
  const thumbnailsContainer = document.getElementById('thumbnails-container');
  const files = input.files;

  for (const file of files) {
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
        updateInputFiles(input, thumbnailImage.src); // Xóa hình ảnh khỏi danh sách khi người dùng loại bỏ nó
      };

      thumbnailDiv.appendChild(thumbnailImage);
      thumbnailDiv.appendChild(removeButton);
      thumbnailsContainer.appendChild(thumbnailDiv);
    };

    reader.readAsDataURL(file);
  }
}

// Hàm này cập nhật tệp đính kèm trong trường input
function updateInputFiles(input, removedSrc) {
  const newFiles = Array.from(input.files).filter(
    (file) => file.src !== removedSrc,
  );
  const newInput = new DataTransfer();
  newFiles.forEach((file) => newInput.items.add(file));
  input.files = newInput.files;
}
