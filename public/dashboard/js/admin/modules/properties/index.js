import controller from './controller.js';
import config     from './config.js';

import propertiesDetails from './details';
import addProperties     from './add';

const dependencies = [
  propertiesDetails,
  addProperties
];

export default angular.module('properties', dependencies)
  .controller(controller.name, controller)
  .config(config)
  .name;
  