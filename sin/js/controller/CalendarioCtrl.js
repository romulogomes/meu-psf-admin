
inicio_mod.controller('CalendarioCtrl', function ($scope) {

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
  }

  $scope.init();
});