'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import ArchitectureGuide from '../architecture.mdx';

export default function ArchitecturePage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Guides', href: '/docs/guides', isActive: false },
          { label: 'Architecture', href: '/docs/guides/architecture', isActive: true },
        ]}
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose">
            <ArchitectureGuide />
          </article>
        </div>
        
        <aside className="md:col-span-1">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
