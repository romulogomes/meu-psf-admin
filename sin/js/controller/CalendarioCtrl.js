
inicio_mod.controller('CalendarioCtrl', function ($scope) {
  $scope.subtitulo = 'Gerencie o calendário do posto';

  $scope.init = function () {
    var t = $('#tabela').DataTable({
      "pageLength": 10
    });
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: '100%',
      locale: 'pt-br',
      events: [
        { title: 'Cardiologista', start: '2021-01-01' },
        { title: 'Ginecologista', start: '2021-01-04' },
        { title: 'Atendimento Geral', start: '2021-01-05' }
      ],
      eventClick: function (info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate

        if (info.event.url) {
          window.open(info.event.url);
        }
      }
    });
    calendar.render();

  }

  $scope.init();
});