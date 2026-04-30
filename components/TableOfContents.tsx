'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Heading {
  level: number;
  title: string;
  id: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'));
    const headingList: Heading[] = [];
    let indexCounter = 0;

    elements.forEach((el) => {
      const level = parseInt(el.tagName[1]);
      let id = el.id;

      if (!id) {
        // Generate unique ID based on heading text and counter
        const textSlug = (el.textContent || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        id = textSlug ? `${textSlug}-${indexCounter}` : `heading-${indexCounter}`;
        el.id = id;
      }
      
      indexCounter++;

      headingList.push({
        level,
        title: el.textContent || '',
        id,
      });
    });

    setHeadings(headingList);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -50% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block fixed right-0 top-24 w-64 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      <div className="text-sm font-semibold text-foreground mb-4 text-white ">On This Page</div>
      <nav className="space-y-2 no-underline">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'block text-sm transition-colors hover:text-accent no-underline!',
              activeId === heading.id ? 'text-accent font-medium' : 'text-muted-foreground',
              heading.level === 3 && 'ml-4'
            )}
          >
            {heading.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
