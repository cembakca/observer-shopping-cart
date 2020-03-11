import Observer from '../lib/Observer';
import createElement from '../lib/createElement';

class Total extends Observer {
  constructor(state = {}) {
    super();
    this.appState = state;
  }

  createMarkup(state) {
    return createElement(
      'p',
      null,
      `Total: ${state.total.price} TL`
    );
  }

  render(state, selector = "app") {
    const markup = this.createMarkup(state);
    const parent = document.getElementById(selector);
  
    parent.innerHTML = '';
    parent.appendChild(markup);
  }

  update(state) {
    this.render(state, "total-container");
  }
}

export default Total;