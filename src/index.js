import './sass/index.sass';
import './sass/dashboard.sass';
import {Excel} from './components/excel/Excel';
import {Table} from './components/table/Table';
import {Formula} from './components/formula/Formula';
import {Toolbar} from './components/toolbar/Toolbar';
import {Header} from './components/header/Header';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

// console.log(excel);
excel.render();
