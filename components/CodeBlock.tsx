'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40 backdrop-blur-sm my-6">
      {filename && (
        <div className="px-6 py-3 bg-background/50 border-b border-border/50 text-xs text-muted-foreground font-mono font-semibold uppercase tracking-wide">
          {filename}
        </div>
      )}
      <div className="relative">
        <pre className="!my-0 !bg-transparent !border-0 !rounded-0 p-6 text-sm overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-4 right-4 hover:bg-card/50 transition-colors"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
