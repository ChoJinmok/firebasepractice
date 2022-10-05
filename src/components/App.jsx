import { useEffect } from 'react';

import Router from './Router';

import { useGlobalState } from '../GlobalStateProvider';

import { setAccessToken } from '../action';

import { loadItem } from '../services/storage';

export default function App() {
  const { state: { accessToken }, dispatch } = useGlobalState();

  useEffect(() => {
    const storageAccessToken = loadItem('accessToken');

    if (storageAccessToken) {
      dispatch(setAccessToken(storageAccessToken));
    }
  }, [loadItem, dispatch]);

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
