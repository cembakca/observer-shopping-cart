import createElement from '../lib/createElement';

class BasketList {
  constructor(observer) {
    this.$observer = observer;
    this.$observer.addObserver(this);
    this.state = this.$observer.getState();
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

  render() {
    const markup = this.createMarkup(this.state);
    const parent = document.getElementById('basket-list-container');
  
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
        
        const currentBasket = this.state.baskets.find(basket => basket.id == id);
        const baskets = this.state.baskets.filter(basket => basket.id != id);
        console.log('baskets', id);
  
        // Updating state will prompt a re-render via the notify method being called.
        this.$observer.update({
          ...this.state,
          baskets,
          total: {
            count: this.state.total.count -= 1,
            price: this.state.total.price - currentBasket.price,
          }
        });
      })
    }
  }

  update() {
    this.render();
  }
}

export default BasketList;