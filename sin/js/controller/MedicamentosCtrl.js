inicio_mod.controller("MedicamentosCtrl", function ($scope, $http) {
  $scope.subtitulo = "Gerencie os medicamentos";

  this.listarMedicamentos = listarMedicamentos;
  this.montarTabelaMedicamentos = montarTabelaMedicamentos;
  this.dadosDaRow = dadosDaRow;
  this.excluirMedicamento = excluirMedicamento;

  $scope.init = function () {
    $scope.medicamento = {};
    listarMedicamentos();
  };

  $scope.init();

  $scope.abrirModalCadastrar = function () {
    $scope.medicamento.id = undefined;
    $scope.medicamento.nome = undefined;
    $scope.medicamento.principio_ativo = undefined;
    $scope.medicamento.dosagem = undefined;
    $scope.medicamento.disponibilidade = undefined;
    $("#modal").modal();
  };

  $scope.abrirModalEditar = function () {
    var dados = $scope.selectedRow.data();
    $("#modal").modal();

    $scope.medicamento.id = dados[0];
    $scope.medicamento.nome = dados[1] && dados[1] != "-" ? dados[1] : undefined;
    $scope.medicamento.principio_ativo = dados[2] && dados[2] != "-" ? dados[2] : undefined;
    $scope.medicamento.dosagem = dados[3] && dados[3] != "-" ? dados[3] : undefined;
    $scope.medicamento.disponibilidade = dados[4] && dados[4] != "-" ? dados[4] : undefined;
  };

  $scope.salvar = function () {
    if ($scope.medicamento.id) {
      $scope.editar();
    } else {
      $scope.cadastrar();
    }
  };

  $scope.cadastrar = function () {
    $scope.medicamento.psf_id = $scope.psf_id;
    $http.post(__env.apiUrl + "/medicamentos/", $scope.medicamento).then(
      function (response) {
        $("#tabela").DataTable().row.add(dadosDaRow(response.data)).draw();
        $("#modal").modal("toggle");
        showConfirmation("Medicamento cadastrado com sucesso");
      },
      function (error) {
        swal({
          title: "Erro ao cadastrar",
          text: "Houve um erro na tentativa de cadastrar o medicamento",
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
    $scope.medicamento.psf_id = $scope.psf_id;
    $http
      .put(
        __env.apiUrl + "/medicamentos/" + $scope.medicamento.id,
        $scope.medicamento
      )
      .then(
        function (response) {
          $scope.selectedRow.data(dadosDaRow(response.data)).draw();
          $("#modal").modal("toggle");
          showConfirmation("Medicamento atualizado com sucesso");
        },
        function (error) {
          swal({
            title: "Erro ao atualizar",
            text:
              "Houve um erro na tentativa de atualizar o medicamento selecionado",
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
    var idMedicamentoSelecionado = $scope.selectedRow.data()[0];
    swal({
      title: "Excluir Medicamento?",
      text: "Você tem certeza que deseja excluir o medicamento?",
      type: "warning",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
    }).then(
      function (isConfirm) {
        if (isConfirm) {
          excluirMedicamento(idMedicamentoSelecionado);
        }
      },
      function () {}
    );
  };

  function listarMedicamentos() {
    $http.get(__env.apiUrl + `/psfs/${$scope.psf_id}/medicamentos`).then(
      function (response) {
        montarTabelaMedicamentos(response.data);
      },
      function (error) {
        swal({
          title: "Erro ao listar",
          text: "Houve um erro na tentativa de listar os medicamentos",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  }

  function montarTabelaMedicamentos(dados) {
    var t = $("#tabela").DataTable({
      columns: [
        { width: "1%" },
        { width: "40%" },
        { width: "15%" },
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

    $("#modal").on("hide.bs.modal", function (e) {
      $scope.medicamento = {};
    });

    for (var i = 0; i < dados.length; i++) {
      t.row.add(dadosDaRow(dados[i])).draw();
    }

    t.column(0).visible(false);
    instancia_click();
  }

  function dadosDaRow(dados) {
    return [
      dados.id,
      dados.nome,
      dados.principio_ativo ? dados.principio_ativo : "-",
      dados.dosagem ? dados.dosagem : "-",
      dados.disponibilidade ? dados.disponibilidade : "-",
    ];
  }

  function excluirMedicamento(idMedicamentoSelecionado) {
    $http
      .delete(__env.apiUrl + "/medicamentos/" + idMedicamentoSelecionado)
      .then(
        function (response) {
          $scope.selectedRow.remove().draw();
          $("#btn_editar").prop("disabled", true);
          $("#btn_excluir").prop("disabled", true);
          showConfirmation("Medicamento excluído com sucesso");
        },
        function (error) {
          swal({
            title: "Erro ao excluir",
            text:
              "Houve um erro na tentativa de excluir o medicamento selecionado",
            type: "error",
            timer: 2000,
          }).then(
            function () {},
            function () {}
          );
        }
      );
  }
});
