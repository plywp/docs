import { Breadcrumb } from "@/components/Breadcrumb";
import { TableOfContents } from "@/components/TableOfContents";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Documentation - PlyWP",
  description:
    "PlyWP documentation covering installation, API reference, and guides.",
};

export default function DocsPage() {
  return (
    <>
      <Breadcrumb />

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="prose">
          <h1>Documentation</h1>

          <p className="lead">
            Welcome to the PlyWP documentation. Here you&apos;ll find everything
            you need to install, configure, and use PlyWP effectively.
          </p>

          <h2>Getting Started</h2>
          <p>
            PlyWP consists of two main components: the Panel (web interface) and
            Plyorde (daemon). Choose your path based on your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose max-w-screen">
            <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors flex-wrap max-w-screen">
              <h3 className="font-bold text-lg mb-2">New to PlyWP?</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Start with our installation guides to get up and running
                quickly.
              </p>
              <p className="text-sm text-foreground/70 mb-4">
                Run the following command to install PlyWP on your server
                automatically:
              </p>
              <CodeBlock
                code="bash <(curl -s https://plywp-installer.urixen.io/install.sh) | bash"
                language="bash"
              />
              <Link
                href="/docs/installation/panel"
                className="text-accent font-medium hover:text-accent/80 inline-flex items-center gap-2"
              >
                Installation Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors">
              <h3 className="font-bold text-lg mb-2">API Integration?</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Explore the complete API reference with code examples.
              </p>
              <Link
                href="/docs/api/plyorde/endpoints"
                className="text-accent font-medium hover:text-accent/80 inline-flex items-center gap-2"
              >
                API Reference <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>

          <h2>Documentation Sections</h2>

          <h3>Installation</h3>
          <p>
            Comprehensive step-by-step guides for installing and configuring
            both Panel and Plyorde across different environments.
          </p>
          <ul>
            <li>
              <strong>Panel Installation:</strong> Set up the web control panel
            </li>
            <li>
              <strong>Plyorde Installation:</strong> Deploy the daemon service
            </li>
          </ul>

          <h3>API Reference</h3>
          <p>
            Complete API documentation for developers integrating with PlyWP.
            Includes endpoint specifications, authentication, and code examples.
          </p>
          <ul>
            <li>
              <strong>Endpoints:</strong> Full endpoint reference with
              parameters
            </li>
          </ul>

          <h2>Quick Links</h2>
          <ul>
            <li>
              <a
                href="https://github.com/plywp"
                target="_blank"
                rel="noopener noreferrer"
              >
                PlyWP Organization on GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/plywp/panel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Panel Repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/plywp/plyorde"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plyorde Repository
              </a>
            </li>
          </ul>

          <h2>Need Help?</h2>
          <p>
            If you have questions or need support, please visit the GitHub
            repositories where you can:
          </p>
          <ul>
            <li>Open an issue for bugs and feature requests</li>
            <li>Check existing issues and discussions for answers</li>
            <li>Contribute improvements and documentation updates</li>
          </ul>
        </div>

        <TableOfContents />
      </div>
    </>
  );
}
