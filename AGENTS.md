# Agent Guidelines - Parallax AI Landing Page

This document provides essential information for AI agents operating in this repository.

## Build and Development

The project is a React application built with Vite and styled with Tailwind CSS.

- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Linting:** `npm run lint` (uses ESLint 9+)
- **Fix Linting:** `npm run lint:fix`
- **Type Checking:** `npm run typecheck` (uses `tsc` with `jsconfig.json`)
- **Testing:** No test suite is currently configured. If adding tests, prefer Vitest to match the Vite ecosystem.

## Code Style & Conventions

### 1. Framework & Core Libraries
- **React 18:** Functional components with Hooks.
- **Vite:** Build tool and dev server.
- **Tailwind CSS:** Utility-first styling.
- **Framer Motion:** Used extensively for animations and transitions (e.g., `motion.div`).
- **Lucide React:** Default icon library.
- **Radix UI:** Primitive components located in `src/components/ui/` (shadcn/ui style).

### 2. File Structure & Naming
- **Components:** `src/components/` for feature components. Use PascalCase (e.g., `Hero.jsx`).
- **UI Components:** `src/components/ui/` for reusable primitives.
- **Pages:** `src/pages/` for top-level routes.
- **Lib:** `src/lib/` for utilities, contexts, and configurations.
- **Extensions:** Use `.jsx` for components and `.js` for pure logic files.

### 3. Coding Patterns
- **Imports:** Use absolute-like paths if configured, otherwise relative paths. Group imports: React first, then external libs, then local components/utils.
- **Props:** Destructure props in the function signature. Prop-types are disabled in ESLint; use JSDoc if clarification is needed.
- **Styling:** Use Tailwind classes. Avoid writing raw CSS unless necessary (stored in `styles.css`).
- **Animations:** Prefer `framer-motion` for complex entry/exit animations and scroll-linked effects.
- **State Management:** Use `Context API` (see `src/lib/AuthContext.jsx`) or standard `useState`/`useReducer`. Large state should use `@tanstack/react-query` for server state.

### 4. Error Handling
- Use standard `try/catch` blocks for async operations.
- UI-level errors should be handled with specialized components (e.g., `src/components/UserNotRegisteredError.jsx`).
- Use `sonner` or `react-hot-toast` for toast notifications.

### 5. ESLint Specifics
- `no-unused-vars` is handled by `unused-imports/no-unused-vars`.
- Variables starting with `_` are ignored by the unused variables check.
- `react/prop-types` is turned off.
- `react/react-in-jsx-scope` is turned off (React 17+ JSX transform).

## Visual Identity
The landing page uses a dark theme (`dark` class on the root). Key accent color: `coral` (defined in Tailwind config). High use of background gradients, vignettes, and full-bleed imagery to create a "vortex" and "atmospheric" feel.
