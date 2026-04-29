# Postman API Documentation Integration

This documentation site now includes comprehensive API documentation powered by Postman collection files and interactive API request cards.

## Features

### 1. Postman Collection Export
- **File**: `/public/api/plywp-api.postman_collection.json`
- **Download**: Users can download the collection directly from the API endpoints page
- **Import**: Import directly into Postman for testing and development
- **Includes**: All Client API and Application API endpoints with:
  - Request headers
  - Query parameters
  - Request body examples
  - Variable placeholders for dynamic values

### 2. OpenAPI 3.0 Schema
- **File**: `/public/api/plywp-api.openapi.json`
- **Standards Compliant**: Full OpenAPI 3.0 specification
- **Use Cases**:
  - Import into other API documentation tools
  - Generate SDKs and client libraries
  - Use with tools like Swagger UI or ReDoc
- **Includes**: Complete schema definitions, security schemes, and example responses

### 3. Interactive API Request Cards
The documentation site features expandable request cards with:
- **HTTP Method Badge**: Colored indicators (GET, POST, PATCH, DELETE, etc.)
- **Endpoint Path**: Clear display of the endpoint with variable placeholders
- **Headers**: All required and optional headers listed
- **Query Parameters**: Parameter details with descriptions
- **Request Body**: JSON formatted request bodies with copy buttons
- **Quick Copy**: One-click copy to clipboard for cURL commands

### 4. API Tester Component
Each endpoint card includes an interactive tester with:
- **Base URL Input**: Change the API base URL (default: http://localhost:5173)
- **Test Request Button**: Send real requests directly from the docs
- **Response Display**: View responses in formatted JSON
- **Error Handling**: Clear error messages if requests fail
- **Copy cURL**: Generate ready-to-use cURL commands

## How to Use

### For End Users

1. **View API Documentation**
   - Navigate to `/docs/api/plyorde/endpoints`
   - Click on any endpoint to expand its details
   - Review headers, parameters, and request bodies

2. **Test Endpoints**
   - Expand any request card
   - Click "Test Request" to send a live request
   - View the response in JSON format
   - Adjust the base URL if using a different server

3. **Copy for Integration**
   - Click "Copy as cURL" for command-line usage
   - Use the Postman collection for Postman application
   - Reference headers and formats in your own code

### For Developers

1. **Import Postman Collection**
   - Download from `/docs/api/plyorde/endpoints`
   - Open Postman → File → Import
   - Select the `.postman_collection.json` file
   - Set up environment variables (api_key, base_url, etc.)

2. **Use OpenAPI Schema**
   - Download from `/public/api/plywp-api.openapi.json`
   - Import into your API documentation tool
   - Use for code generation and SDK development

3. **Integrate with CI/CD**
   - Use the Postman collection for automated testing
   - Run collection tests in your pipeline
   - Validate API changes automatically

## Project Structure

```
/vercel/share/v0-project/
├── public/api/
│   ├── plywp-api.postman_collection.json  # Postman collection
│   └── plywp-api.openapi.json             # OpenAPI specification
├── components/
│   ├── APIRequestCard.tsx                 # Request card renderer
│   ├── APICollection.tsx                  # Collection group renderer
│   └── APITester.tsx                      # Interactive request tester
├── hooks/
│   └── usePostmanCollection.ts            # Hook to load collection
└── app/docs/api/plyorde/
    ├── endpoints/
    │   └── page.tsx                       # Main endpoints page
    └── endpoints.mdx                      # Detailed endpoint docs
```

## API Request Card Features

### Visual Elements
- **Method Badges**: Color-coded HTTP methods (blue=GET, green=POST, orange=PATCH, red=DELETE)
- **Expandable Details**: Click to expand and collapse endpoint details
- **Copy Buttons**: Quick copy buttons for headers and request bodies
- **Code Formatting**: Syntax-highlighted JSON and code snippets

### Functionality
- **Headers Display**: Shows all required headers with variables
- **Query Parameter Documentation**: Lists all parameters with descriptions
- **Request Body Preview**: Formatted JSON for request payloads
- **Quick Copy**: One-click copy for cURL commands
- **Live Testing**: Test endpoints directly from the docs

## Environment Variables

The Postman collection uses these variables:

```json
{
  "base_url": "http://localhost:5173",
  "api_key": "your_api_key_here",
  "admin_token": "your_admin_token_here",
  "site_id": "site_123"
}
```

## Integration Examples

### cURL Command
```bash
curl -X GET "http://localhost:5173/api/client/sites" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### JavaScript Fetch
```javascript
const response = await fetch('http://localhost:5173/api/client/sites', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
```

### Postman
1. Import the collection file
2. Set environment variables
3. Select an endpoint
4. Click "Send"

## Authentication

### Client API
- **Auth Type**: Bearer Token
- **Header**: `Authorization: Bearer {api_key}`
- **Used For**: End-user operations (site management, plugin updates, user management)

### Application API
- **Auth Type**: Bearer Token + API Key
- **Headers**: 
  - `Authorization: Bearer {admin_token}`
  - `X-API-Key: {api_key}`
- **Used For**: Administrative operations (site creation, connector management)

## Testing Workflow

1. **Download Collection**: Get the Postman collection from the docs
2. **Import to Postman**: File → Import → Select `.postman_collection.json`
3. **Configure Environment**: Set up variables for your environment
4. **Test Endpoints**: Select and send requests
5. **View Responses**: Check response data and headers
6. **Use in Development**: Build your integration based on response structure

## Next Steps

- Import the collection into Postman
- Test endpoints against your local/staging environment
- Review the OpenAPI schema for full specification details
- Use the interactive API tester in the documentation
- Reference code examples in your implementation

## Support

For issues or questions about the API:
1. Check the API documentation pages
2. Review the code examples for your language
3. Test endpoints using the interactive tester
4. Refer to the authentication guide
5. Check GitHub repositories for more information
