import {Router} from './core/routes/Router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';
import './sass/index.sass';
import './sass/dashboard.sass';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});