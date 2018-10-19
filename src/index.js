import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import reducers from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState } from './helpers/localStorage';

export const store = createStore(
  reducers,
  loadState(),
  applyMiddleware(thunk),
);

store.subscribe(() => {
  if (store.getState().isAuthenticated) {
    saveState(store.getState());
  }
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
registerServiceWorker();
