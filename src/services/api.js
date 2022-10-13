import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

import { v4 as uuidv4 } from 'uuid';

import {
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';

import { auth, storage } from '../firebase';

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

  const { id_token: idToken, user_id: uid } = await response.json();

  return { idToken, uid };
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

  const { refreshToken } = data;

  const { uid } = await postRefreshToken(refreshToken);

  return { uid, refreshToken };
}

export async function postAuthProvider(name) {
  const provider = {
    google() { return new GoogleAuthProvider(); },
    github() { return new GithubAuthProvider(); },
  }[name]();

  const {
    user: {
      uid,
      stsTokenManager: { refreshToken },
    },
  } = await signInWithPopup(auth, provider);

  return { uid, refreshToken };
}

export async function postNweet({
  idToken, creatorId, nweetContent, createdAt, attachmentUrl,
}) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets.json?auth=${idToken}`;

  const response = await fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${accessToken}`,
    // },
    body: JSON.stringify({
      creatorId,
      nweetContent,
      createdAt,
      attachmentUrl,
    }),
  });

  const { name: id } = await response.json();

  return id;
}

export async function uploadNweetImage({ uid, nweetImageAttachment }) {
  const attachmentRef = ref(storage, `${uid}/${uuidv4()}`);

  await uploadString(attachmentRef, nweetImageAttachment, 'data_url');

  const attachmentUrl = await getDownloadURL(attachmentRef);

  return attachmentUrl;
}

export async function loadNweets(idToken) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets.json?auth=${idToken}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
}

export function deleteNweet({ nweetId, idToken }) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets/${nweetId}.json?auth=${idToken}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'X-HTTP-Method-Override': 'DELETE',
    },
  });
}

export function editNweet({ nweetId, idToken, newNweet }) {
  const url = `https://${PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`
  + `/nweets/${nweetId}/.json?auth=${idToken}`;

  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({
      nweetContent: newNweet,
    }),
  });
}
