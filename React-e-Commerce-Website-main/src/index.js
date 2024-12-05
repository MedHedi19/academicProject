import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContext from './context/CartContext';
import ThemeContextProvider from './context/ThemeContextProvider';
import FilterBar from './context/FilterBar';
import { Provider } from 'react-redux';
import store from './context/loginContext/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CartContext>
      <ThemeContextProvider>
        <FilterBar >
          <App />
        </FilterBar>
      </ThemeContextProvider>
    </CartContext>
  </Provider>,
);