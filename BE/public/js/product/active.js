function activeProduct(id, name) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').innerHTML = 'active Product';
  document.getElementById('modal-content').innerHTML =
    `<p>Do you want to active Product: <span id="getId">${name}</span></p>`;
  document.getElementById('modal-action').innerHTML = `<button
                onclick="confirmActiveProduct('${id}')"
                class="px-6 py-3 font-medium tracking-wide text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none"
              >
                active
              </button>`;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
}

async function confirmActiveProduct(id) {
  const query = `
        mutation UpdateProduct {
            updateProduct(
                updateProductInput: {
                    id: "${id}"
                    status: "ACTIVE",
                }
            )
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
      `Can not active Product: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully active Product!');
    window.location.reload();
  }
}
