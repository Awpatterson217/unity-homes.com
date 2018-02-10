export default function deleteRequest($http) {
  return function(url) {
    return $http({
      method: 'DELETE',
      url,
    });
  } 
};

deleteRequest.$inject = ['$http'];
