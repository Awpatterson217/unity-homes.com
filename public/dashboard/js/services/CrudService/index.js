"use strict"

export default function CrudService($http) {
  return function(url = '') {
    function Service(url) {
      this.url = url;
    }

    Service.prototype.getAll = function() {
      return $http({
        method: 'GET',
        url: this.url,
      });
    }

    Service.prototype.get = function({ path, id }) {
      const url = path
        ? `${path}/${id}`
        : `${this.url}/${id}`

      return $http({
        method: 'GET',
        url,
      });
    }

    Service.prototype.post = function({ path, data }) {
      const url = path
        ? path
        : this.url;

      return $http({
        method: 'POST',
        url,
        data,
      });
    }

    Service.prototype.put = function({ path, data }) {
      const url = path
        ? path
        : this.url;

      return $http({
        method: 'PUT',
        url,
        data,
      });
    }

    Service.prototype.delete = function({ path, id }) {
      const url = path
      ? `${path}/${id}`
      : `${this.url}/${id}`

      return $http({
        method: 'DELETE',
        url,
      });
    }
  
    const crudService = new Service(url)
    
    return crudService;
  }
}

CrudService.$inject = ['$http'];