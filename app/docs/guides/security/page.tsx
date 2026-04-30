'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import SecurityGuide from '../security.mdx';

export default function SecurityPage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Guides', href: '/docs/guides', isActive: false },
          { label: 'Security', href: '/docs/guides/security', isActive: true },
        ]}
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose">
            <SecurityGuide />
          </article>
        </div>
        
        <aside className="md:col-span-1">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
