# Meu PSF - Sistema de Administração

## Como Rodar o Projeto

```bash
npx http-server -p 8000
```

Depois acesse: `http://127.0.0.1:8000/`

## Sobre o Projeto

Sistema web para administração de unidades de saúde do Programa Saúde da Família (PSF). Desenvolvido em AngularJS 1.8 para gerenciar consultas médicas, medicamentos, agendamentos e usuários.

### Funcionalidades

- **Consultas**: Gerenciamento de consultas médicas
- **Medicamentos**: Controle de estoque e dispensação
- **Calendário**: Agendamento de consultas e eventos
- **Usuários**: Administração de usuários do sistema
- **Relatórios**: Geração de relatórios diversos

### Tecnologias

- **Frontend**: AngularJS 1.8, Bootstrap, jQuery
- **UI**: SweetAlert2, DataTables, FullCalendar
- **Autenticação**: JWT com sessionStorage

### Estrutura

```
login_psf/          # Módulo de login
psf/               # Aplicação principal
├── js/
│   ├── controller.js          # Módulo principal e rotas
│   ├── controller/            # Controllers por funcionalidade
│   └── env.js                # Configuração de ambiente
└── templates/     # Templates dos componentes
```

### Configuração da API

O sistema consome uma API REST. Configure a URL no arquivo `psf/js/env.js`:

```javascript
window.__env.apiUrl = 'http://localhost:3000/';  // URL da API
```

### Fluxo de Uso

1. Acesse `/login_psf/` para fazer login
2. Após autenticação, é redirecionado para `/psf/`
3. Navegue pelas funcionalidades através do menu lateral