'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { docSections } from '@/lib/docs';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'installation', 'api', 'guides']);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background/50 backdrop-blur-sm overflow-y-auto">
      <nav className="space-y-2 p-6">
        {docSections.map((section) => {
          const sectionId = section.title.toLowerCase().replace(/\s+/g, '-');
          const isExpanded = expandedSections.includes(sectionId);

          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(sectionId)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-card/50 rounded-lg transition-all"
              >
                {section.title}
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-2 mt-2 space-y-1 border-l border-border/50 pl-0">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'block px-4 py-2 text-sm rounded-lg transition-all border-l-2 -ml-[2px]',
                          isActive
                            ? 'bg-accent/15 text-accent border-l-accent font-medium'
                            : 'text-foreground/70 hover:text-foreground hover:bg-card/40 border-l-transparent'
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="mt-8 pt-4 border-t border-border space-y-2">
        <a
          href="https://github.com/plywp"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          GitHub Repository
        </a>
        <a
          href="https://github.com/plywp/panel"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          Panel Repository
        </a>
        <a
          href="https://github.com/plywp/plyorde"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-foreground/70 hover:text-accent transition-colors"
        >
          Plyorde Repository
        </a>
      </div>
    </aside>
  );
}
