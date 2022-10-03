import { StrictMode } from 'react';

import ReactDom from 'react-dom/client';

import App from './App';

import firebase from './firebase';

console.log(firebase);

ReactDom.createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
