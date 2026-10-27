# GearVault — Backend API

**REST API for the GearVault full-stack application.**

The GearVault backend provides authentication, instrument management, and public catalog endpoints for the React frontend.

It is built with Node.js, Express, TypeScript, and MongoDB Atlas.

The API is part of the GearVault Stage 2 capstone project for the TripleTen Software Engineering program.

## Current Status

**Stage 2 — Backend Implemented · Production Release Pending**

The backend supports user registration, authentication, persistent instrument collections, authorization, and public catalog access.

Local development and build checks have been completed.

A Vercel Preview deployment has been tested successfully through its health endpoint. Final production deployment and end-to-end verification are pending.

## Technologies

- Node.js
- Express 5
- TypeScript
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Tokens
- express-rate-limit
- CORS
- dotenv
- tsx
- ESLint
- Vercel

## Features

### User Authentication

The API provides user registration and login.

Features include:

- Registration using name, email, and password.
- Email validation.
- Password hashing with bcrypt.
- Login credential verification.
- JWT generation.
- Protected user profile retrieval.
- Authentication rate limiting.

Passwords are never returned in API responses.

### Instrument Management

Authenticated users can create and manage instrument records.

Each instrument belongs to a specific user.

Supported operations include:

- Create an instrument.
- Retrieve a user's collection.
- Retrieve an individual owned instrument.
- Update instrument information.
- Delete an instrument.

Instrument ownership is enforced by the backend.

### Public Catalog

The API provides public read-only access to instrument records.

Visitors can:

- Retrieve public instrument summaries.
- Retrieve a public instrument by ID.

Public responses select only the fields needed to display instruments and exclude private fields such as serial numbers and owner information.

## Project Structure

The backend source code is organized as follows.

### src/app.ts

Configures the Express application, middleware, routes, MongoDB connection, and HTTP server.

### src/config/

Contains shared constants and API messages.

### src/controllers/

Contains request handlers for authentication and instrument management.

### src/middleware/

Contains authentication and error-handling middleware.

### src/models/

Contains Mongoose schemas for users and instruments.

### src/routes/

Contains authentication routes, instrument routes, and the central route configuration.

### src/types/

Contains TypeScript definitions used by the backend.

## Environment Configuration

The backend uses environment variables for configuration and credentials.

Create the local environment file from the repository root:

    cp server/.env.example server/.env

Configure server/.env:

    PORT=3001
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secure_jwt_secret
    CLIENT_URL=http://localhost:5173

### Environment Variables

**PORT**

The port used by the HTTP server. The local default is 3001.

**MONGO_URI**

The MongoDB Atlas connection string.

**JWT_SECRET**

A strong secret used to sign and verify authentication tokens.

**CLIENT_URL**

The frontend origin allowed by the CORS configuration.

For local development, this normally points to http://localhost:5173.

Never commit real MongoDB credentials, JWT secrets, or environment files to GitHub.

## Getting Started

### Requirements

- Node.js 24 or later
- npm
- MongoDB Atlas
- A MongoDB database user
- Network access to the MongoDB cluster

### Installation

Clone the repository and select the full-stack branch:

    git clone https://github.com/sergioflorean/project-gearvault.git
    cd project-gearvault
    git switch stage-fullstack

Install the backend dependencies:

    npm --prefix server ci

Configure server/.env before starting the API.

### Running Locally

Start the backend from the repository root:

    npm run dev:server

Alternatively, navigate to the server directory and run:

    npm run dev

The API normally runs at:

http://localhost:3001

Check the application status:

    curl http://localhost:3001/health

A successful request returns HTTP 200 and a response indicating that the GearVault server is running.

The server starts listening after establishing a MongoDB connection.

## Available Commands

From the server directory:

- **npm run dev** — Start the development server with tsx.
- **npm run lint** — Run ESLint.
- **npm run build** — Compile TypeScript.
- **npm run start** — Run the compiled application.

From the repository root:

- **npm run dev:server** — Start the backend in development mode.
- **npm run lint** — Check frontend and backend.
- **npm run build** — Build frontend and backend.
- **npm run start:server** — Start the compiled backend.

Build the backend before running the production start command.

## API Endpoints

### Health Check

**GET /health**

Returns the status of the API.

Authentication is not required.

### Authentication

**POST /signup**

Registers a new user.

Required fields:

- name
- email
- password

Passwords must contain at least eight characters.

A successful registration returns HTTP 201 and user information without the password.

**POST /signin**

Authenticates an existing user.

Required fields:

- email
- password

A successful login returns a JWT and basic user information.

The JWT expires after seven days.

**GET /users/me**

Returns information about the currently authenticated user.

Requires a valid JWT.

### Personal Instruments

**GET /api/instruments**

Returns the authenticated user's instruments.

**POST /api/instruments**

Creates an instrument associated with the authenticated user.

Required fields:

- brand
- model
- category

Optional fields include:

- year
- finish
- serialNumber
- imageUrl
- photoUrls
- availability

**GET /api/instruments/:id**

Retrieves a specific instrument belonging to the authenticated user.

**PATCH /api/instruments/:id**

Updates an instrument belonging to the authenticated user.

Only supported instrument fields can be updated.

**DELETE /api/instruments/:id**

