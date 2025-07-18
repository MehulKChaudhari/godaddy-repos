# GoDaddy Repositories

A beautiful, modern web application that displays GoDaddy's open source repositories from GitHub. Built with React, TypeScript, and Vite.


## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── RepositoryCard.tsx
│   └── RepositoryCard.css
├── pages/              # Page components
│   ├── Dashboard.tsx
│   └── Dashboard.css
├── types/              # TypeScript type definitions
│   └── repository.ts
├── utils/              # Utility functions
│   └── api.ts
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
- **CSS3** - Styling with modern features
- **GitHub API** - Data source

