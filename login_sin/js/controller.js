function meucontroller($scope, $http) {

	$scope.envia = function () {

		sessionStorage.setItem('nome', 'Romulo Gomes');
		location.href = "../sin/consultas.html";
	}
}




