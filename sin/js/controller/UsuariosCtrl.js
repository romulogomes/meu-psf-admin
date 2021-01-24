
inicio_mod.controller('UsuariosCtrl', function ($scope) {
  $scope.subtitulo = "GLoria a Deus";

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
  }

  $scope.init();
});