'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDocsPage = pathname.startsWith('/docs');

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition-opacity ml-0 md:ml-4">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <span>PlyWP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 mr-4">
          <Link
            href="/docs"
            className={`text-sm font-medium transition-colors ${
              isDocsPage ? 'text-accent' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Documentation
          </Link>
          <a
            href="https://github.com/plywp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/70 hover:text-foreground font-medium transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 mr-0 md:mr-4">
          <SearchDialog />
          <a
            href="https://github.com/plywp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/docs"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <a
              href="https://github.com/plywp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
