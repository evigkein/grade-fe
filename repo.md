# Grade Frontend Repository

## Overview

**SF** is an Angular 20 frontend application built with a monorepo structure using Angular's workspace configuration. The project uses Angular SSR (Server-Side Rendering) for optimized performance and includes a shared library for code reusability across multiple projects.

- **Version**: 0.0.0
- **Angular Version**: ^20.0.0
- **Node.js Version**: ^18.18.0
- **TypeScript Version**: ~5.8.3
- **Dev Server Port**: 3013

## Project Structure

```
grade-fe/
├── projects/
│   ├── main/                    # Main application (Angular SSR app)
│   │   ├── domain/              # Domain logic (features, UI models)
│   │   ├── icons/               # SVG icon definitions and module
│   │   ├── pages/               # Application pages
│   │   ├── routes/              # Route definitions
│   │   ├── public/              # Static assets
│   │   ├── src/                 # Application source
│   │   │   ├── app/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── main.server.ts
│   │   │   ├── server.ts        # SSR server configuration
│   │   │   └── styles.scss
│   │   └── proxy.conf.json      # Development proxy config
│   │
│   └── shared/                  # Shared library (ng-packagr)
│       ├── core/                # Core modules and services
│       ├── directives/          # Custom directives (UI & Utils)
│       ├── domain/              # Domain models (API & Main)
│       ├── features/            # Feature components
│       │   ├── car-card/
│       │   ├── case-preview/
│       │   ├── different/
│       │   ├── faq/
│       │   ├── hot-keys-global/
│       │   └── payment/
│       ├── interceptors/        # HTTP interceptors (CDN, etc.)
│       ├── modules/             # Reusable modules
│       ├── pipes/               # Custom pipes
│       ├── services/            # Shared services
│       │   ├── base-state-manager/
│       │   ├── body/
│       │   ├── device/
│       │   ├── events/
│       │   ├── metrics/
│       │   ├── SEO/
│       │   ├── tokens/
│       │   └── other utilities
│       ├── styles/              # Global SCSS styles
│       ├── ui/                  # UI components (components, directives, features, forms, modals)
│       └── utils/               # Utility functions and helpers
│
├── _doc/                        # Documentation
├── _scripts/                    # Build scripts (icons generation)
├── .github/                     # GitHub workflows
└── Configuration files (eslint, prettier, stylelint, tsconfig)
```

## Key Technologies

### Core Framework
- **Angular 20**: Modern TypeScript-based framework
- **Angular SSR**: Server-side rendering support
- **RxJS**: Reactive programming library
- **TypeScript**: Type-safe JavaScript

### UI & Components
- **ng-zorro-antd**: Ant Design components for Angular
- **ng-select**: Custom select component
- **GSAP**: Animation library
- **HammerJS**: Touch gesture library

### Utilities & Libraries
- **@ngx-translate/core**: Internationalization (i18n)
- **moment**: Date manipulation
- **imask**: Input masking
- **libphonenumber-js**: Phone number handling
- **split-type**: Text animation library
- **file-saver**: File download functionality
- **localforage**: Client-side storage
- **jsotp**: OTP generation
- **angular8-yandex-maps**: Yandex Maps integration
- **ngx-socket-io**: WebSocket communication

### Development & Build Tools
- **Angular CLI 20**: Development toolkit
- **ng-packagr**: Library build tool
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **StyleLint**: SCSS linting
- **Karma**: Test runner
- **Jasmine**: Testing framework

### Code Quality
- **eslint**: JavaScript/TypeScript linting
- **eslint-config-prettier**: Prettier integration
- **eslint-plugin-import**: Import/export validation
- **eslint-plugin-cypress**: Cypress testing support

## Main Features & Modules

### Shared Library (`projects/shared/`)
- **Core Services**: State management, event bus, browser utilities, device detection
- **UI Components**: Modals, forms, directives, features
- **Pipes**: Formatting utilities (currency, file size, prefix, URL handling)
- **Interceptors**: CDN integration
- **Styles**: Global theming and SCSS utilities
- **Features**: Reusable feature modules (car cards, payment, FAQs, etc.)

### Main Application (`projects/main/`)
- **SSR Support**: Server-side rendering configuration
- **Pages**: Home, portfolio, and other page components
- **Routes**: Centralized routing configuration
- **Icons**: Custom icon library with SVG definitions
- **Domain**: Feature-specific business logic

## Available Scripts

### Development
```bash
npm start                    # Start dev server on port 3013
npm run watch               # Watch mode build
ng serve                    # Angular dev server
```

### Build & Production
```bash
npm run build               # Production build (optimized)
npm run build-git           # Production build with git versioning
npm run build-prod          # Production build with source maps
npm run serve:ssr:main      # Run SSR server
```

### Code Generation & Quality
```bash
npm run ng                  # Angular CLI commands
npm run swagger             # Generate API types from OpenAPI spec (ng-openapi-gen)
npm run icons               # Generate icon definitions
npm test                    # Run unit tests with Karma
```

## Configuration Files

| File | Purpose |
|------|---------|
| `angular.json` | Angular CLI workspace configuration |
| `.eslintrc.json` | ESLint configuration |
| `.prettierrc` | Code formatter configuration |
| `.stylelintrc.json` | SCSS linter configuration |
| `tsconfig.json` | TypeScript configuration |
| `ng-openapi-gen.json` | OpenAPI code generation config |
| `projects/main/proxy.conf.json` | Development proxy settings |
| `Dockerfile` | Docker containerization |

## Build Optimization

### Production Configuration
- **Output path**: `dist/main`
- **Bundle optimization**: Enabled
- **Output hashing**: All assets
- **Source maps**: Disabled by default
- **Named chunks**: Disabled by default

### Bundle Size Limits
- **Initial bundle**: Warning at 5MB, error at 10MB
- **Component styles**: Warning at 20kB, error at 40kB

### SSR Configuration
- **Server entry**: `projects/main/src/server.ts`
- **Output mode**: Server
- **Express server**: Handles SSR requests

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3013/`

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## Key Architectural Patterns

- **Monorepo Structure**: Main app + shared library
- **State Management**: Base state manager service
- **Service Layer**: Centralized business logic
- **Component Architecture**: Feature-based organization
- **Pipe Utilities**: Reusable data transformation
- **HTTP Interceptors**: Global request/response handling
- **Directive Pattern**: Custom behavior encapsulation
- **Lazy Loading**: Route-based code splitting

## Assets & Resources

- **Static files**: `projects/main/public/`
- **Global styles**: `projects/shared/styles/`
- **Icon SVGs**: `projects/main/icons/svg/`
- **Ant Design CSS**: Imported from `ng-zorro-antd`

## Environment & Deployment

- **SSR Ready**: Configured for server-side rendering
- **Docker Support**: Includes Dockerfile for containerization
- **CDN Integration**: CDN interceptor for asset delivery
- **Proxy Configuration**: Development API proxy setup