Deletes an instrument belonging to the authenticated user.

Returns HTTP 403 when an existing instrument belongs to a different user.

All personal instrument endpoints require authentication.

### Public Explore

**GET /api/explore**

Returns public instrument information.

Authentication is not required.

**GET /api/explore/:id**

Returns the public details of a specific instrument.

Authentication is not required.

Public responses exclude private collection fields.

## Data Models

### User

User documents contain:

- email
- password hash
- name
- createdAt
- updatedAt

Email addresses are normalized to lowercase.

Email uniqueness is enforced through the database model.

Passwords are excluded from queries by default.

### Instrument

Instrument documents contain:

- owner
- brand
- model
- category
- year
- finish
- serialNumber
- imageUrl
- photoUrls
- availability
- addedAt
- createdAt
- updatedAt

Supported categories are:

- guitar
- amp
- pedal

Supported availability values are:

- not_for_sale
- for_sale
- open_to_trade

The owner field references the user associated with the instrument.

Instrument image URLs must use HTTP or HTTPS when provided.

## Authentication and Security

### Password Protection

Passwords are hashed with bcrypt using a cost factor of 10.

The backend stores password hashes rather than plaintext passwords.

### JWT Authentication

Successful login generates a signed JWT containing the user's identifier.

Protected routes require the following request header:

    Authorization: Bearer YOUR_JWT_TOKEN

The authentication middleware verifies the token before allowing the request to continue.

Missing, invalid, or expired tokens return HTTP 401.

### Ownership Authorization

Each instrument is associated with a user.

The backend checks ownership for personal instrument operations.

Users cannot retrieve or modify another user's instruments through the personal collection endpoints.

For individual retrieval and update requests, instruments outside the authenticated user's collection return HTTP 404.

Deleting an existing instrument owned by another user returns HTTP 403.

### Rate Limiting

Registration and login endpoints use express-rate-limit.

The current authentication limit is 10 requests per 15-minute window, applied by the authentication route limiter.

Requests exceeding the limit return HTTP 429.

### Request Validation

The backend validates required fields and supported data types.

Validation includes:

- Required authentication fields.
- Minimum password length.
- Email formatting.
- Instrument category values.
- Instrument data validation.
- MongoDB ObjectId validation.
- Supported update fields.

Invalid request data returns an appropriate HTTP error response.

### Error Handling

The API includes centralized handling for errors and unknown routes.

Common responses include:

- HTTP 400 — Invalid request data.
- HTTP 401 — Missing or invalid authentication.
- HTTP 403 — Forbidden operation.
- HTTP 404 — Resource or route not found.
- HTTP 409 — Email already registered.
- HTTP 429 — Authentication rate limit exceeded.
- HTTP 500 — Unexpected server error.

Unexpected internal errors do not expose server implementation details in the response.

### CORS

The backend uses the CLIENT_URL environment variable to configure the allowed frontend origin.

Production configuration must use the deployed frontend origin.

### MongoDB Connection

The application connects to MongoDB using Mongoose.

The connection uses a maximum pool size of 10.

The HTTP server starts only after MongoDB connection succeeds.

## Development and Testing

### Health Check

Start the backend and verify that GET /health returns HTTP 200.

### Authentication

Verify the following behavior:

1. A new user can register successfully.
2. A registered user can sign in.
3. Invalid credentials are rejected.
4. Missing authentication tokens return HTTP 401.
5. Valid tokens allow access to GET /users/me.
6. Authentication rate limiting returns HTTP 429 when the configured limit is exceeded.

### Instrument Management

Using an authenticated account:

1. Create an instrument.
2. Retrieve the collection.
3. Retrieve the new instrument by ID.
4. Update instrument information.
5. Verify the updated values.
6. Delete the instrument.
7. Verify that it is no longer available.

### Authorization

Verify that:

- Users can access their own collections.
- Users cannot update another user's instruments.
- Users cannot delete another user's instruments.
- Public catalog endpoints remain accessible without authentication.
- Public responses do not expose private fields.

### Code Quality

From the repository root:

    npm run lint
    npm run build

These commands check both frontend and backend.

## Deployment

The backend is prepared for deployment on Vercel.

A protected Preview deployment has been used to verify that the Express application starts successfully and connects to MongoDB Atlas.

### Production Configuration

Production deployment requires:

- A valid MongoDB Atlas connection string.
- A strong JWT secret.
- The correct production frontend origin in CLIENT_URL.
- Appropriate MongoDB network access.
- Verification that sensitive environment values are not exposed publicly.

### Production Verification

After deployment, verify:

1. API health check.
2. Registration and login.
3. JWT validation.
4. Personal collection operations.
5. Ownership restrictions.
6. Public Explore endpoints.
7. Authentication rate limiting.
8. Requests from the deployed React frontend.

The final production API URL will be documented after deployment and verification.

## Current Limitations

- Direct image uploads are not implemented.
- Automatic serial-number decoding is not supported.
- Trading and advanced community features are planned for future releases.
- Final production deployment and end-to-end verification remain pending.

## Related Documentation

Main project documentation:

README.md in the repository root.

Frontend documentation:

client/README.md

Reverb API integration notes:

docs/reverb-api.md

GitHub repository:

https://github.com/sergioflorean/project-gearvault
