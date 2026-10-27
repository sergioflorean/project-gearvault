# GearVault

**Your gear. Your collection. Your story.**

GearVault is a full-stack web application for musicians and gear enthusiasts to catalog guitars, amplifiers, and effects pedals, explore other instruments, and check marketplace price references.

Built as a Software Engineering capstone project for TripleTen, GearVault combines a React and TypeScript frontend with an Express API and MongoDB Atlas.

## Project Status

**Stage 2 — Full-Stack Development Complete · Final Production Release Pending**

The Stage 2 application has been implemented and tested locally. Registration, authentication, instrument management, and the public catalog use a real backend and database. Frontend and backend lint and build checks pass.

- **Live demo (Stage 1):** https://gearvault-olive.vercel.app
- **Current development branch (Stage 2):** stage-fullstack
- **Final Stage 2 deployment:** Pending production configuration and end-to-end testing

The public demo currently represents Stage 1. The full-stack version is available in the stage-fullstack branch.

## Features

### Explore

- Browse guitars, amplifiers, and effects pedals in a public catalog.
- Search by brand, model, and other instrument details, and filter by category.
- View individual instrument pages without signing in.
- Explore database-backed listings alongside predefined demonstration instruments.

### My Collection

- Create, view, edit, and delete instruments in a personal collection.
- Record brand, model, category, year, finish, serial number, image URL, and availability.
- Mark instruments as Not for sale, For sale, or Open to trade.
- View collection statistics by instrument category.
- See confirmation messages after creating, updating, or deleting an instrument.
- Access collections from different sessions through MongoDB rather than storing instrument records in the browser.

### Authentication and Authorization

- Create an account and sign in with email and password.
- Protect personal collection routes with JWT authentication.
- Restore sessions using the token saved in localStorage.
- Validate the session against the API and clear invalid credentials.
- Restrict private instrument operations to their owner on the backend.

### Instrument Details and Market Information

- View specifications, images, and availability status.
- Retrieve active Reverb listings using the instrument's brand, model, and category.
- Display comparable asking prices and a reference price range when sufficient data is available.
- Open marketplace listings through their external links.
- Handle loading, empty results, and API failures without interrupting the rest of the application.

### User Experience

- Responsive layouts for desktop, tablet, and mobile.
- React Router navigation and protected pages.
- Form validation, loading states, error messages, and success notifications.
- Reusable TypeScript components with a customized Material UI interface.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Material UI
- Emotion
- React Router

### Backend

- Node.js
- Express 5
- TypeScript
- Mongoose
- bcrypt
- JSON Web Tokens
- express-rate-limit
- CORS

### External Services

- MongoDB Atlas
- Reverb API
- Vercel
- GitHub

## Architecture

GearVault uses a client-server architecture within a single repository.

### Frontend

The client/ directory contains the React application, routing, authentication context, forms, instrument pages, and API clients.

React Router handles navigation, while CurrentUserContext manages authentication state. API requests are handled using the Fetch API.

### Backend

The server/ directory contains the Express REST API, organized into routes, controllers, Mongoose models, authentication middleware, configuration, and error handling.

The backend handles authentication, authorization, request validation, and instrument management.

### Database

MongoDB Atlas stores user accounts and instruments.

Each instrument is associated with an owner. Ownership checks are enforced by the backend to prevent unauthorized modifications.

### API Integration

The frontend connects to the GearVault API using the VITE_API_URL environment variable.

Protected requests include a JWT in the Authorization header.

Instrument records are stored in MongoDB. Browser localStorage is used to persist the authentication token, not the instrument collection.

Reverb API integration is handled separately to retrieve live marketplace listings.

## API Endpoints

### System

- GET /health — Check API status.

### Authentication

- POST /signup — Register a new user.
- POST /signin — Authenticate a user and return a JWT.
- GET /users/me — Retrieve the authenticated user's profile.

### Public Catalog

