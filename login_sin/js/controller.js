function meucontroller($scope, $http) {
	$scope.envia = function () {

		sessionStorage.setItem('usuarioLogadoMeuPsf', {
			cpf_ou_email: cpf_ou_email,
			token: response.token
		});
		location.href = "../sin/#!/consultas";
	}

	$scope.login = function () {
		$scope.loading = true;
		$http.post("https://meu-psf-api.herokuapp.com/login", {
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
				  });;
				$scope.loading = false;
            }
          });
	};
}





