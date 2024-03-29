import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/reset.css'
import './index.css';
import './fonts/fonts.css'
import App from './components/app/app';

import { Provider } from 'react-redux';
import { configureStore } from './store';
import { HashRouter } from 'react-router-dom';

const store = configureStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);