import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';

export const metadata = {
  title: 'API Reference - PlyWP Documentation',
  description: 'Complete API reference for PlyWP Plyorde daemon and services.',
};

export default function APIPage() {
  return (
    <>
      <Breadcrumb />
      
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="prose">
          <h1>API Reference</h1>
          
          <p className="lead">
            Complete API documentation for PlyWP. Learn how to authenticate, make requests, and integrate with our services.
          </p>

          <h2>Getting Started</h2>
          <p>
            The PlyWP API provides programmatic access to WordPress management functionality. All requests use JSON and are authenticated with API tokens.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <Link href="/docs/api/overview">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-lg m-0">API Overview</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Learn about base URLs, response formats, and getting started.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  Read <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/docs/api/authentication">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-lg m-0">Authentication</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Secure your API requests with tokens and API keys.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  Read <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>

          <h2>Plyorde API</h2>
          <p>
            The Plyorde daemon exposes a RESTful API for managing WordPress sites and services.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <Link href="/docs/api/plyorde/endpoints">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer">
                <h3 className="font-bold mb-2">Endpoints</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Complete endpoint reference with request and response examples.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  View <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/docs/api/plyorde/examples">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer">
                <h3 className="font-bold mb-2">Examples</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Real-world usage examples and code snippets in multiple languages.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  View <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>

          <h2>API Features</h2>

          <h3>Authentication</h3>
          <p>
            Secure all API requests using Bearer tokens or API keys. Learn how to generate, manage, and refresh credentials.
          </p>

          <h3>Rate Limiting</h3>
          <p>
            API requests are limited to 100 per minute per token. Rate limit information is included in response headers.
          </p>

          <h3>Pagination</h3>
          <p>
            List endpoints support pagination with limit and offset parameters for efficient data retrieval.
          </p>

          <h3>Filtering &amp; Sorting</h3>
          <p>
            Filter and sort results using query parameters to get exactly the data you need.
          </p>

          <h3>Error Handling</h3>
          <p>
            Consistent error responses with error codes and messages help you debug and handle errors gracefully.
          </p>

          <h2>Common Endpoints</h2>

          <h3>Sites</h3>
          <ul>
            <li><code>GET /sites</code> - List all sites</li>
            <li><code>POST /sites</code> - Create a new site</li>
            <li><code>GET /sites/{"{id}"}</code> - Get site details</li>
            <li><code>PUT /sites/{"{id}"}</code> - Update a site</li>
            <li><code>DELETE /sites/{"{id}"}</code> - Delete a site</li>
          </ul>

          <h3>Plugins</h3>
          <ul>
            <li><code>GET /sites/{"{site_id}"}/plugins</code> - List plugins</li>
            <li><code>POST /sites/{"{site_id}"}/plugins</code> - Install plugin</li>
            <li><code>PUT /sites/{"{site_id}"}/plugins/{"{id}"}</code> - Update plugin</li>
            <li><code>DELETE /sites/{"{site_id}"}/plugins/{"{id}"}</code> - Delete plugin</li>
          </ul>

          <h3>Users</h3>
          <ul>
            <li><code>GET /sites/{"{site_id}"}/users</code> - List users</li>
            <li><code>POST /sites/{"{site_id}"}/users</code> - Create user</li>
            <li><code>PUT /sites/{"{site_id}"}/users/{"{id}"}</code> - Update user</li>
            <li><code>DELETE /sites/{"{site_id}"}/users/{"{id}"}</code> - Delete user</li>
          </ul>

          <h2>Language SDKs</h2>
          <p>
            Official SDKs are available for popular programming languages. Choose your language and follow the installation instructions.
          </p>

          <h3>Available SDKs</h3>
          <ul>
            <li><strong>JavaScript/Node.js:</strong> <code>npm install plywp-sdk</code></li>
            <li><strong>Python:</strong> <code>pip install plywp-sdk</code></li>
            <li><strong>Go:</strong> <code>go get github.com/plywp/sdk-go</code></li>
            <li><strong>PHP:</strong> <code>composer require plywp/sdk</code></li>
          </ul>

          <h2>API Documentation Structure</h2>
          <p>
            This API documentation is organized as follows:
          </p>

          <h3>Overview</h3>
          <p>
            Introduction to the API, base URLs, response formats, status codes, pagination, and rate limiting.
          </p>

          <h3>Authentication</h3>
          <p>
            Comprehensive guide on authentication methods, token generation, API key management, and security best practices.
          </p>

          <h3>Endpoints</h3>
          <p>
            Complete reference for all available endpoints, including request parameters, response structures, and error codes.
          </p>

          <h3>Examples</h3>
          <p>
            Real-world usage examples, code snippets in multiple languages, and common integration patterns.
          </p>

          <h2>Need Help?</h2>
          <ul>
            <li>Check the [API Overview](/docs/api/overview) for basic information</li>
            <li>Review [Authentication](/docs/api/authentication) for securing requests</li>
            <li>See [Examples](/docs/api/plyorde/examples) for code samples</li>
            <li>Visit [GitHub Issues](https://github.com/plywp/plyorde/issues) for support</li>
          </ul>
        </div>

        <TableOfContents />
      </div>
    </>
  );
}
