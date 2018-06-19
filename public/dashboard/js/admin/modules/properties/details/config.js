import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.propertiesDetails', {
      url: '/properties/details',
      controller: controller.name,
      template,
      params: {
        id: null
      }
    });
}

config.$inject = ['$stateProvider'];
