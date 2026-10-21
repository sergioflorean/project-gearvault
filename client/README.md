# GearVault — Frontend

**Catalog your gear. Discover its story.**

GearVault is a web application designed for guitarists and music gear enthusiasts to explore, organize, and manage collections of guitars, amplifiers, and effects pedals.

This frontend was developed as **Stage 1 of the TripleTen Software Engineering capstone project**.

The application is built with React, TypeScript, Vite, and Material UI.

## Live Application

**[View GearVault on Vercel](https://gearvault-olive.vercel.app)**

The frontend is deployed on Vercel with support for React Router navigation.

## Technologies

- React 19
- TypeScript
- Vite
- Material UI (MUI)
- React Router
- Emotion (CSS-in-JS)
- Browser localStorage
- Reverb API
- Vercel

## Implemented Features — Stage 1

### Explore

- Browse a predefined catalog of guitars, amplifiers, and effects pedals.
- Search instruments by brand, model, category, or finish.
- Filter instruments by category.
- Open detailed instrument pages.
- Display instrument photographs.
- View instruments added to the current user's local collection.

### Gear Detail

- View available instrument specifications and identification information.
- Display instrument photographs or fallback placeholders.
- View instrument availability: Not for Sale, For Sale, or Open to Trade.
- Edit or delete instruments owned by the simulated current user.
- Retrieve live third-party marketplace listings from Reverb.
- Display loading, empty, and error states for API requests.
- View marketplace prices and external listing links.
- Expand or collapse marketplace results.

### Market Price Reference

GearVault uses comparable Reverb marketplace listings to provide an estimated market price reference.

The feature:

- Calculates the median asking price from comparable listings.
- Displays a reference price range.
- Avoids combining prices from different currencies.
- Requires at least three comparable listings before displaying an estimate.
- Hides estimates when insufficient comparable data is available.

**Important:** Market Price Reference uses active listing prices, not confirmed sale prices. It should not be interpreted as a professional appraisal or guaranteed market value.

### My Collection

- Add guitars, amplifiers, and effects pedals.
- Edit and delete saved instruments.
- Save instrument details, including brand, model, year, finish, availability, and optional serial number.
- Add an optional instrument photograph using an image URL.
- Edit, replace, or remove existing image URLs.
- Display photographs in My Collection, Explore, and Gear Detail.
- Display placeholders when no image is available.
- Store collection data in browser localStorage.
- Preserve collection data after refreshing the page.
- Display collection statistics by category.
- Show newly created instruments first.

### Navigation

- React Router handles navigation between application pages.
- Explore, My Collection, Gear Detail, and About are implemented.
- Additional routes provide placeholders for features planned for later development.
- Responsive layouts support desktop and mobile navigation.

## How the Explore Demo Works

**Stage 1 does not include a backend, user authentication, or a shared database.**

To demonstrate how a future community feed will work, GearVault temporarily combines two sources of instrument data:

1. **Demo catalog:** `src/utils/mockGear.ts` contains predefined instruments representing example community content.
2. **Personal collection:** `src/utils/collectionStorage.ts` saves instruments created by the current user in browser localStorage.

The `getExploreGear()` function in `src/utils/exploreGear.ts` converts personal collection entries into the shared `GearPreview` structure and combines them with the demo catalog.

This allows both sources to use the same `GearCard` and `GearDetail` components.

In Stage 1, newly added instruments automatically appear in Explore. However, they are visible only within the current browser's local data, not to other users on different devices.

The public preview mapping excludes personal collection fields such as serial numbers.

**This is an intentional frontend-only demonstration of the planned community experience, not a completed multi-user feed.**

In Stage 2, this data flow will be replaced by an authenticated backend and persistent database records.

## Instrument Photos

The predefined demo instruments include image assets so visitors can explore a visual catalog.

Personal instrument records support optional image references through the `photoUrls` field.

### Adding Instrument Photos

When creating or editing an instrument:

1. Navigate to **My Collection**.
2. Select **Add Instrument** or edit an existing instrument.
3. Enter the instrument information.
4. Optionally paste a direct image URL into the Image URL field.
5. Save the instrument.

The photograph will be displayed in My Collection, Explore, and Gear Detail.

Users can also replace or remove an existing image URL when editing an instrument.

If no image is provided, a placeholder is displayed.

### Current Photo Limitations

Stage 1 supports images through externally hosted URLs.

Direct image uploads from the user's device are not implemented yet.

**Stage 2 will introduce:**

- Uploading photographs directly from a device.
- Storing images through a cloud media service.
- Saving image references with persistent backend records.
- Managing uploaded photographs through authenticated user accounts.

This separates the frontend image demonstration from the complete image-storage implementation planned for the full-stack application.

## Reverb API Integration

GearVault retrieves live third-party marketplace listings using the Reverb API.

API requests are implemented in `src/utils/reverbApi.ts` using `fetch()`.

Response types and mapping utilities are maintained in separate TypeScript files.

The application searches Reverb using instrument information such as brand, model, and category.

Available results include:

- Listing titles.
- Asking prices.
- Currency information.
- External links to Reverb listings.

The interface handles:

- Loading states while requests are in progress.
- Error messages when requests fail.
- Empty states when no listings are found.
- Expandable marketplace results.
- Market price references when sufficient comparable listings are available.

Third-party marketplace data is used for informational purposes.

### Environment Configuration

The optional environment variable is documented in `.env.example`:

VITE_REVERB_API_URL=https://api.reverb.com/api

If no environment variable is supplied, the application uses the public Reverb API URL as its fallback.

No API key is required for the public listings integration used in this prototype.

The `.env` file is excluded from version control.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

From the repository root, navigate to the frontend directory:

cd client

Install dependencies:

npm ci

Start the development server:

npm run dev

Vite will display the local development URL, normally:

http://localhost:5173/

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run lint`    | Run ESLint                           |
| `npm run build`   | Type-check and build the application |
| `npm run preview` | Preview the production build locally |

## Testing the Application

The following steps can be used to review the Stage 1 functionality.

### My Collection

1. Navigate to My Collection.
2. Add a new instrument with its brand, model, category, and other details.
3. Optionally include an instrument image URL.
4. Verify that the instrument appears in My Collection.
5. Open Gear Detail and verify the saved information.
6. Edit the instrument and update its details or photograph.
7. Confirm that the instrument appears in Explore.
8. Refresh the browser and verify that the instrument remains saved.
9. Delete the instrument and confirm its removal.

### Reverb Marketplace

1. Open an instrument from Explore.
2. Navigate to its marketplace information.
3. Verify that loading feedback appears while requesting data.
4. Review the available Reverb listings.
5. Open a listing using its external link.
6. Check the Market Price Reference when sufficient comparable results exist.
7. Verify that empty or error states display appropriate feedback when applicable.

### Responsive Layout

Test the application on desktop and mobile screen sizes, including a viewport width of 320px.

Verify that:

- Navigation remains usable.
- Content adapts to the available screen width.
- Instrument cards and forms remain readable.
- Interactive controls remain accessible.
- No unwanted horizontal scrolling occurs.

## Current Limitations

Because Stage 1 is a frontend-only prototype:

- Personal collections are stored per browser using localStorage.
- Data is not synchronized between devices or users.
- Authentication and account management are not yet implemented.
- Ownership checks are simulated on the client and are not security controls.
- Instrument photos require image URLs rather than direct file uploads.
- Community interactions and public user profiles are not yet implemented.
- Market price references are based on active asking prices rather than confirmed completed sales.
- Marketplace availability and returned results depend on the third-party Reverb API.

## Planned Features — Stage 2

The next development stage will introduce:

- Node.js and Express backend.
- MongoDB database and persistent collection records.
- User registration and authentication with JWT.
- Backend-enforced ownership and protected routes.
- Persistent collections synchronized across devices.
- Real user profiles and a database-powered Explore feed.
- Instrument photo uploads and cloud image storage.
- Expanded serial number identification functionality.
- Further development of wantlists and trading features.

Future enhancements may include community interactions and more advanced market insights.

## About the Project

GearVault is a TripleTen capstone project developed to demonstrate frontend architecture, reusable React components, TypeScript, client-side data management, third-party API integration, and preparation for a full-stack application.

**Current development stage:** Stage 1 — Frontend Application (Completed).

**Live Application:** https://gearvault-olive.vercel.app

**Repository:** https://github.com/sergioflorean/project-gearvault

**Stage 1 Pull Request:** https://github.com/sergioflorean/project-gearvault/pull/34
