export default function putRequest($http) {
  return function(url, data) {
    return $http({
      method: 'PUT',
      url,
      data,
    });
  }
};

putRequest.$inject = ['$http'];
