var inicio_mod = angular.module('sig_app', [])

inicio_mod.directive('headerLeft', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/headerLeft.html',
  }
});
inicio_mod.directive('headerMenu', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/headerMenu.html',
    scope: {
      usuario: '@'
    }
  }
});
inicio_mod.directive('footerSesa', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/footer.html',
  }
});
inicio_mod.directive('tituloSistema', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/tituloSistema.html',
  }
});
inicio_mod.directive('ondeEstou', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/ondeEstou.html',
    scope: {
      pagina: '@',
      subpagina: '@',
      icone: '@'
    }
  }
});

inicio_mod.directive('alteraSenha', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/alteraSenha.html',
    replace: true,
  };
});

function meu_controller($scope, $http) {

  var url = 'http://localhost/sin/sin_ws/';
  /*
    if(!sessionStorage.getItem('nome'))
      location.href= "../index.html"; */

  $scope.menus = [
    {
      "nome": "Consultas",
      "icone": "fa fa-user-md",
      "link": "consultas.html",
    },
    {
      "nome": "Medicamentos",
      "icone": "fa fa-book",
      "link": "medicamentos.html",
    },
    {
      "nome": "Calendário",
      "icone": "fa fa-book",
      "link": "grade.html",
    },
    {
      "nome": "Usuários",
      "icone": "clip-stats",
      "link": "usuarios.html",
    },
  ];

  $scope.titulo = "SIN";
  $scope.subtitulo = "Sistema Informatizado de Notas";

  $scope.usuario = function () {
    return sessionStorage.getItem('nome');
  }

  //busca as notas e prepara para aparecer na tabela
  $scope.lista_notas = function () {
    $http.get(url + 'listar_notas_aluno.php').
      success(function (data) {
        var dis_ja_vistas = [];
        var json = [];
        x = -1;

        for (var i = 0; i < data.length; i++) {
          var id_disciplina = data[i].id_disciplina;

          if (dis_ja_vistas.indexOf(id_disciplina) == -1) {
            json[++x] = {
              'id_disciplina': id_disciplina,
              'nome_dis': data[i].nome,
              'nota1': '',
              'nota2': '',
              'nota3': '',
              'nota4': ''
            };

            for (var j = 0; j < data.length; j++) {
              if (id_disciplina == data[j].id_disciplina) {

                switch (data[j].bimestre) {
                  case '1':
                    json[x].nota1 = data[j].nota;
                    break;
                  case '2':
                    json[x].nota2 = data[j].nota;
                    break;
                  case '3':
                    json[x].nota3 = data[j].nota;
                    break;
                  case '4':
                    json[x].nota4 = data[j].nota;
                    break;
                }
              };
              dis_ja_vistas.push(id_disciplina);
            }
          };
        }
        $scope.boletim = json;
        monta_tabela_notas(json);

      }).
      error(function () {
        alert('Não foi possivel carregar os Dados');
      });
  }

  //monta pdf
  $scope.gera_dados_pdf = function () {
    monta_pdf($scope.boletim, $scope.aluno.nome);
  }

  var dados = [{
    nome: "Maria Joaquina",
    data: "01/01/2020",
    status: "agendada",
    urgencia: 10,
  }]
  monta_tabela_notas(dados);

}

function monta_tabela_notas(dados) {
  var t = $('#tabela_notas').DataTable({
    "columns": [
      { "width": "40%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" },],
    "info": false,
    "paging": false
  });

  for (var i = 0; i < dados.length; i++) {
    t.row.add([
      dados[i].nome,
      dados[i].data ? dados[i].data : '-',
      dados[i].status ? dados[i].status : '-',
      dados[i].urgencia ? dados[i].urgencia : '-',
    ]).draw();
  };


  $('#tabela_notas tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    }
    else {
      t.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

}

function monta_pdf(dados, aluno) {
  var columns = [
    { title: "Disciplinas", key: "nome_dis" },
    { title: "1º Bimestre", key: "nota1" },
    { title: "2º Bimestre", key: "nota2" },
    { title: "3º Bimestre", key: "nota3" },
    { title: "4º Bimestre", key: "nota4" }
  ];
  var documento = gerarPDF(dados, columns, "", "Aluno: " + aluno, "Boletim", "p", "", "total");
  /* dados, columns, autor, solicitante, titulo, orientacao p ou L, limitperpage */
  documento.save("boletim.pdf");

} 