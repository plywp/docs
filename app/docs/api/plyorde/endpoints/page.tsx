'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { APICollection } from '@/components/APICollection';
import { usePostmanCollection } from '@/hooks/usePostmanCollection';
import { Spinner } from '@/components/ui/spinner';

export default function EndpointsPage() {
  const { collection, loading, error } = usePostmanCollection(
    '/api/plywp-api.postman_collection.json'
  );

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'API', href: '/docs/api', isActive: false },
          { label: 'Endpoints', href: '/docs/api/plyorde/endpoints', isActive: true },
        ]}
      />
      
      <article className="space-y-12">
        <div className="space-y-4">
          <h1>API Endpoints</h1>
          <p className="text-lg text-foreground/70">
            Complete reference for all PlyWP API endpoints. Expand each endpoint to view details, headers, query parameters, and request bodies. Click the method badge to see the HTTP verb.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Spinner className="w-6 h-6" />
            <span className="ml-3 text-muted-foreground">Loading API endpoints...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <h3 className="font-bold text-red-400 mb-2">Error Loading Collection</h3>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {collection && <APICollection collection={collection} />}

        <div className="border-t border-border pt-8 space-y-6">
          <h2>Getting Started</h2>
          <div className="space-y-4">
            <div className="bg-card/50 border border-border rounded-lg p-6 space-y-3">
              <h3 className="font-bold">Export Collection</h3>
              <p className="text-sm text-muted-foreground">
                You can import this collection directly into Postman for testing:
              </p>
              <a
                href="/api/plywp-api.postman_collection.json"
                className="inline-block px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Download Postman Collection
              </a>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-6 space-y-3">
              <h3 className="font-bold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Client API endpoints require <code className="bg-background/50 px-2 py-1 rounded text-xs">Authorization: Bearer API_KEY</code> header.
                Application API endpoints require both Bearer token and <code className="bg-background/50 px-2 py-1 rounded text-xs">X-API-Key</code> header.
              </p>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-6 space-y-3">
              <h3 className="font-bold">Base URLs</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  Client API: <code className="bg-background/50 px-2 py-1 rounded text-xs">http://localhost:5173/api/client</code>
                </li>
                <li>
                  Application API: <code className="bg-background/50 px-2 py-1 rounded text-xs">http://localhost:5173/api/application</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
