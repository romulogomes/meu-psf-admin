
inicio_mod.controller('ConsultasCtrl', function ($scope) {
  $scope.subtitulo = "Gerencie todas as consultas";

  $scope.init = function () {
    var dados = [{
      nome: "Maria Joaquina 1 ",
      data: "01/01/2020",
      status: "agendada",
      urgencia: 10,
    }, {
      nome: "Maria Joaquina 2",
      data: "10/01/2020",
      status: "agendada",
      urgencia: 10,
    }, {
      nome: "Maria Joaquina 3",
      data: "02/02/2020",
      status: "agendada",
      urgencia: 10,
    }]
    monta_tabela_consultas(dados);
  }

  $scope.init();
});

function monta_tabela_consultas(dados) {
  var t = $('#tabela').DataTable({
    "columns": [
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
      dados[i].nome,
      dados[i].data ? dados[i].data : '-',
      dados[i].status ? dados[i].status : '-',
      dados[i].urgencia ? dados[i].urgencia : '-',
    ]).draw();
  };

  instancia_click();

}