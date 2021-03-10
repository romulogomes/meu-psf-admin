inicio_mod
  .factory('HttpInterceptor', HttpInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
  });

function HttpInterceptor ($location, $q) {
  return {
    request: function(config) {
      config.headers = config.headers || {};

      config.headers['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvX2lkIjoiTVE9PVxuIn0.8W53I5jKiwv10JJpay1et7NJiLXcPz7KLkV4hxclhQ4'
    //   if (AuthService.getToken()) {
    //   }

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