export default function postRequest($http) {
  return function(url, data) {
    return $http({
      method: 'POST',
      url,
      data,
    });
  } 
};

postRequest.$inject = ['$http'];
