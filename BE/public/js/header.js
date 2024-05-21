document.addEventListener('DOMContentLoaded', function () {
  const avatarButton = document.getElementById('avatarButton');
  const dropdownMenu = document.getElementById('dropdownMenu');

  avatarButton.addEventListener('click', function () {
    dropdownMenu.classList.toggle('hidden');
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', function (event) {
    if (
      !avatarButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add('hidden');
    }
  });

  // Async function to fetch and update the avatar
  async function fetchAndUpdateAvatar() {
    const accessToken = localStorage.getItem('accessToken');

    const query = `
      query AdminGetProfile {
        adminGetProfile {
          id
          firstName
          lastName
          email
          birthDate
          phoneNumber
          gender
          avatar
          status
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (!result.errors) {
        const img = result.data.adminGetProfile.avatar;
        document.getElementById('avatar').src = img;
        document.getElementById('name').innerHTML =
          result.data.adminGetProfile.firstName +
          ' ' +
          result.data.adminGetProfile.lastName;
      } else {
        console.error('Error fetching profile:', result.errors);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  fetchAndUpdateAvatar();
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expired_accessToken');
  window.location.href = '/';
});
