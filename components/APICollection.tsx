'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { APIRequestCard } from './APIRequestCard';

interface APIRequest {
  name: string;
  request: {
    method: string;
    header?: Array<{
      key: string;
      value: string;
      type?: string;
    }>;
    url: {
      raw: string;
      host?: string[];
      path?: string[];
      query?: Array<{
        key: string;
        value: string;
        description?: string;
      }>;
    };
    body?: {
      mode: string;
      raw: string;
    };
    description?: string;
  };
  response?: unknown[];
}

interface APIGroup {
  name: string;
  description?: string;
  item?: APIRequest[];
}

interface APICollectionProps {
  collection: {
    info: {
      name: string;
      description?: string;
    };
    item: APIGroup[];
  };
}

export function APICollection({ collection }: APICollectionProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set()
  );

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{collection.info.name}</h2>
        {collection.info.description && (
          <p className="text-lg text-foreground/70">
            {collection.info.description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {collection.item.map((group, groupIdx) => {
          const groupId = `${group.name}-${groupIdx}`;
          const hasNestedItems = group.item && group.item.length > 0;

          return (
            <div key={groupIdx} className="space-y-4">
              {hasNestedItems ? (
                <>
                  <button
                    onClick={() => toggleGroup(groupId)}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-colors border border-border"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-foreground">
                        {group.name}
                      </h3>
                      {group.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {group.description}
                        </p>
                      )}
                    </div>
                    {expandedGroups.has(groupId) ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedGroups.has(groupId) && (
                    <div className="pl-4 space-y-3 border-l-2 border-border">
                      {renderEndpoints(group.item)}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  {renderEndpoints(group.item || [])}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderEndpoints(items: any[]): React.ReactNode[] {
  return items.map((item, idx) => {
    // If item has nested items and no request, it's a group
    if (item.item && !item.request) {
      return (
        <div key={idx} className="space-y-3 ml-4 border-l-2 border-border pl-4">
          <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
          {renderEndpoints(item.item)}
        </div>
      );
    }

    // Skip items without requests
    if (!item.request) {
      return null;
    }

    // Handle requests with safe URL access
    const urlData = item.request.url;
    if (!urlData) {
      console.warn(`[v0] Endpoint "${item.name}" has no URL data`);
      return null;
    }

    const endpoint = typeof urlData === 'string' ? urlData : (urlData.raw || '');
    if (!endpoint) {
      console.warn(`[v0] Endpoint "${item.name}" has no raw URL`);
      return null;
    }

    const cleanEndpoint = endpoint
      .replace(/\{\{[^}]+\}\}/g, (match: string) => `:${match.slice(2, -2)}`)
      .split('?')[0];

    return (
      <APIRequestCard
        key={idx}
        name={item.name}
        description={item.request.description}
        method={item.request.method}
        endpoint={cleanEndpoint}
        headers={item.request.header || []}
        queryParams={urlData.query || []}
        body={item.request.body?.raw}
      />
    );
  }).filter(Boolean);
}
