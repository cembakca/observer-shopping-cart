class Manager {
  constructor() {
    this.observers = [];
  }

  addObserver(fn) {
    this.observers.push(fn);
  }

  removeObserver(fn) {
    this.observers.filter(item => item !== fn);
  }

  triggerObserver(state) {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.update(state));
    }
  }
}

export default Manager;