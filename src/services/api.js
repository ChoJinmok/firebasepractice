import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase';

const API_KEY = process.env.REACT_APP_API_KEY;

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

  return data.refreshToken;
}

export async function postAuthProvider(name) {
  const provider = {
    google() { return new GoogleAuthProvider(); },
    github() { return new GithubAuthProvider(); },
  }[name]();

  const result = await signInWithPopup(auth, provider);

  console.log(result.user);

  return result.user.stsTokenManager.refreshToken;
}
