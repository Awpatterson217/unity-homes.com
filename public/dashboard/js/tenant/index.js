import controller from './controller.js';
import config     from './config.js';

import tenantNav     from './tenantNav';
import tenantHome    from './modules/home'
import tenantBilling from './modules/billing'

const dependencies = [
  tenantNav,
  tenantHome,
  tenantBilling
];

export default angular.module('tenant', dependencies)
  .controller(controller.name, controller)
  .config(config)
  .name;
