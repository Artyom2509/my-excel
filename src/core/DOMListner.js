import {getMethodName} from '@core/utils.js';

export class DOMListener {
  contructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListners() {
    // console.log(this.listeners, this.$root);
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}
