import controller from './controller.js';
import config     from './config.js';

import application from './application';

export default angular.module('applicants', [application])
  .controller(controller.name, controller)
  .config(config)
  .name;
