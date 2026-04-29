# API Documentation System

This project features a comprehensive API documentation system built with Postman collections and interactive rendering components.

## Overview

The API documentation site includes:
- **Postman Collection Format** - Industry-standard API specification
- **OpenAPI 3.0 Schema** - Complete API schema for tooling integration
- **Interactive API Cards** - Expandable, detailed endpoint documentation
- **Live Request Tester** - Test endpoints directly from the docs
- **One-Click Copy** - cURL commands and request details

## Files Created

### 1. Postman Collection
**Location**: `/public/api/plywp-api.postman_collection.json`

A complete Postman collection containing:
- All Client API endpoints (site, plugin, theme, user, file management)
- All Application API endpoints (admin operations)
- Request/response examples
- Authentication headers
- Environment variables
- Query parameters and request bodies

**Use Cases**:
- Import directly into Postman
- Use with Postman CLI for testing
- Generate SDKs from the collection
- Share with team members

### 2. OpenAPI Schema
**Location**: `/public/api/plywp-api.openapi.json`

Full OpenAPI 3.0 specification with:
- Complete endpoint definitions
- Security scheme definitions
- Schema components and models
- Request/response examples
- Parameter documentation

**Use Cases**:
- Generate client libraries
- Use with Swagger UI or ReDoc
- Import into API management tools
- Code generation tools

### 3. Component Library

#### APIRequestCard.tsx
Displays a single API endpoint with:
- HTTP method badge (color-coded)
- Endpoint path with variables
- Headers with copy buttons
- Query parameters with descriptions
- Request body with JSON formatting
- Copy to clipboard functionality
- Built-in API tester

#### APICollection.tsx
Renders an entire API collection with:
- Grouped endpoints by category
- Expandable/collapsible groups
- Nested request cards
- Full collection information

#### APITester.tsx
Interactive request testing component with:
- Base URL input field
- Live request execution
- Response display
- Error handling
- cURL command generation
- Copy functionality

### 4. Hook: usePostmanCollection
**Location**: `/hooks/usePostmanCollection.ts`

Custom React hook for loading Postman collections:
- Fetches collection JSON files
- Handles loading states
- Error handling
- Memoization friendly

## Pages

### Endpoints Page
**Location**: `/app/docs/api/plyorde/endpoints/page.tsx`

Features:
- Loads Postman collection from public folder
- Renders API cards with interactive tester
- Download link for Postman collection
- Authentication guide
- Base URL documentation

### Quick Reference Page
**Location**: `/app/docs/api/quick-reference/page.tsx`

Features:
- Getting started section with download links
- HTTP methods reference
- Quick code examples (cURL, JavaScript)
- Endpoint categories
- Authentication information
- Next steps guide

## Usage

### For End Users

1. **View Documentation**
   ```
   Navigate to /docs/api/plyorde/endpoints
   ```

2. **Test Endpoints**
   - Click on any endpoint to expand
   - Click "Test Request" button
   - View response in real-time
   - Adjust base URL as needed

3. **Copy Code**
   - Click "Copy as cURL" for command-line usage
   - Headers and parameters are pre-filled
   - Ready to use in your terminal

### For Developers

1. **Download Collection**
   ```
   GET /api/plywp-api.postman_collection.json
   ```

2. **Import to Postman**
   - File → Import
   - Select the .postman_collection.json file
   - Set environment variables
   - Start testing

3. **Use OpenAPI Schema**
   ```
   GET /api/plywp-api.openapi.json
   ```
   - Generate SDKs
   - Use with documentation tools
   - Import to API management systems

## Architecture

### Data Flow

```
Postman Collection (JSON)
        ↓
usePostmanCollection Hook (fetches & loads)
        ↓
APICollection Component (renders groups)
        ↓
APIRequestCard Component (renders endpoints)
        ↓
APITester Component (interactive testing)
```

### Component Hierarchy

```
EndpointsPage
├── Breadcrumb
├── ArticleContent
│   ├── Title & Description
│   ├── Loading State
│   ├── Error Handling
│   ├── APICollection
│   │   └── APIRequestCard[]
│   │       └── APITester
│   └── Getting Started Section
└── Links to Resources
```

## API Endpoints Documented

