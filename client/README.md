# GearVault — Frontend

**Your gear. Your collection. Your story.**

GearVault is a web application for guitarists and music gear enthusiasts to explore, catalog, and manage guitars, amplifiers, and effects pedals.

The frontend is built with React, TypeScript, Vite, and Material UI. It connects to an Express REST API and MongoDB Atlas for authentication, instrument management, and public catalog data.

This application is part of the GearVault full-stack capstone project for the TripleTen Software Engineering program.

## Current Status

**Stage 2 — Full-Stack Frontend Live**

The frontend is deployed on Vercel and connected to the GearVault Express API.

Production URL:

https://gearvault-olive.vercel.app

Authentication, Explore, and personal collection management have been tested through the public application.

Final security checks and project submission remain pending.

## Technologies

- React 19
- TypeScript
- Vite
- Material UI
- Emotion
- React Router
- Fetch API
- Reverb API
- Vercel

## Features

### Public Explore

Explore provides a public catalog of instruments retrieved from the GearVault backend.

Visitors can:

- Browse guitars, amplifiers, and effects pedals.
- Search by brand, model, category, and finish.
- Filter instruments by category.
- View photographs, specifications, and availability.
- Open individual instrument detail pages.
- Access the catalog without signing in.

Search and category filters are reflected in the URL parameters.

The catalog retrieves data from the GET /api/explore endpoint rather than browser localStorage.

### Authentication

GearVault provides registration and sign-in forms connected to the backend.

Authentication features include:

- User registration with name, email, and password.
- Login using an email and password.
- JWT authentication.
- Token persistence using localStorage.
- Session validation through GET /users/me.
- Automatic removal of invalid or expired credentials.
- Sign-out functionality.
- Protected navigation for personal collections.

Authentication state is managed through CurrentUserContext and AuthProvider.

The authentication token is stored under the gearvault_token key in localStorage.

### My Collection

Authenticated users can maintain their own instrument collections.

Available actions include:

- Add guitars, amplifiers, and pedals.
- View saved instruments.
- Edit existing instrument information.
- Delete instruments.
- Save image URLs.
- Specify availability status.
- View collection statistics by category.
- Receive success notifications for instrument operations.

Instrument information can include:

- Brand
- Model
- Category
- Year
- Finish
- Serial number
- Image URL
- Availability

Supported availability values are Not for sale, For sale, and Open to trade.

Personal collections are stored in MongoDB through the backend API. They are not stored in localStorage.

### Gear Detail

Gear Detail displays information about individual instruments.

The page includes:

- Brand, model, category, and year.
- Finish and availability status.
- Instrument photography or a placeholder.
- Available identification information.
- Reverb marketplace listings.
- Market price references.

Authenticated owners can also edit or delete their instruments.

Ownership is verified using the backend rather than relying on frontend state alone.

### Reverb Marketplace Integration

GearVault integrates with the public Reverb API to retrieve active marketplace listings.

The integration is implemented in src/utils/reverbApi.ts.

Requests use instrument information such as brand, model, and category.

The interface supports:

- Loading indicators.
- Marketplace listing details.
- Asking prices and currencies.
- Links to external listings.
- Empty-result messages.
- Error handling.
- Expandable marketplace results.

### Market Price Reference

GearVault uses comparable Reverb listings to provide informational market price references.

The calculations:

- Use the median asking price.
- Require at least three comparable listings.
- Avoid combining prices from different currencies.
- Display a reference range when sufficient information is available.

These estimates are based on active asking prices, not completed sales.

They should not be interpreted as professional appraisals or guaranteed market values.

### Responsive Interface

The application supports desktop, tablet, and mobile layouts.

The interface includes:

- Responsive navigation.
- Flexible instrument cards.
- Adaptable forms.
- Loading and empty states.
- Success and error notifications.
- Consistent components and typography.

## Frontend Architecture

The React application is organized into separate directories for pages, components, context, types, and utilities.

### Components

The components directory contains reusable interface elements.

Examples include:

- Header
- Footer
- Navigation
- GearCard
- InstrumentFormDialog
- MarketInfo
- AvailabilityBadge
- ProtectedRoute

### Pages

The pages directory contains application screens.

Implemented pages include:

- Explore
- Gear Detail
- My Collection
- Sign In
- Sign Up
- About

Additional routes include Profile, Wantlist, and Tone Hunter.

