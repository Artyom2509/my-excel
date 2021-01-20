/* eslint-disable operator-linebreak */
/* eslint-disable no-invalid-this */
import $ from '../Dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector is not provided in router');

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler = () => {
    if (this.page) this.page.destroy();

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.clear().append(this.page.getRoot());

    this.page.afterRender();
  };

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
