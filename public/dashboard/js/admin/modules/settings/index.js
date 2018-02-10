import controller from './controller.js'
import config from './config.js'

import account from './account'
import notifications from './notifications'
import personal from './personal'
import theme from './theme'

const dependencies = [
  account,
  notifications,
  personal,
  theme,
];

export default angular.module('settings', dependencies)
.controller(controller.name, controller)
.config(config)
.name;