Some of these routes are reserved for future functionality.

### Context

The context directory manages authentication state.

AuthProvider stores the current token and user information and validates existing sessions when the application loads.

CurrentUserContext makes authentication information available to React components.

### Utilities

The utils directory contains shared application logic, including:

- api.ts — Shared HTTP requests and error handling.
- instrumentsApi.ts — Instrument and public catalog API requests.
- reverbApi.ts — Reverb API requests.
- reverbMapper.ts — Marketplace data transformation.
- marketStats.ts — Market price calculations.
- instrumentForm.ts — Instrument form processing.

### Types

The types directory contains TypeScript definitions for instruments, collections, and marketplace data.

## Environment Configuration

Create a local environment file inside the client directory using the provided example.

From the repository root, run:

    cp client/.env.example client/.env

Configure the following values in client/.env:

    VITE_API_URL=http://localhost:3001
    VITE_REVERB_API_URL=https://api.reverb.com/api

VITE_API_URL specifies the GearVault backend address.

VITE_REVERB_API_URL configures the public Reverb API endpoint.

Restart the Vite development server after changing environment variables.

Do not store private credentials in frontend environment variables. Values prefixed with VITE\_ are included in the client application.

## Getting Started

### Requirements

- Node.js 24 or later
- npm
- A running GearVault backend
- A configured MongoDB Atlas connection for the backend

### Installation

Clone the project and switch to the full-stack branch:

    git clone https://github.com/sergioflorean/project-gearvault.git
    cd project-gearvault
    git switch stage-fullstack

Install the frontend dependencies:

    npm --prefix client ci

Install the backend dependencies if they are not already installed:

    npm --prefix server ci

Configure both environment files before starting the application.

### Running the Frontend

From the repository root:

    npm run dev:client

Alternatively, from the client directory:

    npm run dev

Vite normally serves the application at:

http://localhost:5173

The backend must also be running for authentication, Explore, and collection management to work.

## Available Commands

From the client directory:

- **npm run dev** — Start the Vite development server.
- **npm run lint** — Run ESLint.
- **npm run build** — Type-check and build the frontend.
- **npm run preview** — Preview the production build locally.

From the repository root:

- **npm run dev:client** — Start the frontend.
- **npm run lint** — Check frontend and backend.
- **npm run build** — Build frontend and backend.

## Testing

### Authentication

1. Register a new account.
2. Sign in with valid credentials.
3. Verify access to My Collection.
4. Refresh the page and confirm that the session is restored.
5. Sign out.
6. Verify that protected pages require authentication.

### Collection Management

1. Sign in.
2. Add an instrument.
3. Confirm that the instrument appears in My Collection.
4. Open its detail page.
5. Edit the instrument.
6. Confirm that the updated information is displayed.
7. Delete the instrument.
8. Confirm that it disappears from the collection.

Success notifications should appear after successful operations.

### Explore

1. Open Explore without signing in.
2. Verify that public instruments load.
3. Search by brand or model.
4. Apply a category filter.
5. Open an instrument.
6. Verify that its details are displayed.

### Reverb Integration

1. Open an instrument detail page.
2. Wait for the marketplace results to load.
3. Review the returned listings.
4. Open an external Reverb listing.
5. Verify the market price reference when sufficient listings exist.

### Responsive Layout

Check the interface at mobile, tablet, and desktop widths.

Verify that navigation, instrument cards, forms, and controls remain usable without unwanted horizontal scrolling.

## Deployment

The React application is deployed on Vercel.

Production URL:

https://gearvault-olive.vercel.app

Production API:

https://gearvault-api.vercel.app

The deployment uses the stage-fullstack branch and the client/ root directory.

VITE_API_URL is configured to point to the production backend.

React Router navigation is supported through client/vercel.json.

## Current Limitations

- Instrument photographs are provided through URLs rather than direct uploads.
- Wantlist and trading features are not fully implemented.
- Tone Hunter is reserved for future development.
- Automatic serial-number identification is not available.
- Reverb price references depend on active third-party listings.

## Related Documentation

Main project documentation:

README.md in the repository root.

Backend documentation:

server/README.md

Reverb integration notes:

docs/reverb-api.md

GitHub repository:

https://github.com/sergioflorean/project-gearvault

Stage 1 pull request:

https://github.com/sergioflorean/project-gearvault/pull/34
