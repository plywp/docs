import { Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur justify-self-center">
      <div className="container max-w-6xl py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12 ml-0 md:ml-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/icon.png" alt="Logo" width={200} height={200} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modern WordPress management suite for developers and hosting
              operators.
            </p>
          </div>

          {/* Documentation Links */}
          <div>
            <h3 className="font-semibold mb-6 text-sm uppercase tracking-wide text-foreground">
              Documentation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-accent transition-colors font-medium"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/installation/panel"
                  className="text-muted-foreground hover:text-accent transition-colors font-medium"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api/plyorde/endpoints"
                  className="text-muted-foreground hover:text-accent transition-colors font-medium"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold mb-6 text-sm uppercase tracking-wide text-foreground">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/plywp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/plywp/panel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Panel Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/plywp/plyorde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Plyorde Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/plywp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Issues & Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/plywp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 PlyWP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/plywp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
