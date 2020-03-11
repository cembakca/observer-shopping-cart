import Manager from './Manager';

class State extends Manager {
  constructor() {
    super();
    this.state = {}
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    // trigger
    this.triggerObserver(this.state);
  }

  getState() {
    return this.state;
  }
}


export default State;