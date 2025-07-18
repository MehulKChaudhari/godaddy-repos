# GoDaddy Repositories

A beautiful, modern web application that displays GoDaddy's open source repositories from GitHub. Built with React, TypeScript, and Vite.


## Prerequisites

- **Node.js**: 18.0.0 or higher
- **pnpm**: 8.0.0 or higher

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd godaddy-repos
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

### Testing

Run tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

Run tests with UI:
```bash
pnpm test:ui
```

### Linting

Run ESLint:
```bash
pnpm lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── RepositoryCard.tsx
│   └── RepositoryCard.css
├── pages/              # Page components
│   ├── Dashboard.tsx
│   └── Dashboard.css
├── types/              # TypeScript types
├── tests/  
├── utils/              # Utility functions
|
├── App.tsx             # Main app component
├── main.tsx            # Application entry point
└── global.css          # Global styles
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API

The application fetches repository data from the GitHub API:
- **Endpoint**: `https://api.github.com/orgs/godaddy/repos`
- **Data**: Repository information including name, description, stars, forks, language, and more

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **Testing Library** - Component testing
- **Lucide React** - Icon library

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm lint` - Run ESLint