- GET /api/explore — Retrieve publicly available instruments.
- GET /api/explore/:id — Retrieve a public instrument by ID.

### Instrument Collection

- GET /api/instruments — Retrieve the authenticated user's instruments.
- POST /api/instruments — Add an instrument.
- GET /api/instruments/:id — Retrieve an owned instrument.
- PATCH /api/instruments/:id — Update an instrument.
- DELETE /api/instruments/:id — Delete an instrument.

The API validates request data, hashes passwords with bcrypt, applies rate limiting to authentication routes, and checks instrument ownership before protected operations.

## Getting Started

### Requirements

- Node.js 24 and npm
- A MongoDB Atlas cluster
- A MongoDB database user
- A MongoDB connection string

### 1. Clone the Repository

Clone the project and switch to the full-stack development branch.

    git clone https://github.com/sergioflorean/project-gearvault.git
    cd project-gearvault
    git switch stage-fullstack

### 2. Install Dependencies

Run the following commands from the project root.

    npm --prefix client ci
    npm --prefix server ci

### 3. Configure Environment Variables

Create local environment files from the provided examples.

    cp client/.env.example client/.env
    cp server/.env.example server/.env

Configure the frontend environment in client/.env.

    VITE_API_URL=http://localhost:3001
    VITE_REVERB_API_URL=https://api.reverb.com/api

Configure the backend environment in server/.env.

    PORT=3001
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secure_jwt_secret
    CLIENT_URL=http://localhost:5173

Replace the placeholder values with your own MongoDB connection string and a strong, randomly generated JWT secret.

Configure MongoDB Atlas Network Access to permit the environment running the server to connect to your cluster.

**Never commit real credentials, tokens, or local environment files to GitHub.**

The .env.example files are provided as configuration templates.

### 4. Run Locally

Start the backend from the project root.

    npm run dev:server

Open a second terminal in the project root and start the frontend.

    npm run dev:client

The application will be available at the following addresses.

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API health check: http://localhost:3001/health

To verify that the API is running, execute:

    curl http://localhost:3001/health

## Available Commands

The following commands are available from the project root.

- **npm run dev:client** — Start the Vite development server.
- **npm run dev:server** — Start Express in development mode.
- **npm run lint** — Run ESLint for frontend and backend.
- **npm run build** — Build frontend and backend.
- **npm run start:server** — Start the compiled Express backend.

Run npm run build before npm run start:server if the compiled backend is not already available.

## Project Structure

The repository is divided into frontend, backend, and documentation directories.

### client/

Contains the React frontend.

- public/ — Static assets and instrument images.
- src/components/ — Reusable interface components.
- src/context/ — Authentication context and provider.
- src/pages/ — Application pages and routes.
- src/types/ — TypeScript interfaces and types.
- src/utils/ — API clients, utilities, and market calculations.
- .env.example — Frontend environment configuration template.
- package.json — Frontend dependencies and scripts.
- vercel.json — Frontend deployment configuration.

### server/

Contains the Express backend.

- src/config/ — Shared constants and configuration.
- src/controllers/ — Authentication and instrument controllers.
- src/middleware/ — Authentication and error-handling middleware.
- src/models/ — MongoDB models.
- src/routes/ — API route definitions.
- src/app.ts — Express application and database connection.
- .env.example — Backend environment configuration template.
- package.json — Backend dependencies and scripts.

### docs/

Contains additional project documentation, including Reverb API integration notes.

### Root Files

- package.json — Shared development, lint, and build scripts.
- README.md — Main project documentation.

Frontend and backend dependencies are maintained separately.

## Instrument Images

GearVault supports image URLs for instruments and includes local image assets for demonstration items.

Users can add or update an instrument's image URL. Instruments without an image display a placeholder.

Image handling includes:

- Predefined photographs for demonstration instruments.
- Optional image URLs for personal instruments.
- Image replacement and removal.
- Fallback images when no photograph is available.

