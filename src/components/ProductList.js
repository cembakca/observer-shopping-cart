import createElement from '../lib/createElement';

class ProductList {
  constructor(observer) {
    this.$observer = observer;
    this.$observer.addObserver(this);
    this.state = this.$observer.getState();
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

  render() {
    const markup = this.createMarkup(this.state);
    const parent = document.getElementById('product-list-container');
  
    parent.innerHTML = '';
    parent.appendChild(markup);
    this.clickEvent();
  }

  clickEvent() {
    const products = document.querySelectorAll('#addBasket');
    for (let button of products) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const currentProduct = this.state.products.find(product => product.id == id);

        if (!currentProduct || this.state.baskets.find(basket => basket.id == id)) {
          return;
        }
  
        // Getting the current state.
        const baskets = [...this.state.baskets, currentProduct];
  
        this.$observer.update({
          ...this.state,
          baskets,
          total: {
            count: this.state.total.count += 1,
            price: this.state.total.price + currentProduct.price,
          }
        });
      })
    }
  }

  update() {
    this.render();
  }
}

export default ProductList;