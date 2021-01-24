
inicio_mod.controller('UsuariosCtrl', function ($scope) {
  $scope.subtitulo = "Gerencie os Usuários";

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
  }

  $scope.init();
});