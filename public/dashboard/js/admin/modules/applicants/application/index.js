import controller from './controller.js';
import config     from './config.js';

export default angular.module('application', [])
  .controller(controller.name, controller)
  .config(config)
  .name;
