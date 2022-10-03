import { useState } from 'react';

import Router from './Router';

import { authService } from '../firebase';

export default function App() {
  const [isLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Nwitter
      </footer>
    </>
  );
}
