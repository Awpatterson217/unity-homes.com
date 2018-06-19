import controller from './controller.js';
import config     from './config.js';

import tenantBillingDetails from './details';

export default angular.module('tenantBilling', [tenantBillingDetails])
  .controller(controller.name, controller)
  .config(config)
  .name;
