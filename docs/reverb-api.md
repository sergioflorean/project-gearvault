# Reverb API Integration

## Endpoint

`GET https://api.reverb.com/api/listings`

## Required headers

Accept: application/hal+json
Accept-Version: 3.0

## Authentication

Public listing searches were successfully tested without an authentication token.

HTTP response: `200 OK`

No personal API token is required for the tested public search endpoint.

## Search parameters

- `query`: Search for a brand and model.
- `per_page`: Limit the number of returned listings.

Example:

https://api.reverb.com/api/listings?query=Gibson+Les+Paul+Junior&per_page=3

## Response structure

The tested response contains:

- `total`: Total number of matching listings.
- `listings`: Array of listing objects.

Useful listing fields:

- `id`: Reverb listing identifier.
- `title`: Listing title.
- `make`: Instrument brand.
- `model`: Instrument model.
- `year`: Manufacturing year when available.
- `price.amount`: Listed price as a string.
- `price.currency`: Price currency.
- `_links.web`: Public listing link information.

## Test results

- Browser `fetch()` request: successful.
- CORS: confirmed working for the tested request.
- Authentication: not required for public listing search.
- Search query: `Gibson Les Paul Junior`.
- Total matching results during test: 2,493.
- Requested results per page: 3.

## Important considerations

Search results may include accessories or instruments that do not exactly match the requested model.

GearVault should filter irrelevant listings before displaying market information.

Listed prices represent seller asking prices, not verified instrument valuations.

## Integration strategy

GearVault will use `fetch()` from the React frontend to retrieve public listings without exposing personal API credentials.

The API integration will be implemented in `client/src/utils/reverbApi.ts`.

API responses will be transformed into GearVault's existing `GearMarketData` structure.
