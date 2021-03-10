inicio_mod.controller('ConsultasCtrl', function ($scope, $http, $filter) {
  $scope.subtitulo = "Gerencie todas as consultas";

  this.listarConsultas = listarConsultas;
  this.montarTabelaConsultas = montarTabelaConsultas;
  this.formatarStatus = formatarStatus;
  this.formatarData = formatarData;

  $scope.init = function () {
    $scope.consulta = {};
    $scope.consulta.usuario = {};
    carregarUsuariosDoPsf();
    listarConsultas();
  }

  $scope.init();

  $scope.abrirModalCadastrar = function () {
    $scope.consulta.id = undefined;
    $scope.consulta.usuario = undefined;
    $scope.consulta.data = undefined;
    $scope.consulta.status = undefined;
    
    $("#modal").modal();
  };

  $scope.salvar = function () {
    if ($scope.consulta.id) {
      $scope.editar();
    } else {
      $scope.cadastrar();
    }
  };

  $scope.abrirModalEditar = function () {
    var dados = $scope.selectedRow.data();
    $("#modal").modal();

    var data = dados[3].split("/");
    $scope.consulta.id = dados[0];
    $scope.consulta.usuario = dados[1] ? {id: dados[1]} : {};
    $scope.consulta.usuario_id = dados[1];
    $scope.consulta.data = moment(new Date(data[2], data[1]-1, data[0]));
    $scope.consulta.status = dados[4].toLowerCase();
  };

  $scope.cadastrar = function () {
    $scope.consulta.psf_id = $scope.psf_id;
    $scope.consulta.usuario_id = $scope.consulta.usuario;
    $http.post(__env.apiUrl + "/consultas/", $scope.consulta).then(
      function (response) {
        $("#tabela")
          .DataTable()
          .row.add(dadosDaRow(response.data))
          .draw();
        $("#modal").modal("toggle");
        showConfirmation("Consulta cadastrada com sucesso");
      },
      function (error) {
        swal({
          title: "Erro ao cadastrar",
          text: "Houve um erro na tentativa de cadastrar a consulta",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  };

  $scope.editar = function () {
    $scope.consulta.psf_id = $scope.psf_id;
    $http
      .put(__env.apiUrl + "/consultas/" + $scope.consulta.id, $scope.consulta)
      .then(
        function (response) {
          $scope.selectedRow.data(dadosDaRow(response.data)).draw();
          $("#modal").modal("toggle");
          showConfirmation("Consulta atualizada com sucesso");
        },
        function (error) {
          swal({
            title: "Erro ao atualizar",
            text:
              "Houve um erro na tentativa de atualizar a consulta selecionada",
            type: "error",
            timer: 2000,
          }).then(
            function () {},
            function () {}
          );
        }
      );
  };

  $scope.excluir = function () {
    var idConsultaSelecionado = $scope.selectedRow.data()[0];
    swal({
      title: "Excluir consulta?",
      text: "Você tem certeza que deseja excluir a consulta?",
      type: "warning",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
    }).then(
      function (isConfirm) {
        if (isConfirm) {
          $http
            .delete(__env.apiUrl + "/consultas/" + idConsultaSelecionado)
            .then(
              function (response) {
                $scope.selectedRow.remove().draw();
                $('#btn_editar').prop('disabled', true);
                $('#btn_excluir').prop('disabled', true);
                showConfirmation("Consulta excluída com sucesso");
              },
              function (error) {
                swal({
                  title: "Erro ao excluir",
                  text:
                    "Houve um erro na tentativa de excluir a consulta selecionada",
                  type: "error",
                  timer: 2000,
                }).then(
                  function () {},
                  function () {}
                );
              }
            );
        }
      },
      function () {}
    );
  };

 function carregarUsuariosDoPsf() {
    $http.get(__env.apiUrl + `/psfs/${$scope.psf_id}/usuarios`)
    .then(function(response){
        $scope.usuarios = response.data;
      }, function(error){
        console.log(error.data);
    });
  }

  function listarConsultas() {
    $http.get(__env.apiUrl + `/psfs/${$scope.psf_id}/consultas`).then(
      function (response) {
        montarTabelaConsultas(response.data);
      },
      function (error) {
        swal({
          title: "Erro ao listar",
          text:
            "Houve um erro na tentativa de listar as consultas",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  }

  function montarTabelaConsultas(dados) {
    var t = $("#tabela").DataTable({
      columns: [
        { width: "1%" },
        { width: "1%" },
        { width: "40%" },
        { width: "15%" },
        { width: "15%" },
      ],
      info: false,
      paging: true,
      pageLength: 10,
    });

    $("#tabela tbody").on("click", "tr", function () {
      $scope.selectedRow = t.row(this);
    });

    $('#modal').on('hide.bs.modal', function (e) {
      $scope.consulta = {};
      $scope.consulta.usuario = {};
    });

    for (var i = 0; i < dados.length; i++) {
      t.row.add(dadosDaRow(dados[i])).draw();
    }

    t.column(0).visible(false);
    t.column(1).visible(false);
    instancia_click();
  }

  function dadosDaRow(dados) {
    return [
      dados.id,
      dados.usuario_id,
      dados.usuario ? dados.usuario.nome : "-",
      dados.data ? formatarData(dados.data) : "-",
      dados.status ? formatarStatus(dados.status) : "-",
    ];
  }

  function formatarStatus(status) {
    return status.toUpperCase();
  }
  
  function formatarData(data) {
    return $filter('date')(new Date(data), "dd/MM/yyyy", "UTC");
  }

});
