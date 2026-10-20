# GearVault

**Your gear. Your collection. Your story.**

GearVault is a full-stack web application in development for guitarists and music gear enthusiasts to catalog, explore, and manage guitars, amplifiers, and effects pedals.

This project is being developed as a capstone project for the TripleTen Software Engineering program.

## Current Status

**Stage 1 — Frontend Application**

The current version is a functional frontend prototype built with React, TypeScript, Vite, and Material UI.

### Implemented Features

- Browse guitars, amplifiers, and pedals in Explore.
- Search and filter instruments.
- View instrument details and specifications.
- Retrieve real third-party market listings using the Reverb API.
- Add, edit, and delete personal instruments.
- Store personal collections in browser localStorage.
- Display collection statistics.
- Preview a community-style Explore feed.

## Frontend Demo Architecture

Stage 1 uses predefined catalog instruments and locally saved personal instruments to simulate a future community experience.

The `getExploreGear()` utility combines these sources so Explore can display both using shared React components.

Personal collections currently exist only in the user's browser. Authentication, shared database records, and real multi-user functionality are planned for Stage 2.

Personal instrument photo uploads are also planned for Stage 2. The frontend currently supports image rendering and displays placeholders when photographs are unavailable.

See the [Frontend README](client/README.md) for implementation details and current limitations.

## Tech Stack

**Current frontend**

- React
- TypeScript
- Vite
- Material UI
- React Router
- Reverb API
- localStorage

**Planned backend**

- Node.js
- Express
- MongoDB
- JWT authentication
- Cloud-based image storage

## Getting Started

Clone the repository and navigate to the frontend directory:

cd client
npm ci
npm run dev

Vite will display the development URL, normally `http://localhost:5173/`.

### Available Commands

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run lint`    | Run ESLint                          |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |

The public Reverb API integration works without a local `.env` file. Optional configuration is documented in `client/.env.example`.

## Project Structure

project-gearvault/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── types/
│ │ └── utils/
│ ├── .env.example
│ └── README.md
├── docs/
└── README.md

## Roadmap

**Stage 1 — Frontend**

- React application and reusable components.
- Navigation and responsive UI.
- Reverb API integration.
- Local collection management.
- Community feed simulation.

**Stage 2 — Full-Stack**

- REST API with Node.js and Express.
- MongoDB persistence.
- User registration and authentication.
- Protected collection management.
- Image uploads and cloud storage.
- Database-powered Explore feed.
- Expanded instrument identification.

Additional features, including wantlists, trading, and community interactions, may be developed in subsequent iterations.

## Documentation

For detailed installation instructions, frontend architecture, API integration, and the distinction between implemented and planned features, see:

[Frontend
