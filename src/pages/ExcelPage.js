import {Page} from '@core/Page';
// import $ from '@core/Dom';
import {createStore} from '@core/store/createStore';
import {rootReduser} from '@/redux/rootReduser';
import {normilizeInitialState} from '../redux/initialState';
import {debounce, storage} from '../core/utils';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';

const storageName = (param) => `excel:${param}`;

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const initialState = normilizeInitialState(state);
    const store = createStore(rootReduser, initialState);

    const stateListner = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListner);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
