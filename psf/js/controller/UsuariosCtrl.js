inicio_mod.controller('UsuariosCtrl', function ($scope, $http, spinnerService) {
  $scope.subtitulo = "Gerencie os Usuários";

  $scope.init = function () {
    $scope.usuario = {};
    $scope.permitirAlterarSenha = true;
    setTimeout(() => {
      spinnerService.showAll();
      listarUsuarios();
    }, 50);
  };

  $scope.init();

  function listarUsuarios() {
    $http.get(__env.apiUrl + `/psfs/${$scope.psf_id}/usuarios`).then(
      function (response) {
        spinnerService.closeAll();
        montarTabelaUsuarios(response.data);
      },
      function (error) {
        swal({
          title: "Erro ao listar",
          text: "Houve um erro na tentativa de listar os usuarios",
          type: "error",
        });
      }
    );
  }

  function montarTabelaUsuarios(dados) {
    var t = $("#tabela").DataTable({
      columns: [
        { width: "1%" },
        { width: "10%" },
        { width: "38%" },
        { width: "29%" },
        { width: "1%" },
        { width: "1%" },
        { width: "1%" },
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
      $scope.usuario = {};
    });

    for (var i = 0; i < dados.length; i++) {
      t.row.add(dadosDaRow(dados[i])).draw();
    }

    t.column(0).visible(false);
    t.column(4).visible(false);
    t.column(5).visible(false);
    t.column(6).visible(false);
    instancia_click();
  }

  function dadosDaRow(dados) {
    return [
      dados.id,
      dados.cpf ? dados.cpf : "-",
      dados.nome ? dados.nome : "-",
      dados.email ? dados.email : "-",
      dados.telefone ? dados.telefone : "-",
      dados.bairro ? dados.bairro : "-",
      dados.senha ? dados.senha : "-",
      dados.status ? dados.status.toUpperCase() : "-",
    ];
  }

  $scope.abrirModalCadastrar = function () {
    $scope.permitirAlterarSenha = true;
    $scope.usuario.id = undefined;
    $scope.usuario.cpf = undefined;
    $scope.usuario.nome = undefined;
    $scope.usuario.email = undefined;
    $scope.usuario.telefone = undefined;
    $scope.usuario.bairro = undefined;
    $scope.usuario.senha = undefined;
    $scope.esconder_senha = false;
    $("#modal").modal();
  };

  $scope.abrirModalEditar = function () {
    var dados = $scope.selectedRow.data();
    $scope.permitirAlterarSenha = false;
    $("#modal").modal();

    $scope.usuario.id = dados[0];
    $scope.usuario.cpf = dados[1] && dados[1] != "-" ? dados[1] : undefined;
    $scope.usuario.nome = dados[2] && dados[2] != "-" ? dados[2] : undefined;
    $scope.usuario.email = dados[3] && dados[3] != "-" ? dados[3] : undefined;
    $scope.usuario.telefone = dados[4] && dados[4] != "-" ? dados[4] : undefined;
    $scope.usuario.bairro = dados[5] && dados[5] != "-" ? dados[5] : undefined;
    $scope.usuario.senha = dados[6] && dados[6] != "-" ? dados[6] : undefined;
    $scope.esconder_senha = true;
  };

  $scope.salvar = function () {
    if ($scope.usuario.id) {
      editar();
    } else {
      cadastrar();
    }
  };

  cadastrar = function () {
    $scope.usuario.psf_id = $scope.psf_id;
    $http.post(__env.apiUrl + "/criar_usuario", $scope.usuario).then(
      function (response) {
        $("#tabela").DataTable().row.add(dadosDaRow(response.data)).draw();
        $("#modal").modal("toggle");
        showConfirmation("Usuário cadastrado com sucesso");
      },
      function (error) {
        swal({ title: "Erro ao cadastrar", text: "Houve um erro na tentativa de cadastrar o usuário", type: "error" });
      }
    );
  };

  editar = function () {
    $scope.usuario.psf_id = $scope.psf_id;
    $http
      .put(
        __env.apiUrl + "/usuarios/" + $scope.usuario.id,
        $scope.usuario
      )
      .then(
        function (response) {
          $scope.selectedRow.data(dadosDaRow(response.data)).draw();
          $("#modal").modal("toggle");
          showConfirmation("Usuário atualizado com sucesso");
        },
        function (error) {
          swal({
            title: "Erro ao atualizar",
            text:
              "Houve um erro na tentativa de atualizar o usuário selecionado",
            type: "error",
          });
        }
      );
  };

  $scope.excluir = function () {
    var idUsuarioSelecionado = $scope.selectedRow.data()[0];
    swal({
      title: "Excluir usuário?",
      text: "Você tem certeza que deseja excluir o usuário?",
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
            .delete(__env.apiUrl + "/usuarios/" + idUsuarioSelecionado)
            .then(
              function (response) {
                $scope.selectedRow.remove().draw();
                $("#btn_editar").prop("disabled", true);
                $("#btn_excluir").prop("disabled", true);
                showConfirmation("Usuário excluído com sucesso");
              },
              function (error) {
                swal({
                  title: "Erro ao excluir",
                  text:
                    "Houve um erro na tentativa de excluir o usuario selecionado",
                  type: "error",
                });
              }
            );
        }
      },
      function () {}
    );
  };

  $scope.desativarUsuario = function () {
    var idUsuarioSelecionado = $scope.selectedRow.data()[0];
    swal({
      title: "Desativar usuário?",
      text: "Você tem certeza que deseja desativar o usuário?",
      type: "warning",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Desativar Usuário!",
    }).then(
      function (isConfirm) {
        if (isConfirm) {
          $http
            .post(__env.apiUrl + "/desativar_usuario", { usuario_id: idUsuarioSelecionado })
            .then(
              function (response) {
                $('#tabela').dataTable().fnClearTable();
                $('#tabela').dataTable().fnDestroy();
                listarUsuarios();
                $("#btn_editar").prop("disabled", true);
                $("#btn_excluir").prop("disabled", true);
                showConfirmation("Usuário Desativado com sucesso");
                instancia_click();
              },
              function (error) {
                swal({
                  title: "Erro ao excluir",
                  text:
                    "Houve um erro na tentativa de desativar o usuario selecionado",
                  type: "error",
                });
              }
            );
        }
      },
      function () {}
    );
  };
});