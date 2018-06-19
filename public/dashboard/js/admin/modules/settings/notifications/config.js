import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.settings.notifications', {
      url: '/notifications',
      controller: controller.name,
      template,
    });
}

config.$inject = ['$stateProvider'];
