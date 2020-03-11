import Observer from '../lib/Observer';
import createElement from '../lib/createElement';

class ProductList extends Observer {
  constructor(state = {}) {
    super();
    this.appState = state;
  }

  createMarkup(state) {
    return createElement(
      'div',
      null,
      createElement(
        'ul',
        {class: 'flex-wrap'},
        ...state.products.map((product, idx) => createElement(
         'li',
         {class: 'card', key: idx},
         createElement(
           'div',
           {class: 'imgWrapper'},
           createElement(
             'img',
             {src: product.img, alt: `${product.name}`},
           )
         ),
         createElement(
          'div', {class: 'product-desc' },
            createElement(
              'p', {class: 'title' }, `Ürün Adı: ${product.name}`
            ),
            createElement(
            'p', {class: 'price' }, `Fiyat: ${product.price} TL`
          ),
          ),
         createElement(
          'button',
          {class: `button ${state.baskets.find(b => b.id == product.id) ? 'disable' : ''}`, id: 'addBasket', 'data-id': product.id },
          'Sepete Ekle'
        )
        ))
      )
    );
  }

  render(state, selector = "app") {
    const markup = this.createMarkup(state);
    const parent = document.getElementById(selector);
  
    parent.innerHTML = '';
    parent.appendChild(markup);
    this.clickEvent();
  }

  clickEvent() {
    const products = document.querySelectorAll('#addBasket');
    for (let button of products) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('girdim')
        const state = this.appState.getState();
        const id = e.target.getAttribute('data-id');
        const currentProduct = state.products.find(product => product.id == id);

        if (!currentProduct || state.baskets.find(basket => basket.id == id)) {
          return;
        }
  
        // Getting the current state.
        const baskets = [...state.baskets, currentProduct];
  
        // Updating state will prompt a re-render via the notify method being called.
        this.appState.update({
          ...state,
          baskets,
          total: {
            count: state.total.count += 1,
            price: state.total.price + currentProduct.price,
          }
        });
      })
    }
  }

  update(state) {
    this.render(state, "product-list-container");
  }
}

export default ProductList;