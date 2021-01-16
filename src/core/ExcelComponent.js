import {DOMListener} from '@core/DOMListner';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options);
    this.name = options.name || '';
    this.listeners = options.listeners || [];
    this.$root = $root;
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];

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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  isWathing(key) {
    return this.subscribe.includes(key)
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Сюда приходят изменения по тем полям на которые мы подписались
  storeChanged() {

  }

  init() {
    this.initDOMListners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
