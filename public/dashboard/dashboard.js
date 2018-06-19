import angular            from 'angular';
import uirouter           from '@uirouter/angularjs';
import AngularSmartTable  from 'angular-smart-table';
import AngularUiBootstrap from 'angular-ui-bootstrap';

import './assets/css/styles.css';

import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import admin  from './js/admin';
import tenant from './js/tenant';

import CacheService from './js/services/CacheService';
import CrudService  from './js/services/CrudService';

const dependencies = [
  uirouter,
  AngularSmartTable,
  AngularUiBootstrap,
  admin,
  tenant,
];

const injectables = [
  '$window',
  '$state',
  '$scope',
  '$timeout',
  'CacheService',
  'CrudService',
];

angular.module('dashboard', dependencies)
  .factory('CacheService', CacheService)
  .factory('CrudService', CrudService)
  // .factory('StripeService', StripeService)
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
      });
  }])
  .controller('dashboardCtrl', [ ...injectables, function($window, $state, $scope, $timeout, CacheService, CrudService) {
      console.log('dashboard controller loaded');
      // TODO: Pass email from redis session to angularJS
      // Use localStorage?
      // const email = $window.localStorage.getItem('email');
      // const type  = $window.localStorage.getItem('type');

      const cache = CacheService();

      const email = 'admin@unity.com';
      const type  = 'admin';

      const paths = {
        property     : '/api/property',
        applicant    : '/api/applicant',
        tenant       : '/api/tenant',
        administrator: '/api/administrator',
        setting      : '/api/setting',
        billing      : '/api/billing',
        help         : '/api/help',
      }

      const adminProvider = CrudService(paths.administrator);

      // .then(admin => {
      //   console.log('admin: ', admin);
      // })
      // .catch(error => {
      //   console.log('Error: ', error);
      // });

      adminProvider.get({ id: email })
        .then(admin => {
          console.log('admin: ', admin);
        })
        .catch(error => {
          console.log('Error: ', error);
        });

      cache.put("email", email);
      cache.put("paths", paths);


      // Temp, need API service
      $scope.hasData = false;

      // Temp, demonstrates loader
      function checkForData() {
        $scope.hasData = true;

        if (type === 'admin') {
          $state.go('root.admin');
        }

        if (type === 'tenant') {
          $state.go('root.tenant');
        }
      }

      $timeout(checkForData, 1500);
  }]);
