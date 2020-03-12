import createElement from '../lib/createElement';

class Total {
  constructor(observer) {
    this.$observer = observer;
    this.$observer.addObserver(this);
    this.state = this.$observer.getState();
  }

  createMarkup(state) {
    return createElement(
      'p',
      null,
      `Total: ${state.total.price} TL`
    );
  }

  render() {
    const markup = this.createMarkup(this.state);
    const parent = document.getElementById('total-container');
  
    parent.innerHTML = '';
    parent.appendChild(markup);
  }

  update() {
    this.render();
  }
}

export default Total;