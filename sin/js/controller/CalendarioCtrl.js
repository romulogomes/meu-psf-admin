
inicio_mod.controller('CalendarioCtrl', function ($scope, $http) {
  $scope.subtitulo = 'Gerencie o calendário do posto';

  this.listarEventos = this.listarEventos;

  $scope.init = function () {
    $scope.evento = {};
    $("#modal").on("hide.bs.modal", function (e) {
      $scope.evento = {};
      $scope.$digest();
    });
    listarEventos();
  }

  $scope.init();

  $scope.salvar = function () {
    if ($scope.evento.id) {
      editar();
    } else {
      cadastrar();
    }
  }

  function listarEventos() {
    $http.get(__env.apiUrl + `/psfs/${$scope.psf_id}/calendarios`).then(
      function (response) {
        renderizarCalendario(response.data);
      },
      function (error) {
        swal({
          title: "Erro ao listar",
          text: "Houve um erro na tentativa de listar os eventos do calendário",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  }

  function renderizarCalendario(eventos) {
    eventos.forEach(evento => {
      evento.title = evento.descricao;
      evento.start = evento.data;
    });
    $scope.eventos = eventos;
    var calendarEl = document.getElementById('calendar');
    $scope.calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: '100%',
      locale: 'pt-br',
      buttonText: {
        today: 'hoje',
      },
      events: $scope.eventos,
      eventClick: function (info) {
        abrirModalEditar(info.event._def);
      },
      dateClick: function(info) {
        abrirModalCadastrar(info.dateStr);
      }
    });
    $scope.calendar.render();
  }

  function abrirModalCadastrar(data) {
    $scope.evento.id = undefined;
    $scope.evento.descricao = undefined;
    $scope.evento.aceita_marcacao = undefined;
    $scope.evento.data = data;
    $("#modal").modal();
  };

  function abrirModalEditar(event) {
    $("#modal").modal();
    $scope.evento.id = Number(event.publicId);
    $scope.evento.descricao = event.extendedProps.descricao;
    $scope.evento.aceita_marcacao = event.extendedProps.aceita_marcacao;
    $scope.evento.data = event.extendedProps.data;
    $scope.$digest();
  };

  function cadastrar() {
    $scope.evento.psf_id = $scope.psf_id;
    $http.post(__env.apiUrl + "/calendarios", $scope.evento).then(
      function (response) {
        $scope.eventos.push(response.data);
        renderizarCalendario($scope.eventos);
        $scope.evento = {};
        showConfirmation("Evento cadastrado com sucesso");
        setTimeout(function(){
         $("#modal").modal("toggle");
        }, 500);
         
      },
      function (error) {
        swal({
          title: "Erro ao cadastrar",
          text: "Houve um erro na tentativa de cadastrar o evento",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  }

  function editar() {
    $scope.evento.psf_id = $scope.psf_id;
    $http.put(__env.apiUrl + "/calendarios/" + $scope.evento.id, $scope.evento).then(
      function (response) {
        var eventoAtualizado = response.data;
        var indexEventoAtualizado = $scope.eventos.findIndex(e => e.id == eventoAtualizado.id);
        $scope.eventos[indexEventoAtualizado].descricao = eventoAtualizado.descricao;
        $scope.eventos[indexEventoAtualizado].aceita_marcacao = eventoAtualizado.aceita_marcacao;
        renderizarCalendario($scope.eventos);
        setTimeout(() => {
          $("#modal").modal("toggle");
        }, 500);
        showConfirmation("Evento atualizado com sucesso");
      },
      function (error) {
        swal({
          title: "Erro ao cadastrar",
          text: "Houve um erro na tentativa de cadastrar o evento",
          type: "error",
          timer: 2000,
        }).then(
          function () {},
          function () {}
        );
      }
    );
  };

  $scope.excluir = function() {
    var idEventoSelecionado = $scope.evento.id;
    swal({
      title: "Excluir evento?",
      text: "Você tem certeza que deseja excluir o evento?",
      type: "warning",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
    }).then(
      function (isConfirm) {
        if (isConfirm) {
          excluirEvento(idEventoSelecionado);
        }
      },
      function () {}
    );
  }

  function excluirEvento(idEventoSelecionado) {
    $http
      .delete(__env.apiUrl + "/calendarios/" + idEventoSelecionado)
      .then(
        function (response) {
          var indexEvento = $scope.eventos.findIndex(e => e.id == $scope.id);
          $scope.eventos.splice(indexEvento, 1);
          renderizarCalendario($scope.eventos);
          setTimeout(() => {
            $("#modal").modal("toggle");
          }, 500);
          showConfirmation("Evento excluído com sucesso");
        },
        function (error) {
          swal({
            title: "Erro ao excluir",
            text:
              "Houve um erro na tentativa de excluir o evento selecionado",
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