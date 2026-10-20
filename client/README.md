# GearVault

**Catalog your gear. Discover its story.**

GearVault is a web application designed for guitarists and gear enthusiasts to explore, organize, and manage collections of guitars, amplifiers, and effects pedals.

The project is being developed as a full-stack application for the TripleTen Software Engineering program.

This repository currently includes **Stage 1: Frontend Application**, a functional React and TypeScript prototype.

## Technologies

- React 19
- TypeScript
- Vite
- Material UI (MUI)
- React Router
- CSS-in-JS with Emotion
- Browser localStorage
- Reverb API (third-party market listings)

## Implemented Features — Stage 1

### Explore

- Browse a demo catalog of guitars, amplifiers, and pedals.
- Search instruments by brand, model, category, or finish.
- Filter instruments by category.
- Open detailed instrument pages.
- View instruments added to the current user's local collection.

### Gear Detail

- View available instrument specifications and identification information.
- Retrieve live third-party market listings from Reverb.
- Display loading, empty, and error states for API requests.
- Display instrument availability: Not for Sale, For Sale, or Open to Trade.
- Edit or delete instruments owned by the simulated current user.

### My Collection

- Add guitars, amplifiers, and pedals.
- Edit and delete saved instruments.
- Store collection data in browser localStorage.
- Preserve collection data after refreshing the page.
- Display collection statistics by category.

### Navigation

- React Router handles navigation between application pages.
- Explore, My Collection, Gear Detail, and About are implemented.
- Additional routes provide placeholders for features planned for later development.

## How the Explore Demo Works

**Stage 1 does not include a backend, user authentication, or a shared database.**

To demonstrate how a future community feed will work, GearVault temporarily combines two sources of instrument data:

1. **Demo catalog:** `src/utils/mockGear.ts` contains predefined instruments representing example community content.
2. **Personal collection:** `src/utils/collectionStorage.ts` saves instruments created by the current user in browser localStorage.

The `getExploreGear()` function in `src/utils/exploreGear.ts` converts personal collection entries into the shared `GearPreview` structure and combines them with the demo catalog.

This allows both sources to use the same `GearCard` and `GearDetail` components.

In the Stage 1 prototype, newly added instruments automatically appear in Explore. However, they are visible only within the current browser's local data, not to other users on different devices.

The public preview mapping excludes personal collection fields such as serial numbers.

**This is an intentional frontend-only demonstration of the planned community experience, not a completed multi-user feed.**

In Stage 2, the demo data flow will be replaced by an authenticated backend and persistent database records.

## Instrument Photos

The predefined demo instruments include image assets so visitors can explore a visual catalog.

Personal instrument records already include an optional `photoUrls` field, and the shared gear components support image rendering.

However, the Stage 1 Add/Edit Instrument form does not yet provide image upload or photo URL input. Newly created instruments therefore display a placeholder when no image is available.

**Real photo uploads are planned for Stage 2**, including:

- Uploading photographs directly from the user's device.
- Storing images through a cloud media service, such as Cloudinary.
- Saving image references with instrument records in the backend.
- Displaying photographs in My Collection, Explore, and Gear Detail.
- Supporting photo updates when editing an instrument.

This separates the frontend demonstration from the complete image-storage implementation planned for the full-stack application.

## Reverb API Integration

GearVault retrieves real market listings using the public Reverb API.

API requests are implemented in `src/utils/reverbApi.ts` using `fetch()`. Response types and mapping utilities are maintained in separate TypeScript files.

The application searches Reverb using an instrument's brand and model and displays available listing titles, prices, and external links.

These results represent third-party marketplace listings, not a guaranteed appraisal or the instrument owner's sale price.

### Environment Configuration

The optional environment variable is documented in `.env.example`:

`VITE_REVERB_API_URL=https://api.reverb.com/api`

If no environment variable is supplied, the application uses the public Reverb API URL as a fallback.

No API key is required for the public listings integration used in this prototype.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

From the repository root, navigate to the frontend directory:

`cd client`

Install dependencies:

`npm ci`

Start the development server:

`npm run dev`

Vite will display the local development URL, normally `http://localhost:5173/`.

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run lint`    | Run ESLint                           |
| `npm run build`   | Type-check and build the application |
| `npm run preview` | Preview the production build locally |

## Current Limitations

Because this is a frontend-only prototype:

- Personal collections are stored per browser using localStorage.
- Data is not synchronized between devices or users.
- Authentication and account management are not yet implemented.
- Ownership checks are simulated on the client and are not security controls.
- Instrument photo uploads are not yet available.
- Community interactions and public user profiles are not yet implemented.

## Planned Features — Stage 2

The next development stage will introduce:

- Node.js and Express backend.
- MongoDB database and persistent collection records.
- User registration and authentication with JWT.
- Backend-enforced ownership and protected routes.
- Real user profiles and a database-powered Explore feed.
- Instrument photo uploads and cloud image storage.
- Expanded serial number identification functionality.
- Further development of wantlists and trading features.

Future enhancements may include community interactions and more advanced market insights.

## About the Project

GearVault is a TripleTen capstone project developed to demonstrate frontend architecture, reusable React components, TypeScript, client-side data management, third-party API integration, and preparation for a full-stack application.

**Current development stage:** Stage 1 — Frontend Application.
