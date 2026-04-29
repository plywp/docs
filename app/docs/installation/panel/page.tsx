'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import PanelInstallation from '../panel.mdx';

export default function PanelInstallationPage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Installation', href: '/docs/installation', isActive: false },
          { label: 'Panel', href: '/docs/installation/panel', isActive: true },
        ]}
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose">
            <PanelInstallation />
          </article>
        </div>
        
        <aside className="md:col-span-1">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
