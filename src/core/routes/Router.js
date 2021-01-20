/* eslint-disable operator-linebreak */
/* eslint-disable no-invalid-this */
import {Loader} from '../../components/loader/Loader';
import $ from '../Dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector is not provided in router');

    this.$placeholder = $(selector);
    this.loader = new Loader();
    this.routes = routes;
    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler = async () => {
    if (this.page) this.page.destroy();

    this.$placeholder.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);

    this.page.afterRender();
  };

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
