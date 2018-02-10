import * as angular from 'angular';

import Crud from './crud';

class RestService {
  constructor() {
  }

  getName() {
    const totalNames = this.names.length;
    const rand = Math.floor(Math.random() * totalNames);
    return this.names[rand];
  }
}

export default angular.module('rest', [])
  .service('restService', RestService)
  .name;
