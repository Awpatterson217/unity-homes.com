import angular            from 'angular';
import uirouter           from '@uirouter/angularjs';
import AngularSmartTable  from 'angular-smart-table';
import AngularUiBootstrap from 'angular-ui-bootstrap';

import './assets/css/styles.css';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import admin         from './js/admin';
import tenant        from './js/tenant';
import dashboardCtrl from './controller';

import CacheService from './js/services/CacheService';
import CrudService  from './js/services/CrudService';
import InitService  from './js/services/InitService';
import PathService  from './js/services/PathService';

const dependencies = [
  uirouter,
  AngularSmartTable,
  AngularUiBootstrap,
  admin,
  tenant,
];

angular.module('dashboard', dependencies)
  .factory('CacheService', CacheService)
  .factory('CrudService', CrudService)
  .factory('InitService', InitService)
  .factory('PathService', PathService)
  // .factory('StripeService', StripeService)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
      });
  }])
  .controller('dashboardCtrl', dashboardCtrl);
