import { useEffect } from 'react';

import Router from './Router';

import { useGlobalState } from '../GlobalStateProvider';

import { setAccessToken } from '../action';

import { postRefreshToken } from '../services/api';
import { loadItem } from '../services/storage';

export default function App() {
  const { state: { accessToken }, dispatch } = useGlobalState();

  useEffect(() => {
    const refreshToken = loadItem('refreshToken');

    if (refreshToken) {
      postRefreshToken(refreshToken)
        .then((res) => dispatch(setAccessToken(res)));
    }
  }, [loadItem, postRefreshToken, dispatch]);

  return (
    <>
      <Router accessToken={accessToken} />
      <footer>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Nwitter
      </footer>
    </>
  );
}
