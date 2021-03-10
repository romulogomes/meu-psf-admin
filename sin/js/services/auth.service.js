(function () {
    'use strict';
  
    angular
      .module('app')
      .factory('AuthenticationService', Service);
  
    function Service($http, $localStorage) {
      var service = {};
  
      service.Login = Login;
      service.Logout = Logout;
  
      return service;
  
      function Login(cpf_ou_email, senha, callback) {
        $http.post(__env.apiUrl + "/login", {
            cpf_ou_email: cpf_ou_email,
            senha: senha
          })
          .success(function(response) {
            if (response.token) {
              $localStorage.usuarioLogadoMeuPsf = {
                cpf_ou_email: cpf_ou_email,
                token: response.token
              };
              $http.defaults.headers.common.Authorization = response.token;
              callback(true);
            } else {
              callback(false);
            }
          });
      }
  
      function Logout() {
        delete $localStorage.usuarioLogadoMeuPsf;
        $http.defaults.headers.common.Authorization = '';
      }
    }
  })();