import { StrictMode } from 'react';

import ReactDom from 'react-dom/client';

import GlobalStateProvider from './GlobalStateProvider';
import App from './components/App';

ReactDom.createRoot(document.getElementById('app')).render(
  <StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </StrictMode>,
);
