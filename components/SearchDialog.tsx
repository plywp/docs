'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { search, initializeSearch } from '@/lib/search';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    initializeSearch();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="w-9 h-9 px-0 text-foreground/70 sm:w-64 sm:justify-start sm:text-sm"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline-flex">Search docs...</span>
        <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Documentation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search by title, topic, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="bg-input"
            />

            {results.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={() => setOpen(false)}
                    className="block p-3 rounded-lg border border-border hover:border-accent hover:bg-card transition-colors"
                  >
                    <div className="font-medium text-sm text-accent">{result.title}</div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.description}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 capitalize">
                      {result.section}
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="py-8 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground text-sm">
                <p>Start typing to search documentation...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
