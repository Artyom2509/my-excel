import {DOMListener} from '@core/DOMListner';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options);
    this.name = options.name || '';
    this.listeners = options.listeners || [];
    this.$root = $root;

    this.prepare();
  }

  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
