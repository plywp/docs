'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getDocItemByHref } from '@/lib/docs';

export function Breadcrumb() {
  const pathname = usePathname();

  if (!pathname.startsWith('/docs')) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];

  breadcrumbs.push({ label: 'Docs', href: '/docs' });

  let currentPath = '/docs';
  for (let i = 1; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    const docItem = getDocItemByHref(currentPath);
    if (docItem) {
      breadcrumbs.push({ label: docItem.title, href: currentPath });
    }
  }

  return (
    <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground/50" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-accent hover:text-accent/80 transition-colors">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
