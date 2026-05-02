"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { docSections } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
    "installation",
    "api",
  ]);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-1 p-4 overflow-y-auto">
        {docSections.map((section) => {
          const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");
          const isExpanded = expandedSections.includes(sectionId);
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(sectionId)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/50 hover:text-foreground hover:bg-card/50 rounded-md transition-all"
              >
                <span>{section.title}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="mt-0.5 mb-1 ml-1 space-y-0.5 border-l border-border/40 pl-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md transition-all border-l-2 -ml-[2px]",
                          isActive
                            ? "bg-accent/15 text-accent border-l-accent font-medium"
                            : "text-foreground/60 hover:text-foreground hover:bg-card/40 border-l-transparent",
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
      </div>

      <div className="px-4 py-4 border-t border-border/50 space-y-1 shrink-0">
        {[
          { label: "GitHub", href: "https://github.com/plywp" },
          { label: "Panel Repo", href: "https://github.com/plywp/panel" },
          { label: "Plyorde Repo", href: "https://github.com/plywp/plyorde" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-1.5 text-xs text-foreground/50 hover:text-accent rounded-md hover:bg-card/40 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed left-4 z-50 p-1.5 rounded-md text-foreground/70 hover:text-foreground hover:bg-card/60 transition-all"
        aria-label="Open sidebar"
      >
        <PanelLeftOpen className="w-4 h-4" />
      </button>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "md:hidden fixed left-0 top-0 z-50 h-full w-72 bg-background border-r border-border shadow-xl transition-transform duration-300 ease-in-out flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-card/60 transition-all"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden md:flex fixed left-3 top-[4.5rem] z-40 p-1.5 rounded-md text-foreground/50 hover:text-foreground hover:bg-card/60 border border-border/50 transition-all"
          title="Open sidebar (Ctrl+B)"
          aria-label="Open sidebar"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
      )}
      <aside
        className={cn(
          "hidden md:flex fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] flex-col border-r border-border bg-background/50 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "w-64" : "w-0 border-r-0",
        )}
      >
        <div className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-foreground/40 hover:text-foreground hover:bg-card/60 transition-all"
            title="Collapse sidebar (Ctrl+B)"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto min-w-[16rem]">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
