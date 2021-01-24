inicio_mod.controller('MedicamentosCtrl', function ($scope) {

  $scope.subtitulo = 'Gerencie os medicamentos';

  $scope.init = function () {
    $scope.dados = [{
      id: 1,
      nome: "Ibuprofeno",
      principio_ativo: "Ibuprofeno",
      dosagem: "600mg",
      urgencia: 10,
    }, {
      id: 2,
      nome: "Buscopan",
      principio_ativo: "Dipirona",
      dosagem: "500mg",
      urgencia: 50,
    }, {
      id: 3,
      nome: "Paracetamol",
      principio_ativo: "02/02/2020",
      dosagem: "200mg",
      urgencia: 25,
    }]
    monta_tabela($scope.dados);
  }

  $scope.salvar = function () {
    if ($scope.id) {
      $scope.editar();
    } else {
      $scope.cadastrar();
    }
  }

  $scope.cadastrar = function () {
    $('#modal').modal('toggle');
    showConfirmation('Medicamento Cadastrado com Sucesso');
  }

  $scope.editar = function () {
    $('#modal').modal('toggle');
    showConfirmation('Medicamento Salvo com Sucesso');
  }

  $scope.novo = function () {
    $scope.id = undefined;
    $scope.nome = undefined;
    $scope.principio_ativo = undefined;
    $scope.dosagem = undefined;
    $scope.qunatidade_disponivel = undefined;
    $('#modal').modal();
  }

  $scope.monta_edit = function () {
    var table = $('#tabela').DataTable();
    var dados = table.rows('.selected').data();
    console.log(dados[0]);
    $('#modal').modal();

    $scope.id = dados[0][0];
    $scope.nome = dados[0][1];
    $scope.principio_ativo = dados[0][2];
    $scope.dosagem = dados[0][3];
    $scope.qunatidade_disponivel = dados[0][4];
  }

  $scope.excluir = function () {
    swal({
      title: 'Excluir Medicamento?', text: 'Você tem certeza que deseja excluir o medicamento?', type: 'warning', cancelButtonText: 'Cancelar',
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Sim, Excluir!'
    }).then(function (isConfirm) {
      if (isConfirm) {
        showConfirmation('Medicamento Excluído com Sucesso');
      }
    }, function () { });
  }

  $scope.init();
});

function monta_tabela(dados) {
  var t = $('#tabela').DataTable({
    "columns": [
      { "width": "1%" },
      { "width": "40%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" },],
    "info": false,
    "paging": true,
    "pageLength": 10
  });

  for (var i = 0; i < dados.length; i++) {
    t.row.add([
      dados[i].id,
      dados[i].nome,
      dados[i].principio_ativo ? dados[i].principio_ativo : '-',
      dados[i].dosagem ? dados[i].dosagem : '-',
      dados[i].urgencia ? dados[i].urgencia : '-',
    ]).draw();
  };

  t.column(0).visible(false);
  instancia_click();
}