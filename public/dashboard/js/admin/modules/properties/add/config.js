import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.addProperty', {
      url: '/properties/details',
      controller: controller.name,
      template,
    });
}

config.$inject = ['$stateProvider'];
