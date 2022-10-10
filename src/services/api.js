import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase';

const API_KEY = process.env.REACT_APP_API_KEY;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

export async function postRefreshToken(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`
  + `&grant_type=refresh_token&refresh_token=${refreshToken}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { id_token: idToken } = await response.json();

  return idToken;
}

export async function postEmailPassword({ email, password, newAccount }) {
  const url = newAccount
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

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

  const { idToken, refreshToken } = data;

  return { idToken, refreshToken };
}

export async function postAuthProvider(name) {
  const provider = {
    google() { return new GoogleAuthProvider(); },
    github() { return new GithubAuthProvider(); },
  }[name]();

  const {
    user: {
      stsTokenManager: { refreshToken },
    },
  } = await signInWithPopup(auth, provider);

  const idToken = await postRefreshToken(refreshToken);

  return { idToken, refreshToken };
}

export async function postNweet({ idToken, nweet }) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets.json?auth=${idToken}`;

  await fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${accessToken}`,
    // },
    body: JSON.stringify({
      nweet,
      createdAt: Date.now(),
    }),
  });
}

export async function loadNweets(idToken) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets.json?auth=${idToken}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
}
