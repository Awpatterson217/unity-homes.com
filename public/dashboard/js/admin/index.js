import controller from './controller.js';
import config     from './config.js';

import adminNav   from './adminNav';
import adminHome  from './modules/home';
import profile    from './modules/profile';
import tenants    from './modules/tenants';
import applicants from './modules/applicants';
import properties from './modules/properties';
import settings   from './modules/settings';
import help       from './modules/help';
import billing    from './modules/billing';

const dependencies = [
  adminNav,
  adminHome,
  profile,
  tenants,
  applicants,
  properties,
  settings,
  help,
  billing,
];

export default angular.module('admin', dependencies)
  .controller(controller.name, controller)
  .config(config)
  .name;
