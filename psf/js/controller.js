var env = {};

if(window){  
  Object.assign(env, window.__env);
}

var inicio_mod = angular.module('sig_app', ['ngRoute', 'ngMask', 'moment-picker', 'sarsha.spinner'])

var versao = (new Date()).getTime();

inicio_mod.directive('headerLeft', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/headerLeft.html?v='+versao,
	}
});
inicio_mod.directive('headerMenu', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/headerMenu.html?v='+versao,
		scope: {
			usuario: '@',
      psf: '@'
		}
	}
});
inicio_mod.directive('footerSesa', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/footer.html?v='+versao,
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
		templateUrl: 'templates/ondeEstou.html?v='+versao,
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
		templateUrl: 'templates/alteraSenha.html?v='+versao,
		replace: true,
	};
});

inicio_mod.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'consultas.html?v='+versao,
			controller: 'ConsultasCtrl',
		})
		.when('/consulta', {
			templateUrl: 'consultas.html?v='+versao,
			controller: 'ConsultasCtrl',
		})
		.when('/medicamentos', {
			templateUrl: 'medicamentos.html?v='+versao,
			controller: 'MedicamentosCtrl',
		})
		.when('/calendario', {
			templateUrl: 'calendario.html?v='+versao,
			controller: 'CalendarioCtrl',
		})
		.when('/usuarios', {
			templateUrl: 'usuarios.html?v='+versao,
			controller: 'UsuariosCtrl',
		})

		.otherwise({ redirectTo: '/' });
});


inicio_mod.controller('meu_controller', function ($scope) {
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
		{
			"nome": "Relatórios",
			"icone": "fa fa-folder-open",
			"link": "#!/usuarios",
		},
	];

	$scope.usuario = function () {
		if (sessionStorage.usuario) {
			return JSON.parse(sessionStorage.usuario).nome;
		}
	}

	$scope.psf_id = Number(JSON.parse(sessionStorage.usuario).psf_id);
  
  $scope.psf = function () {
		if (sessionStorage.usuario) {
      return JSON.parse(sessionStorage.usuario).psf.nome;
		}
	}
  
});

inicio_mod.run(function ($http) {
	if (sessionStorage.usuario) {
		$http.defaults.headers.common.Authorization = JSON.parse(sessionStorage.usuario).token;
	} else {
		location.href = "../login_psf/index.html";
	}
});

inicio_mod.constant('__env', env);