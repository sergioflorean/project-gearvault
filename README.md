# GearVault

**Your gear. Your collection. Your story.**

GearVault is a web application for guitarists and music gear enthusiasts to catalog, explore, and manage guitars, amplifiers, and effects pedals.

This project is being developed as a capstone project for the **TripleTen Software Engineering program**, with a frontend-first approach and a planned full-stack architecture.

## Live Application

**[View GearVault on Vercel](https://gearvault-olive.vercel.app)**

The Stage 1 application is deployed on Vercel and can be explored directly in a web browser.

## Current Status

**Stage 1 — Frontend Application (Completed)**

The current version is a functional, responsive frontend prototype built with React, TypeScript, Vite, and Material UI.

It includes personal collection management, instrument photography, third-party marketplace integration, and a simulated community catalog.

### Implemented Features

**Explore**

- Browse guitars, amplifiers, and effects pedals.
- Search and filter instruments by their details and category.
- Explore predefined demo instruments and locally saved personal instruments.
- View instrument photographs and specifications.
- Open individual Gear Detail pages.

**My Collection**

- Add, edit, and delete personal instruments.
- Save instrument details, including brand, model, year, finish, and optional serial number.
- Add, replace, or remove instrument photographs using image URLs.
- Organize instruments by category and availability.
- Display collection statistics.
- Store personal collection data in browser localStorage.
- Preserve saved instruments after refreshing the page.

**Gear Detail**

- View instrument specifications and identification information.
- Display instrument photographs and availability status.
- Manage instruments belonging to the simulated current user.
- Retrieve live marketplace listings from the Reverb API.
- Display listing prices and external marketplace links.

**Market Price Reference**

- Calculate a median asking price using comparable Reverb listings.
- Display a reference price range.
- Avoid combining prices from different currencies.
- Require at least three comparable listings before displaying an estimate.
- Clearly distinguish asking prices from confirmed sale prices or professional appraisals.

**User Experience**

- Responsive layouts for desktop and mobile devices.
- Navigation using React Router.
- Loading, error, and empty states for marketplace requests.
- Reusable React components with TypeScript interfaces.
- Accessible navigation and interactive controls.

## Frontend Demo Architecture

Stage 1 uses predefined catalog instruments and locally saved personal instruments to simulate a future community experience.

The `getExploreGear()` utility combines both sources so Explore can display them using shared React components.

Personal collections currently exist only in the user's browser through localStorage.

Newly added instruments automatically appear in Explore, but they are not visible to other users or synchronized across devices.

The public preview mapping excludes private collection fields such as serial numbers.

**This is an intentional frontend-only demonstration, not a completed multi-user application.**

Authentication, shared database records, and backend-enforced ownership will be introduced in Stage 2.

## Instrument Photos

GearVault supports instrument photography in the Stage 1 frontend.

- Demo instruments include predefined image assets.
- Users can add an optional image URL when creating an instrument.
- Existing image URLs can be edited, replaced, or removed.
- Instrument photographs appear in My Collection, Explore, and Gear Detail.
- Instruments without photographs display a fallback placeholder.

**Current limitation:** Images are referenced through URLs rather than uploaded directly from a device.

Direct image uploads and cloud-based image storage are planned for Stage 2.

## Reverb API Integration

GearVault integrates with the Reverb API to retrieve third-party marketplace listings.

API requests are implemented using `fetch()` in `client/src/utils/reverbApi.ts`.

The application searches for listings using instrument information such as brand, model, and category.

The integration includes:

- Live marketplace listings.
- Listing prices and external links.
- Loading indicators.
- Error handling.
- Empty-result messages.
- Expandable listing results.
- Market price estimates based on comparable listings.

Marketplace prices are informational references and do not represent guaranteed instrument values.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Material UI (MUI)
- Emotion (CSS-in-JS)
- React Router
- Browser localStorage
- Reverb API
- Vercel

### Planned Backend — Stage 2

- Node.js
- Express
- MongoDB
- JWT authentication
- Cloud-based image storage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

git clone https://github.com/sergioflorean/project-gearvault.git

Navigate to the project directory:

cd project-gearvault

Switch to the Stage 1 branch:

git switch stage-frontend

Navigate to the frontend directory:

cd client

Install dependencies:

npm ci

Start the development server:

npm run dev

Vite will display the local development URL, normally:

http://localhost:5173/

### Available Commands

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run lint`    | Run ESLint                           |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |

## Environment Configuration

The Reverb API configuration is documented in `client/.env.example`.

The optional environment variable is:

VITE_REVERB_API_URL=https://api.reverb.com/api

If the environment variable is not provided, the application uses the public Reverb API URL as its default.

The current public listings integration does not require an API key.

Local environment files are excluded from version control.

## Project Structure

project-gearvault/
├── client/
│ ├── public/
│ │ └── images/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── types/
│ │ └── utils/
│ ├── .env.example
│ ├── package.json
│ ├── vercel.json
│ └── README.md
├── docs/
└── README.md

The frontend is organized into reusable components, application pages, shared TypeScript types, and utility modules.

## Current Limitations

As a frontend-only prototype:

- Personal collection data is stored locally in each browser.
- Data is not synchronized between users or devices.
- Authentication and real user accounts are not yet available.
- Instrument ownership is simulated on the client and is not a security mechanism.
- Instrument photographs are added through URLs rather than file uploads.
- Community interactions and public user profiles are not yet implemented.
- Market price references use active asking prices rather than completed sales.

These limitations are intentional and define the scope of Stage 1.

## Roadmap

### Stage 1 — Frontend (Completed)

- Responsive React application.
- Reusable TypeScript components.
- Navigation with React Router.
- Personal collection management.
- Instrument photography through image URLs.
- Reverb API integration.
- Market Price Reference.
- Community feed simulation.
- Production deployment on Vercel.

### Stage 2 — Full-Stack (Planned)

- REST API with Node.js and Express.
- MongoDB database integration.
- User registration and authentication.
- JWT-based protected routes.
- Backend-enforced collection ownership.
- Persistent collections synchronized across devices.
- Direct instrument photo uploads.
- Cloud image storage.
- Database-powered Explore feed.
- Expanded serial number identification.

Additional features, including wantlists, trading, and community interactions, may be developed in future iterations.

## About the Project

GearVault is a TripleTen Software Engineering capstone project developed to demonstrate frontend architecture, TypeScript, reusable React components, client-side data management, third-party API integration, and preparation for a full-stack application.

The long-term vision is to create a platform where musicians can document their equipment, explore its history, track market references, and connect with other gear enthusiasts.

## Documentation

For detailed frontend architecture, installation instructions, API integration, implemented features, and current limitations, see the [Frontend README](client/README.md).

**Live Application:** https://gearvault-olive.vercel.app

**Stage 1 Pull Request:** https://github.com/sergioflorean/project-gearvault/pull/34
