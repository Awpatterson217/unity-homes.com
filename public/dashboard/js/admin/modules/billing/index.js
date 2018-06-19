import controller from './controller.js';
import config     from './config.js';

import adminBillingDetails from './details';
import billingConfiguration from './configuration';

const dependencies = [
  adminBillingDetails,
  billingConfiguration
];

export default angular.module('adminBilling', dependencies)
  .controller(controller.name, controller)
  .config(config)
  .name;
