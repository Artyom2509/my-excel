import './sass/index.sass';
import './sass/dashboard.sass';
import {createStore} from './core/createStore';
import {rootReduser} from './redux/rootReduser';
import {Excel} from './components/excel/Excel';
import {Table} from './components/table/Table';
import {Formula} from './components/formula/Formula';
import {Toolbar} from './components/toolbar/Toolbar';
import {Header} from './components/header/Header';
import {debounce, storage} from './core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReduser, initialState);

const stateListner = debounce((state) => {
  console.log('App state', state);
  storage('excel-state', state);
}, 300);

store.subscribe(stateListner);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

// console.log(excel);
excel.render();
