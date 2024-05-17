document.addEventListener('DOMContentLoaded', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  let expired_accessToken = parseInt(
    localStorage.getItem('expired_accessToken'),
  );
  let expired_refreshToken = parseInt(
    localStorage.getItem('expired_refreshToken'),
  );

  const currentTimestamp = new Date().getTime();

  if (window.location.pathname === '/') {
    if (accessToken) {
      if (expired_accessToken > currentTimestamp) {
        // if admin access "/" accessToken is not expired => href '/category-product'
        return (window.location.href = '/category-product');
      } else {
        if (refreshToken) {
          if (expired_refreshToken > currentTimestamp) {
            await refreshAccessToken();
            return (window.location.href = '/category-product');
          }
        }
      }
    }
  } else {
    if (accessToken) {
      if (expired_accessToken > currentTimestamp) {
        // if admin access "/" accessToken is not expired => href '/category-product'
        return;
      } else {
        if (refreshToken) {
          if (expired_refreshToken > currentTimestamp) {
            return await refreshAccessToken();
          } else {
            return (window.location.href = '/');
          }
        }
      }
    }
  }

  async function refreshAccessToken() {
    const query = `
        mutation RefreshAccessToken {
          refreshAccessToken {
            accessToken
            expired_accessToken
          }
        }
      `;

    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.log(result.errors[0].message);
      window.location.href = '/';
    } else {
      const {
        accessToken: newAccessToken,
        expired_accessToken: newExpiredAccessToken,
      } = result.data.refreshAccessToken;

      // Update tokens in localStorage
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('expired_accessToken', newExpiredAccessToken);

      // Update local variables
      expired_accessToken = newExpiredAccessToken;
    }
  }
});
