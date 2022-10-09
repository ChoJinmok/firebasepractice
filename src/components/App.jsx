import { useEffect } from 'react';

import Router from './Router';

import { useGlobalState } from '../GlobalStateProvider';

import { setAccessToken, setInit } from '../action';

import { postRefreshToken } from '../services/api';
import { loadItem } from '../services/storage';

export default function App() {
  const { state: { accessToken, init }, dispatch } = useGlobalState();

  useEffect(() => {
    const refreshToken = loadItem('refreshToken');

    if (refreshToken) {
      postRefreshToken(refreshToken)
        .then((res) => dispatch(setAccessToken(res)))
        .then(() => dispatch(setInit(true)));
    }
  }, [loadItem, postRefreshToken, dispatch, setInit]);

  return (
    <>
      {init ? <Router accessToken={accessToken} /> : 'Initializing...'}
      <footer>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Nwitter
      </footer>
    </>
  );
}
