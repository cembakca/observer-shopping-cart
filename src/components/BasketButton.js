import Observer from '../lib/Observer';
import createElement from '../lib/createElement';

class BasketButton extends Observer {
  constructor(state = {}) {
    super();
    this.appState = state;    
  }

  // <div id="toggle-baket-container">
  //   <a href="#" class="basket-link">Sepeti Göster</a>
  //   <div class="hidden" id="basket-list-container"></div>
  // </div>

  createMarkup(state) {
    console.log(state.total);
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

  render(state, selector = "app") {
    const markup = this.createMarkup(state);
    const parent = document.getElementById(selector);
  
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

  update(state) {
    this.render(state, "basket-btn-container");
  }
}

export default BasketButton;