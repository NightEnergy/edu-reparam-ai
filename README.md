# E-Learning Adaptive Tutor - Frontend Architecture

## Tech Stack
- **Angular 21**: Latest stable, standalone components, zoneless.
- **NgRx SignalStore**: Feature-level state management.
- **Tailwind CSS**: Utility-first styling.
- **PrimeNG**: UI component library (Tiffany Blue / Black / White palette).
- **Keycloak**: OIDC authentication (Planned).

## Folder Structure
- `src/app/core/`: Singleton services, guards, interceptors, global config.
- `src/app/features/`: Lazy-loaded route subtrees (Auth, Student, Teacher, Parent, Admin).
- `src/app/shared/`: Stateless UI building blocks (components, pipes, directives).
- `src/app/api/`: Generated API clients and thin wrappers.
- `src/styles/`: Global SCSS, design tokens, and PrimeNG overrides.

## State Management
- `AuthStore`: Global authentication state.
- `ContentStore`: Teacher content management (Lessons, Quizzes).
- `LessonsStore`: Student lesson list and viewer state.
- `QuizzesStore`: Student quiz player state.
- `ProgressStore`: Student progress and analytics.

## Design System
- **Colors**: Tiffany Blue (#0ABAB5), Black (#000000), White (#FFFFFF).
- **Typography**: Inter (Body), Plus Jakarta Sans (Headings).
- **Components**: Neobrutalist design with thick borders and hard shadows.

## Current Status
- [x] Folder structure established.
- [x] Design system tokens and global styles.
- [x] Auth flow with mock role-based login.
- [x] Teacher Content Editor (E5) and Quiz Builder (E6) with Edit support.
- [ ] Real Keycloak integration.
- [ ] OpenAPI client generation.
- [ ] Full feature depth for Student, Parent, and Admin.
- [ ] Hardening (A11y, Responsive, Performance).
