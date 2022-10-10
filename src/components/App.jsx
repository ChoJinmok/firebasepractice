import { useEffect } from 'react';

import Router from './Router';

import { useGlobalState } from '../GlobalStateProvider';

import { setIdToken, setInit } from '../action';

import { postRefreshToken } from '../services/api';
import { loadItem } from '../services/storage';

export default function App() {
  const { state: { idToken, init }, dispatch } = useGlobalState();

  useEffect(() => {
    const refreshToken = loadItem('refreshToken');

    (async () => {
      if (refreshToken) {
        const token = await postRefreshToken(refreshToken);

        dispatch(setIdToken(token));
      }

      dispatch(setInit(true));
    })();
  }, [loadItem, postRefreshToken, dispatch]);

  return (
    <>
      {init ? <Router idToken={idToken} /> : 'Initializing...'}
      <footer>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Nwitter
      </footer>
    </>
  );
}
