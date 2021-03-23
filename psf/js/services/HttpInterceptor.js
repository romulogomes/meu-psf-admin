inicio_mod
  .factory('HttpInterceptor', HttpInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.interceptors.push('spinnerHttpInterceptor');
  });

function HttpInterceptor ($location, $q) {
  return {
    request: function(config) {
      config.headers = config.headers || {};

      if (sessionStorage.usuario) {
        config.headers['token'] = JSON.parse(sessionStorage.usuario).token;
      }

      return config;
    },

    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        $location.path('/login');
      }

      return $q.reject(response);
    }
  }
}