var inicio_mod = angular.module('sig_app', ['ngRoute'])

inicio_mod.directive('headerLeft', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/headerLeft.html',
	}
});
inicio_mod.directive('headerMenu', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/headerMenu.html',
		scope: {
			usuario: '@'
		}
	}
});
inicio_mod.directive('footerSesa', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/footer.html',
	}
});
inicio_mod.directive('loading', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/loading.html',
	}
});
inicio_mod.directive('tituloSistema', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/tituloSistema.html',
	}
});
inicio_mod.directive('ondeEstou', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/ondeEstou.html',
		scope: {
			pagina: '@',
			subpagina: '@',
			icone: '@'
		}
	}
});

inicio_mod.directive('alteraSenha', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/alteraSenha.html',
		replace: true,
	};
});

inicio_mod.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'consultas.html',
			controller: 'ConsultasCtrl',
		})
		.when('/consulta', {
			templateUrl: 'consultas.html',
			controller: 'ConsultasCtrl',
		})
		.when('/medicamentos', {
			templateUrl: 'medicamentos.html',
			controller: 'MedicamentosCtrl',
		})
		.when('/calendario', {
			templateUrl: 'calendario.html',
			controller: 'CalendarioCtrl',
		})
		.when('/usuarios', {
			templateUrl: 'usuarios.html',
			controller: 'UsuariosCtrl',
		})

		.otherwise({ redirectTo: '/' });
});


inicio_mod.controller('meu_controller', function ($scope) {
	/*
		if(!sessionStorage.getItem('nome'))
			location.href= "../index.html"; */

	$scope.menus = [
		{
			"nome": "Consultas",
			"icone": "fa fa-user-md",
			"link": "#!/consultas",
		},
		{
			"nome": "Medicamentos",
			"icone": "fa fa-medkit",
			"link": "#!/medicamentos",
		},
		{
			"nome": "Calendário",
			"icone": "fa fa-calendar",
			"link": "#!/calendario",
		},
		{
			"nome": "Usuários",
			"icone": "fa fa-user",
			"link": "#!/usuarios",
		},
	];

	$scope.subtitulo = "a";

	$scope.usuario = function () {
		return sessionStorage.getItem('nome');
	}

});
