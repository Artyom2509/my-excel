import {DOMListener} from '@core/DOMListner';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options);
    this.name = options.name || '';
    this.listeners = options.listeners || [];
    this.$root = $root;
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
