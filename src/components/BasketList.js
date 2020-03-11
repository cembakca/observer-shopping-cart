import Observer from '../lib/Observer';
import createElement from '../lib/createElement';

class BasketList extends Observer {
  constructor(state = {}) {
    super();
    this.appState = state;
  }

  createMarkup(state) {
    return (
      createElement(
        'div',
        null,
        createElement(
          'ul',
          null,
          ...state.baskets.map((basket, idx) => createElement(
            'li',
            {class: 'basket-card', key: idx},
            createElement(
              'div',
              {class: 'imgWrapper'},
              createElement(
                'img',
                {src: basket.img, alt: `${basket.name}`},
              )
            ),
            createElement(
              'div', {class: 'basket-desc' },
              createElement(
                'p', {class: 'title' }, `Ürün Adı: ${basket.name}`
              ),
              createElement(
              'p', {class: 'price' }, `Fiyat: ${basket.price} TL`
              ),
              createElement(
                'button', {class: 'button', id: 'removeBasket', 'data-id': basket.id }, 'Sepetten Sil'
              )
            ),
           ),
          )
        )
      )
    )
  }

  render(state, selector = "app") {
    const markup = this.createMarkup(state);
    const parent = document.getElementById(selector);
  
  
    parent.innerHTML = '';
    parent.appendChild(markup);
    this.clickEvent();
  }

  clickEvent() {
    const baskets = document.querySelectorAll('#removeBasket');
    for (let button of baskets) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        
        // Getting the current state.
        const state = this.appState.getState();
        const currentBasket = state.baskets.find(basket => basket.id == id);
        const baskets = state.baskets.filter(basket => basket.id != id);
        console.log('baskets', id);
  
        // Updating state will prompt a re-render via the notify method being called.
        this.appState.update({
          ...state,
          baskets,
          total: {
            count: state.total.count -= 1,
            price: state.total.price - currentBasket.price,
          }
        });
      })
    }
  }

  update(state) {
    this.render(state, "basket-list-container");
  }
}

export default BasketList;