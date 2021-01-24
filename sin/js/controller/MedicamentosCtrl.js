
inicio_mod.controller('MedicamentosCtrl', function ($scope) {

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
  }

  $scope.init();
});