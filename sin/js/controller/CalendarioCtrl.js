
inicio_mod.controller('CalendarioCtrl', function ($scope) {
  $scope.subtitulo = 'Gerencie o calendário do posto';

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
  }

  $scope.init();
});