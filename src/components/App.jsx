import { useEffect } from 'react';

import Router from './Router';

import { useGlobalState } from '../GlobalStateProvider';

import {
  setRefreshToken,
  setAccountInfo,
  setInit,
} from '../action';

import {
  postRefreshToken,
  loadAccountInfo,
} from '../services/api';
import { loadItem } from '../services/storage';

export default function App() {
  const { state: { refreshToken, init }, dispatch } = useGlobalState();

  useEffect(() => {
    const cookieToken = loadItem('refreshToken');

    (async () => {
      if (cookieToken) {
        dispatch(setRefreshToken(cookieToken));

        const { idToken, uid } = await postRefreshToken(cookieToken);

        const { displayName, email } = await loadAccountInfo(idToken);

        dispatch(setAccountInfo({ uid, email, displayName }));
      }

      dispatch(setInit(true));
    })();
  }, [dispatch]);

  return (
    <>
      {init ? <Router refreshToken={refreshToken} /> : 'Initializing...'}
      {/* <footer>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Nwitter
      </footer> */}
    </>
  );
}
