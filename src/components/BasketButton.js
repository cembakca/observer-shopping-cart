import createElement from '../lib/createElement';

class BasketButton {
  constructor(observer) {
    this.$observer = observer;
    this.$observer.addObserver(this);
    this.state = this.$observer.getState();
  }

  createMarkup(state) {
    return createElement(
      'a',
      {href: '#', id: 'basket-link', class: 'basket-link'},
      'Sepetim',
      createElement(
        'strong',
        null,
        ` ${state.total.count}`
      )
    );
  }

  render() {
    const markup = this.createMarkup(this.state);
    const parent = document.getElementById('basket-btn-container');
  
    parent.innerHTML = '';
    parent.appendChild(markup);
    this.clickEvent();
  }

  clickEvent() {
    const button = document.getElementById('basket-link');
    const basketListCont = document.getElementById('basket-list-container');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('objectss')
      basketListCont.classList.toggle('hidden');
    });
  }

  update() {
    this.render();
  }
}

export default BasketButton;