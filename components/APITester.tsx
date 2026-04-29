'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, Copy, Check } from 'lucide-react';

interface APITesterProps {
  method: string;
  endpoint: string;
  headers?: Record<string, string>;
  body?: string;
}

export function APITester({ method, endpoint, headers = {}, body }: APITesterProps) {
  const [baseUrl, setBaseUrl] = useState('http://localhost:5173');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fullUrl = `${baseUrl}${endpoint}`;

  const testRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
        options.body = body;
      }

      const res = await fetch(fullUrl, options);
      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to make request'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCurl = () => {
    const curl = `curl -X ${method} "${fullUrl}"${
      Object.entries(headers).length
        ? '\n' + Object.entries(headers).map(([k, v]) => `  -H "${k}: ${v}"`).join('\n')
        : ''
    }${body ? `\n  -d '${body}'` : ''}`;

    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-border bg-card/50 p-6 space-y-6">
      <div className="space-y-4">
        <h4 className="font-bold text-foreground">Test This Endpoint</h4>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Base URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded text-sm font-mono text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="http://localhost:5173"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full URL</label>
          <code className="block w-full px-3 py-2 bg-background border border-border rounded text-xs font-mono text-foreground/80 break-all">
            {fullUrl}
          </code>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={testRequest}
            disabled={loading}
            className="gap-2 flex-1 bg-accent hover:bg-accent/90 text-white"
          >
            {loading ? (
              <>
                <div className="animate-spin">⏳</div>
                Testing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Test Request
              </>
            )}
          </Button>
          <Button
            onClick={copyCurl}
            variant="outline"
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy cURL
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
          <p className="text-sm text-red-400">Error: {error}</p>
        </div>
      )}

      {response && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Response</label>
          <pre className="bg-background border border-border rounded p-4 text-xs overflow-x-auto text-foreground/80 max-h-96">
            {response}
          </pre>
        </div>
      )}
    </Card>
  );
}
