'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import EnvironmentsGuide from '../environments.mdx';

export default function EnvironmentsPage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Installation', href: '/docs/installation', isActive: false },
          { label: 'Environments', href: '/docs/installation/environments', isActive: true },
        ]}
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose">
            <EnvironmentsGuide />
          </article>
        </div>
        
        <aside className="md:col-span-1">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