Uploading images directly from a device and managing cloud image storage are not included in the current release.

## Reverb API Integration

GearVault integrates with Reverb to retrieve third-party marketplace listings.

The integration uses instrument information, including brand, model, and category, to search for comparable gear.

Features include:

- Live marketplace listings.
- Listing prices and external links.
- Loading indicators.
- Error handling.
- Empty-result messages.
- Expandable listing results.
- Market price references based on comparable listings.

Marketplace prices are informational references and do not represent guaranteed instrument values.

## Market Price References

GearVault calculates a median asking price using comparable Reverb listings when sufficient data is available.

The calculations follow several rules:

- At least three comparable listings are required.
- Prices from different currencies are not combined.
- Reference prices are based on active marketplace listings.
- Asking prices are distinguished from confirmed sales or professional appraisals.

These values are intended to help users understand current marketplace asking prices, not provide official appraisals.

For more information, see docs/reverb-api.md.

## Deployment Status

### Stage 1 Frontend

The original frontend application is publicly available on Vercel.

https://gearvault-olive.vercel.app

This deployment represents the Stage 1 version.

### Stage 2 Backend

The Express API has been deployed to a protected Vercel Preview environment.

The health endpoint has successfully returned HTTP 200, confirming that the application was able to start and establish a database connection during verification.

### Stage 2 Production Release

Final production deployment remains pending.

The remaining tasks include:

- Production environment variable configuration.
- MongoDB Atlas connectivity verification.
- Production CORS configuration.
- Deployment of the Stage 2 React frontend.
- Authentication and CRUD testing through public URLs.
- Final security and functionality verification.

Production URLs and final deployment instructions will be added after verification.

## Current Limitations

- Instrument images are provided through URLs rather than direct uploads.
- Automatic serial-number decoding is not yet supported.
- Wantlists, trading, and public user profiles are reserved for future development.
- Tone Hunter remains a planned feature.
- Market price references are based on active listings rather than completed sales.
- The Stage 2 production release has not yet completed final verification.

These limitations are outside the current mandatory Stage 2 scope.

## Roadmap

### Stage 1 — Completed

- Responsive frontend built with React, TypeScript, and Material UI.
- Instrument catalog and detail pages.
- Personal collection interface.
- Reverb API integration.
- Market price references.
- Initial public deployment on Vercel.

### Stage 2 — Implemented

- Express REST API with TypeScript.
- MongoDB Atlas database integration.
- User registration and login.
- Password hashing and JWT authentication.
- Protected routes and ownership authorization.
- Instrument CRUD operations.
- Database-backed public Explore catalog.
- JWT persistence using localStorage.
- Request validation and error handling.
- Authentication rate limiting.
- Success notifications for instrument operations.
- Frontend and backend lint and build verification.

### Final Release — Pending

- Configure production environment variables and CORS.
- Deploy the Stage 2 frontend and API.
- Verify authentication and CRUD operations from public URLs.
- Complete authorization, validation, and security testing.
- Update documentation with final production URLs.
- Create the final pull request.
- Submit the Stage 2 project for review.

### Future Improvements

- Direct instrument image uploads.
- Cloud-based image storage.
- Serial-number identification.
- Wantlists and trading.
- Public user profiles.
- Tone Hunter.
- Performance and bundle optimization.

## About the Project

GearVault is a TripleTen Software Engineering capstone project focused on building a practical full-stack application for musicians.

It demonstrates React and TypeScript development, REST API design, persistent data with MongoDB, authentication and authorization, third-party API integration, and responsive interface design.

The long-term goal is to give musicians a place to document their equipment, explore other collections, and understand marketplace price references.

## Documentation

Frontend documentation:

client/README.md

Reverb API integration notes:

docs/reverb-api.md

GitHub repository:

https://github.com/sergioflorean/project-gearvault

Stage 1 Pull Request:

https://github.com/sergioflorean/project-gearvault/pull/34
