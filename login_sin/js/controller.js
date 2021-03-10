var env = {};

if(window){  
  Object.assign(env, window.__env);
}

var login_mod = angular.module('login_app', []);
login_mod.constant('__env', env);

login_mod.controller('loginController', function ($scope, $http) {
	$scope.login = function () {
		$scope.loading = true;
		$http.post(__env.apiUrl + "/login", {
            cpf_ou_email: $scope.usuario,
            senha: $scope.senha
          })
          .success(function(response) {
            if (response.token) {
				sessionStorage.setItem('tokenMeuPsf', JSON.stringify(response));
              	$http.defaults.headers.common.Authorization = response.token;
				location.href = "../sin/#!/consultas";
            } else {
				swal({
					title: "Erro",
					text: "Usuário e/ou senha incorreto(s)",
					type: "error",
					timer: 2000,
				  });
				$scope.loading = false;
            }
          });
	};
});
