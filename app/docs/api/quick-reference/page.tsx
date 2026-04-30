'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Download, FileJson, BookOpen, Zap } from 'lucide-react';

export default function QuickReferencePage() {
  const features = [
    {
      icon: FileJson,
      title: 'Postman Collection',
      description: 'Import the complete API collection into Postman for easy testing and development',
      action: 'Download JSON',
      href: '/api/plywp-api.postman_collection.json',
      color: 'text-orange-400'
    },
    {
      icon: BookOpen,
      title: 'OpenAPI Schema',
      description: 'Full OpenAPI 3.0 specification for code generation and documentation tools',
      action: 'Download OpenAPI',
      href: '/api/plywp-api.openapi.json',
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: 'Interactive Testing',
      description: 'Test API endpoints directly from the documentation with the built-in API tester',
      action: 'View Endpoints',
      href: '/docs/api/plyorde/endpoints',
      color: 'text-blue-400'
    },
    {
      icon: BookOpen,
      title: 'Authentication Guide',
      description: 'Learn about API authentication, tokens, and security best practices',
      action: 'Read Guide',
      href: '/docs/api/authentication',
      color: 'text-purple-400'
    }
  ];

  const endpoints = [
    {
      category: 'Client API',
      description: 'End-user operations for managing WordPress sites',
      endpoints: [
        { name: 'Sites', path: '/api/client/sites' },
        { name: 'Plugins', path: '/api/client/sites/{site_id}/plugins' },
        { name: 'Themes', path: '/api/client/sites/{site_id}/themes' },
        { name: 'Users', path: '/api/client/sites/{site_id}/users' },
        { name: 'File Manager', path: '/api/client/sites/{site_id}/filemanager' }
      ]
    },
    {
      category: 'Application API',
      description: 'Administrative operations for managing PlyWP installation',
      endpoints: [
        { name: 'Sites (Admin)', path: '/api/application/sites' },
        { name: 'Connectors', path: '/api/application/connectors' }
      ]
    }
  ];

  const httpMethods = [
    { method: 'GET', color: 'bg-blue-500/20 text-blue-400', description: 'Retrieve data' },
    { method: 'POST', color: 'bg-green-500/20 text-green-400', description: 'Create or modify data' },
    { method: 'PATCH', color: 'bg-orange-500/20 text-orange-400', description: 'Partial update' },
    { method: 'DELETE', color: 'bg-red-500/20 text-red-400', description: 'Remove data' }
  ];

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'API', href: '/docs/api', isActive: false },
          { label: 'Quick Reference', href: '/docs/api/quick-reference', isActive: true },
        ]}
      />

      <article className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">API Quick Reference</h1>
          <p className="text-xl text-foreground/70">
            Everything you need to get started with the PlyWP API
          </p>
        </div>

        {/* Getting Started Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="border border-border bg-card/50 hover:bg-card/60 transition-colors p-6 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`w-6 h-6 ${feature.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={feature.href}
                    className="inline-block px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {feature.action}
                  </a>
                </Card>
              );
            })}
          </div>
        </section>

        {/* HTTP Methods */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">HTTP Methods</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {httpMethods.map((item, idx) => (
              <Card
                key={idx}
                className="border border-border bg-card/50 p-6 space-y-3"
              >
                <div className={`px-3 py-1 rounded text-sm font-bold w-fit ${item.color}`}>
                  {item.method}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Quick Example</h2>
          <Card className="border border-border bg-card/50 p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">cURL Request</h3>
              <pre className="bg-background rounded p-4 text-xs overflow-x-auto text-foreground/80 font-mono">
{`curl -X GET "http://localhost:5173/api/client/sites" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">JavaScript Fetch</h3>
              <pre className="bg-background rounded p-4 text-xs overflow-x-auto text-foreground/80 font-mono">
{`const response = await fetch(
  'http://localhost:5173/api/client/sites',
  {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);
const data = await response.json();`}
              </pre>
            </div>
          </Card>
        </section>

        {/* Endpoint Categories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Endpoint Categories</h2>
          <div className="space-y-6">
            {endpoints.map((category, idx) => (
              <Card
                key={idx}
                className="border border-border bg-card/50 p-6 space-y-4"
              >
                <div>
                  <h3 className="font-bold text-lg text-foreground">{category.category}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-2">
                  {category.endpoints.map((endpoint, eidx) => (
                    <div
                      key={eidx}
                      className="bg-background/50 rounded p-3 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-foreground">
                          {endpoint.name}
                        </span>
                        <code className="ml-2 text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Authentication */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Authentication</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-border bg-card/50 p-6 space-y-4">
              <div>
                <h3 className="font-bold text-foreground">Client API</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  For end-user operations
                </p>
              </div>
              <pre className="bg-background rounded p-3 text-xs font-mono text-foreground/80 overflow-x-auto">
{`Authorization: Bearer {api_key}`}
              </pre>
            </Card>
            <Card className="border border-border bg-card/50 p-6 space-y-4">
              <div>
                <h3 className="font-bold text-foreground">Application API</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  For administrative operations
                </p>
              </div>
              <pre className="bg-background rounded p-3 text-xs font-mono text-foreground/80 overflow-x-auto">
{`Authorization: Bearer {admin_token}
X-API-Key: {api_key}`}
              </pre>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/docs/api/authentication"
              className="block p-6 bg-card/50 border border-border rounded-lg hover:bg-card/60 transition-colors"
            >
              <h3 className="font-bold text-foreground mb-2">Authentication Guide</h3>
              <p className="text-sm text-muted-foreground">
                Learn about API keys, tokens, and security
              </p>
            </a>
            <a
              href="/docs/api/plyorde/endpoints"
              className="block p-6 bg-card/50 border border-border rounded-lg hover:bg-card/60 transition-colors"
            >
              <h3 className="font-bold text-foreground mb-2">Full Endpoints</h3>
              <p className="text-sm text-muted-foreground">
                Explore all endpoints with interactive testing
              </p>
            </a>
            <a
              href="/docs/api/plyorde/examples"
              className="block p-6 bg-card/50 border border-border rounded-lg hover:bg-card/60 transition-colors"
            >
              <h3 className="font-bold text-foreground mb-2">Code Examples</h3>
              <p className="text-sm text-muted-foreground">
                Examples in multiple programming languages
              </p>
            </a>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-6 border-t border-border pt-8">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <ol className="space-y-4 text-foreground/80">
            <li className="flex gap-4">
              <span className="font-bold text-accent flex-shrink-0">1</span>
              <div>
                <p className="font-medium">Download the Postman Collection</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Get the complete collection for use in Postman or other API tools
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent flex-shrink-0">2</span>
              <div>
                <p className="font-medium">Import to Your Preferred Tool</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use Postman, Insomnia, VS Code REST Client, or curl
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent flex-shrink-0">3</span>
              <div>
                <p className="font-medium">Configure Authentication</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Set up API keys and environment variables
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-accent flex-shrink-0">4</span>
              <div>
                <p className="font-medium">Start Making API Calls</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use the endpoints to manage your WordPress sites
                </p>
              </div>
            </li>
          </ol>
        </section>
      </article>
    </>
  );
}
