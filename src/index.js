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

// Add the observers. These objects will re-render when state changes.
AppState.addObserver(productList);
AppState.addObserver(basketList);
AppState.addObserver(total);
AppState.addObserver(basketBtn);


// On load, perform initial render..
productList.render(AppState.getState(), "product-list-container");
basketList.render(AppState.getState(), "basket-list-container");
total.render(AppState.getState(), "total-container");
basketBtn.render(AppState.getState(), "basket-btn-container");
