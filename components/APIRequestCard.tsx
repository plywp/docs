'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { APITester } from './APITester';

interface QueryParam {
  key: string;
  value: string;
  description?: string;
}

interface Header {
  key: string;
  value: string;
  type?: string;
}

interface APIRequestCardProps {
  name: string;
  description?: string;
  method: string;
  endpoint: string;
  headers?: Header[];
  queryParams?: QueryParam[];
  body?: string;
}

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  POST: { bg: 'bg-green-500/20', text: 'text-green-400' },
  PATCH: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  PUT: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  DELETE: { bg: 'bg-red-500/20', text: 'text-red-400' },
  HEAD: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
};

export function APIRequestCard({
  name,
  description,
  method,
  endpoint,
  headers = [],
  queryParams = [],
  body,
}: APIRequestCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const colors = methodColors[method] || methodColors.GET;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <Card className="border border-border bg-card/50 hover:bg-card/60 transition-colors">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${colors.bg} ${colors.text}`}
              >
                {method}
              </span>
              <h3 className="text-lg font-bold text-foreground">{name}</h3>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mb-2">{description}</p>
            )}
            <code className="text-xs bg-background/50 px-3 py-1.5 rounded block w-fit font-mono text-foreground/80">
              {endpoint}
            </code>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            {expanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-6 py-6 space-y-6">
          {/* Headers Section */}
          {headers.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <span>Headers</span>
                <span className="text-xs text-muted-foreground font-normal">
                  ({headers.length})
                </span>
              </h4>
              <div className="space-y-2">
                {headers.map((header, idx) => (
                  <div
                    key={idx}
                    className="bg-background/50 rounded p-3 flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 font-mono text-xs">
                      <div className="text-foreground/70">
                        <span className="text-accent font-bold">{header.key}</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-foreground">{header.value}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        copyToClipboard(`${header.key}: ${header.value}`, `header-${idx}`)
                      }
                    >
                      {copiedSection === `header-${idx}` ? (
                        <Check className="w-3 h-3 text-accent" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Query Parameters Section */}
          {queryParams.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <span>Query Parameters</span>
                <span className="text-xs text-muted-foreground font-normal">
                  ({queryParams.length})
                </span>
              </h4>
              <div className="space-y-2">
                {queryParams.map((param, idx) => (
                  <div key={idx} className="bg-background/50 rounded p-3">
                    <div className="font-mono text-xs mb-1">
                      <span className="text-accent font-bold">{param.key}</span>
                      <span className="text-muted-foreground">: </span>
                      <span className="text-foreground">{param.value}</span>
                    </div>
                    {param.description && (
                      <p className="text-xs text-muted-foreground">
                        {param.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body Section */}
          {body && (
            <div>
              <h4 className="font-bold text-sm text-foreground mb-3">Request Body</h4>
              <div className="bg-background/50 rounded p-4 font-mono text-xs overflow-x-auto relative">
                <pre className="text-foreground/80">
                  {typeof body === 'string'
                    ? body
                    : JSON.stringify(JSON.parse(body), null, 2)}
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => copyToClipboard(body, 'body')}
                >
                  {copiedSection === 'body' ? (
                    <Check className="w-3 h-3 text-accent" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Quick Copy Section */}
          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-sm text-foreground mb-3">Quick Copy</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => {
                  const curl = `curl -X ${method} "${endpoint}"${
                    headers.length
                      ? '\n' +
                        headers
                          .map((h) => `  -H "${h.key}: ${h.value}"`)
                          .join('\n')
                      : ''
                  }${
                    queryParams.length
                      ? queryParams.map((p) => `?${p.key}=${p.value}`).join('&')
                      : ''
                  }${body ? `\n  -d '${body}'` : ''}`;
                  copyToClipboard(curl, 'curl');
                }}
              >
                {copiedSection === 'curl' ? (
                  <>
                    <Check className="w-3 h-3 mr-2" /> Copied cURL
                  </>
                ) : (
                  'Copy as cURL'
                )}
              </Button>
            </div>
          </div>

          {/* API Tester Section */}
          <div className="border-t border-border pt-4">
            <APITester
              method={method}
              endpoint={endpoint}
              headers={Object.fromEntries(
                headers.map((h) => [h.key, h.value])
              )}
              body={body}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