### Client API
- `GET /api/client/sites` - List sites
- `GET /api/client/sites/{site_id}` - Get site details
- `GET /api/client/sites/{site_id}/health` - Site health status
- `POST /api/client/sites/{site_id}/credentials` - Get admin credentials
- `GET /api/client/sites/{site_id}/plugins` - List plugins
- `POST /api/client/sites/{site_id}/plugins` - Manage plugins
- `GET /api/client/sites/{site_id}/themes` - List themes
- `POST /api/client/sites/{site_id}/themes` - Manage themes
- `GET /api/client/sites/{site_id}/users` - List users
- `POST /api/client/sites/{site_id}/users` - Manage users
- `GET /api/client/sites/{site_id}/filemanager` - List files
- `POST /api/client/sites/{site_id}/filemanager` - Read/manage files

### Application API (Admin)
- `GET /api/application/sites` - List all sites
- `POST /api/application/sites` - Create site
- `GET /api/application/sites/{site_id}` - Get site
- `PATCH /api/application/sites/{site_id}` - Update site
- `DELETE /api/application/sites/{site_id}` - Delete site
- `GET /api/application/connectors` - List connectors
- `POST /api/application/connectors` - Create connector

## Environment Variables (Postman)

The collection uses these variables:

```json
{
  "base_url": "http://localhost:5173",
  "api_key": "your_api_key_here",
  "admin_token": "your_admin_token_here",
  "site_id": "site_123"
}
```

## Authentication

### Client API
```
Authorization: Bearer {api_key}
```

### Application API
```
Authorization: Bearer {admin_token}
X-API-Key: {api_key}
```

## Features

### Interactive Testing
- Test endpoints without leaving the docs
- Real response data in real-time
- Error handling and display
- Base URL customization

### Copy to Clipboard
- Copy headers individually
- Copy request bodies
- Generate cURL commands
- One-click copy with visual feedback

### Search & Navigation
- Grouped by API type (Client/Application)
- Expandable categories
- Quick reference page
- Breadcrumb navigation

### Export & Integration
- Download Postman collection
- Download OpenAPI schema
- Use with external tools
- Share with team

## Code Examples

### Loading the Collection (React)

```tsx
import { usePostmanCollection } from '@/hooks/usePostmanCollection';
import { APICollection } from '@/components/APICollection';

export default function APIPage() {
  const { collection, loading, error } = usePostmanCollection(
    '/api/plywp-api.postman_collection.json'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <APICollection collection={collection} />;
}
```

### Using APIRequestCard Directly

```tsx
<APIRequestCard
  name="List Sites"
  description="Get all sites accessible to the user"
  method="GET"
  endpoint="/api/client/sites"
  headers={[
    { key: 'Authorization', value: 'Bearer {{api_key}}' }
  ]}
  body={null}
/>
```

### Testing via cURL

```bash
curl -X GET "http://localhost:5173/api/client/sites" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Styling & Customization

All components use Tailwind CSS and design tokens:
- Color scheme from globals.css
- Responsive design (mobile-first)
- Dark mode support
- Accessible components

Colors used:
- `bg-card` - Card backgrounds
- `bg-background` - Page backgrounds
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `bg-accent` - Action buttons
- `border-border` - Borders

## Performance

- Collection loaded client-side (no server API needed)
- Static JSON files
- Lazy loading of endpoint details
- Efficient re-rendering
- No unnecessary network requests

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- Add request/response schema validation
- Persist test results
- Share request collections
- Add WebSocket support
- Webhook testing
- API mocking
- Performance testing
- Load testing UI

## Troubleshooting

### Collection Not Loading
1. Check browser console for errors
2. Verify `/public/api/plywp-api.postman_collection.json` exists
3. Check CORS headers if cross-origin

### Test Request Failing
1. Verify base URL is correct
2. Check API key in environment
3. Verify endpoint exists on target server
4. Check network tab for actual error

### Styling Issues
1. Check that globals.css is imported
2. Verify Tailwind CSS is configured
3. Clear browser cache
4. Check dark mode settings

## Related Documentation

- [Postman Collection Docs](https://learning.postman.com/docs/collections/collections-overview/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [API Best Practices](/docs/api/authentication)
- [Code Examples](/docs/api/plyorde/examples)

## Support

For issues or questions:
1. Check the API documentation pages
2. Review code examples
3. Test with the interactive tester
4. Check the GitHub repository
5. Open an issue with details
