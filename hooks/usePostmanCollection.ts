'use client';

import { useEffect, useState } from 'react';

interface PostmanCollection {
  info: {
    name: string;
    description?: string;
  };
  item: unknown[];
}

export function usePostmanCollection(filePath: string) {
  const [collection, setCollection] = useState<PostmanCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load collection: ${response.statusText}`);
        }
        const data = await response.json();
        setCollection(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCollection(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [filePath]);

  return { collection, loading, error };
}
