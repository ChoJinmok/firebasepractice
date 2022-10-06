const API_KEY = process.env.REACT_APP_API_KEY;

const gitgubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export async function createUser({ email, password }) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function postLogin({ email, password }) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function loadGithubAccessToken(code) {
  const url = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token'
  + `?client_id=${gitgubClientId}&client_secret=${githubClientSecret}&code=${code}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description);
  }

  return data.access_Token;
}
