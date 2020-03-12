import "./styles.scss";

import State from './lib/State';
import ProductList from './components/ProductList';
import BasketList from './components/BasketList';
import Total from './components/Total';
import BasketButton from './components/BasketButton';

import dummyProducts from './constants/dummyProducts';

const initialState = {
  products: dummyProducts,
  baskets: [],
  total: {
    count: 0,
    price: 0
  }
}

// Instantiate classes.
const AppState = new State(); // application state
const productList = new ProductList(AppState); // Create a new product list.
const basketList = new BasketList(AppState); // Create a new basket list.
const total = new Total(AppState); // Create a new total container.
const basketBtn = new BasketButton(AppState); // Create a new total container.


// Hydrate state with initial baskets.
AppState.update(initialState);


// On load, perform initial render..
productList.render();
basketList.render();
total.render();
basketBtn.render();
