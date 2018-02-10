import * as angular from 'angular';

import getRequest from './get';
import postRequest from './post';
import putRequest from './put';
import deleteRequest from './delete';

export default angular.module('crud', [])
  .service('getRequest'   , getRequest)
  .service('postRequest'  , postRequest)
  .service('putRequest'   , putRequest)
  .service('deleteRequest', deleteRequest)
  .name;
