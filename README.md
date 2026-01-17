## Minesweeper (Test Assignment)

This project is a Minesweeper implementation built with React, Redux Toolkit, Vite, and styled-components.  
It was created as a **test assignment intended to assess a developer’s baseline skill level**.

### Features
- Difficulty selector (Easy/Medium/Hard) with dynamic board sizes.
- Minesweeper gameplay: reveal cells, place flags, and track timer/status.
- Recent results persisted in `localStorage`.
- Redux state management, custom hooks, and typed utilities.
- Vitest-based unit tests covering reducers and helper functions.

### Getting Started
Prerequisites:
- Node.js >= 22.12 (Vite 7 requires the newer `crypto.hash` API)
- npm >= 10

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the test suite:

```bash
npm run test
```

Feel free to explore the codebase structure under `src/` (`components`, `store`, `hooks`, `utils`) to understand the architectural decisions made for this assignment.
