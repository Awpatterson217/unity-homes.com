import controller from './controller.js';
import config     from './config.js';

import tenantsDetails from './details';

export default angular.module('tenants', [tenantsDetails])
  .controller(controller.name, controller)
  .config(config)
  .name;
