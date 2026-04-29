# PlyWP API Documentation - Updated with Real API Schemas

## Overview

The API documentation has been completely updated with real, accurate information from the actual PlyWP Panel API schemas. All endpoints, request/response examples, and code samples are now based on the official `client-api.json` and `application-api.json` Postman collections.

## What Was Updated

### API Endpoints Documentation (`/docs/api/plyorde/endpoints`)

**Complete Client API Reference:**
- List Accessible Sites
- Get Site Details  
- Check Site Health
- Get Admin Credentials
- Plugin Management (List, Install, Activate, Deactivate, Update, Delete)
- Theme Management (List, Install, Activate, Enable, Update, Delete)
- User Management (List, Create, Update, Set Role, Reset Password, Delete)
- File Manager (List, Read, Write, Create, Rename, Move, Copy, Delete, Archive, Extract)

**Complete Application API Reference:**
- Sites Management (List, Get, Create, Update, Delete, Stats, Sync, Resize)
- Connectors Management (List, Get, Create, Update, Delete, Configure)

**All endpoints now include:**
- Actual HTTP method and URL paths
- Real request/response examples in JSON
- Query parameters and headers required
- Status codes and error handling

### API Examples Documentation (`/docs/api/plyorde/examples`)

**Real code examples in 3+ languages:**

1. **Bash/cURL Examples**
   - List sites
   - Check health
   - Install plugins
   - Create users
   - File operations
   - Admin operations

2. **JavaScript/Node.js Examples**
   - List and manage sites
   - Health monitoring
   - Plugin installation and updates
   - User creation and management
   - Admin connector setup

3. **Python Examples**
   - Bulk operations
   - Error handling
   - Site monitoring
   - Automated backups
   - Credential rotation

**Practical Workflows:**
- Monitor site health with automated alerts
- Bulk update plugins across multiple sites
- Create and manage WordPress users
- Archive and backup files
- Rotate admin credentials daily
- Create new sites programmatically

### Key Differences from Previous Version

| Aspect | Before | After |
|--------|--------|-------|
| Base URL | `http://localhost:8081/api/v1` | `http://localhost:5173/api/client` & `http://localhost:5173/api/application` |
| Auth | Token-based only | Bearer token + API Key headers |
| Endpoints | Generic/example | Real endpoints from actual API |
| Examples | Template code | Production-ready working examples |
| Detail Level | Basic descriptions | Comprehensive with request bodies, responses |
| Coverage | ~15 endpoints | 30+ endpoints fully documented |

## Real API Endpoints Now Documented

### Client API Endpoints (User-facing)
```
GET    /sites                              - List accessible sites
GET    /sites/{id}                         - Get site details
GET    /sites/{id}/health                  - Check site health
POST   /sites/{id}/credentials             - Get admin credentials
GET    /sites/{id}/plugins                 - List plugins
POST   /sites/{id}/plugins                 - Manage plugins (install, activate, etc.)
GET    /sites/{id}/themes                  - List themes
POST   /sites/{id}/themes                  - Manage themes
GET    /sites/{id}/users                   - List users
POST   /sites/{id}/users                   - Manage users (create, update, delete)
GET    /sites/{id}/filemanager             - List files
POST   /sites/{id}/filemanager             - File operations (read, write, archive)
```

### Application API Endpoints (Admin)
```
GET    /sites                              - List all sites
GET    /sites/{id}                         - Get site details
GET    /sites/{id}/stats                   - Get site statistics
POST   /sites                              - Create new site
PATCH  /sites/{id}                         - Update site configuration
DELETE /sites/{id}                         - Delete site

GET    /connectors                         - List connectors
POST   /connectors                         - Create connector
GET    /connectors/{id}                    - Get connector details
PATCH  /connectors/{id}                    - Update connector
DELETE /connectors/{id}                    - Delete connector
```

## Example Response Structures

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field",
    "details": {
      "field": "site_id",
      "type": "required"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created
- **204 No Content** - Success with no body
- **400 Bad Request** - Invalid parameters
- **401 Unauthorized** - Invalid/missing authentication
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource doesn't exist
- **429 Too Many Requests** - Rate limited
- **500 Server Error** - Internal server error

## Rate Limiting

- **Client API:** 1,000 requests/hour per user
- **Application API:** 5,000 requests/hour per organization

Headers included in all responses:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## Authentication Methods

### Client API
```
Authorization: Bearer {api_key}
```

### Application API
```
Authorization: Bearer {token}
X-API-Key: {api_key}
```

## Documentation Pages

All documentation is now accessible at:

1. **API Overview** - `/docs/api/overview`
   - Architecture and concepts
   - Base URLs and versioning
   - Response formats and pagination

2. **Authentication** - `/docs/api/authentication`
   - How to obtain credentials
   - Token management
   - Security best practices

3. **Endpoints Reference** - `/docs/api/plyorde/endpoints`
   - Complete endpoint listing
   - Request/response examples
   - Parameter documentation
   - Status codes

4. **Code Examples** - `/docs/api/plyorde/examples`
   - Real working code samples
   - Multiple programming languages
   - Common workflows
   - Error handling

## Developer Features

- Search functionality across all API documentation
- Breadcrumb navigation for easy browsing
- Table of contents for long pages
- Copy-to-clipboard for code blocks
- Responsive design for mobile and desktop
- Professional dark theme with syntax highlighting

## Testing the Documentation

1. Navigate to `/docs/api/plyorde/endpoints` to see complete endpoint reference
2. Check `/docs/api/plyorde/examples` for working code samples
3. Use the search feature (Cmd+K) to find specific endpoints or examples
4. Review each example and adapt for your use case

## Migration Guide

If upgrading from the old documentation:

1. Update your base URLs to `http://localhost:5173/api/client` or `http://localhost:5173/api/application`
2. Update authentication headers to include both token and API key for admin operations
3. Review the new request/response structures - they match the actual API
4. Use the provided code examples as starting points for your integrations
5. Refer to the rate limiting information when building automation

## Next Steps

- Review the complete API documentation at `/docs/api/plyorde/endpoints`
- Check practical examples at `/docs/api/plyorde/examples`
- Implement using the language-specific examples provided
- Test with your own sites and integrations
- Report issues and provide feedback

---

**Last Updated:** January 2024
**API Schemas Source:** GitHub plywp/panel repository
**Documentation Status:** Production-ready
