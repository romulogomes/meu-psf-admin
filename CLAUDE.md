# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based health administration system called "Meu PSF" (My PSF - Programa Saúde da Família) built with AngularJS 1.8. The system manages medical consultations, medications, calendar scheduling, and user administration for primary health care units.

## Architecture

### Frontend Structure
- **AngularJS 1.8**: Main JavaScript framework using modules, controllers, and directives
- **Bootstrap**: UI framework with custom CSS themes
- **jQuery**: DOM manipulation and DataTables integration
- **SweetAlert2**: Modal dialogs and notifications

### Application Structure
```
psf/                    # Main application
├── index.html         # Main app entry point
├── js/
│   ├── controller.js  # Main app module, routes, and directives
│   ├── env.js         # Environment configuration
│   └── controller/    # Feature-specific controllers
│       ├── ConsultasCtrl.js      # Medical consultations
│       ├── MedicamentosCtrl.js   # Medications management
│       ├── CalendarioCtrl.js     # Calendar scheduling
│       └── UsuariosCtrl.js       # User management
└── templates/         # HTML templates for directives

login_psf/             # Login/authentication module
├── index.html
└── js/controller.js   # Login controller
```

### Key Components
- **Main Module**: `sig_app` in `psf/js/controller.js`
- **Login Module**: `login_app` in `login_psf/js/controller.js`
- **API Communication**: REST API calls to backend (configured in `env.js`)
- **Authentication**: JWT token stored in sessionStorage
- **State Management**: AngularJS scope-based with sessionStorage for persistence

### Environment Configuration
- API URL configured in `psf/js/env.js`
- Default: `http://localhost:3000/` (development)
- Production: `https://meu-psf-api.herokuapp.com` (commented out)

### Routing
Single Page Application with AngularJS routing:
- `/` and `/consulta` → Consultations view
- `/medicamentos` → Medications management
- `/calendario` → Calendar scheduling
- `/usuarios` → User administration

## Development Workflow

### Local Development
1. Update API URL in `psf/js/env.js` if needed
2. Serve files with any HTTP server (this is a static frontend)
3. Login through `login_psf/index.html`
4. Main app accessed at `psf/index.html`

### No Build Process
This project uses static files served directly to the browser without a build step. All dependencies are loaded via CDN or included as minified files.

### File Versioning
Template and script URLs include version query parameters (e.g., `?v=1615677974640`) for cache busting.

### Authentication Flow
1. Login at `/login_psf/` with CPF/email and password
2. JWT token stored in sessionStorage upon successful login
3. Token sent as Authorization header for all API requests
4. Redirect to main app after login

### Data Management
- Uses jQuery DataTables for data grids
- FullCalendar for calendar views
- Moment.js for date handling
- Form validation with AngularJS and custom functions

## Common Tasks

### Debugging
- Enable debug mode in `psf/js/env.js` (`window.__env.enableDebug = true`)
- Check browser console for JavaScript errors
- Verify API responses in Network tab

### Adding New Features
1. Create controller in `psf/js/controller/`
2. Add route in `psf/js/controller.js`
3. Create HTML template
4. Add menu item in controller's `$scope.menus` array

### Styling Changes
- Main CSS: `psf/assets/css/main.css`
- Theme: `psf/assets/css/theme_light.css`
- Custom styles: `psf/css/` directory

### API Integration
- HTTP requests use AngularJS `$http` service
- Authorization header automatically added via `$http.defaults.headers.common.Authorization`
- API base URL configured in `env.js`