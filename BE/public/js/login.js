document
  .getElementById('loginForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isRememberMe = document.getElementById('isRememberMe').checked;

    const query = `
      mutation Login {
        login(
          loginInput: { email: "${email}", password: "${password}", isRememberMe: ${isRememberMe} }
        ) {
          accessToken
          expired_accessToken
          refreshToken
          expired_refreshToken
        }
      }
    `;

    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      document.getElementById('loginNotification').innerHTML =
        errors[0].message;
    } else {
      const {
        accessToken,
        expired_accessToken,
        refreshToken,
        expired_refreshToken,
      } = result.data.login;

      await checkRole(
        accessToken,
        refreshToken,
        expired_accessToken,
        expired_refreshToken,
      );
    }
  });

const checkRole = async (
  accessToken,
  refreshToken,
  expired_accessToken,
  expired_refreshToken,
) => {
  const query = `
    query GetProfile {
      getProfile {
        id
        email
        birthDate
        role
        status
        phoneNumber
        gender
      }
    }
    `;

  const response = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  if (result.errors) {
    document.getElementById('loginNotification').innerHTML = errors[0].message;
  } else {
    const { role } = result.data.getProfile;

    if (role !== 'ADMIN')
      document.getElementById('loginNotification').innerHTML =
        'You are not Admin!';
    else {
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expired_accessToken', expired_accessToken);
      localStorage.setItem('expired_refreshToken', expired_refreshToken);

      window.location.href = '/category-product';
    }
  }
};
