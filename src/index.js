import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Core from './Core';
import GlobalStyles from './GlobalStyles';
import * as serviceWorker from './serviceWorker';
import createStore from './store/create';
 
const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <GlobalStyles />
      <Core />
    </React.Fragment>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
