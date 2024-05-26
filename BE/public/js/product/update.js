async function submitUpdateProduct() {
  const id = document.getElementById('idProduct').innerHTML;

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
    mutation UpdateProduct {
        updateProduct(
            updateProductInput: {
                id: "${id}"
                name: "${name}"
                description: "${description}"
                categoryId: "${categoryId}"
                publisherId: "${publisherId}"
                price: ${price}
                avatar: "${urlAvatar}"
                author: ${JSON.stringify(authors)}
                images: ${JSON.stringify(imageUrls)}
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
      `Can not update Publisher: ${result.errors[0].message}!`,
      'fail',
    );
  } else {
    closeModal();
    alert('Successfully update Product!');
    window.location.reload();
  }
}