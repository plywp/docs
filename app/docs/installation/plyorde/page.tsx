'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import PlyordeInstallation from '../plyorde.mdx';

export default function PlyordeInstallationPage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Installation', href: '/docs/installation', isActive: false },
          { label: 'Plyorde Daemon', href: '/docs/installation/plyorde', isActive: true },
        ]}
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <article className="prose">
            <PlyordeInstallation />
          </article>
        </div>
        
        <aside className="md:col-span-1">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
