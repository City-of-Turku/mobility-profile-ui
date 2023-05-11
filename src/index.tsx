import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import { store as reduxStore } from './redux/store';

const rootNode = document.getElementById('root');
const store = reduxStore();

if (rootNode) {
  createRoot(rootNode).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
