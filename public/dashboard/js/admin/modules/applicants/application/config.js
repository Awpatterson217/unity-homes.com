import template from './template.html'
import controller from './controller.js'

export default function config($stateProvider) {
  $stateProvider
    .state('root.admin.applicantsApplication', {
        url: '/applicants/application',
        controller: controller.name,
        template,
        params: {
            email: null
        }
    });
}

config.$inject = ['$stateProvider'];
