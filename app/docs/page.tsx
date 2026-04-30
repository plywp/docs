import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Documentation - PlyWP',
  description: 'PlyWP documentation covering installation, API reference, and guides.',
};

export default function DocsPage() {
  return (
    <>
      <Breadcrumb />
      
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="prose">
          <h1>Documentation</h1>
          
          <p className="lead">
            Welcome to the PlyWP documentation. Here you&apos;ll find everything you need to install, configure, and use PlyWP effectively.
          </p>

          <h2>Getting Started</h2>
          <p>
            PlyWP consists of two main components: the Panel (web interface) and Plyorde (daemon). Choose your path based on your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors">
              <h3 className="font-bold text-lg mb-2">New to PlyWP?</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Start with our installation guides to get up and running quickly.
              </p>
              <Link href="/docs/installation/panel" className="text-accent font-medium hover:text-accent/80 inline-flex items-center gap-2">
                Installation Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors">
              <h3 className="font-bold text-lg mb-2">API Integration?</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Explore the complete API reference with code examples.
              </p>
              <Link href="/docs/api/overview" className="text-accent font-medium hover:text-accent/80 inline-flex items-center gap-2">
                API Reference <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>

          <h2>Documentation Sections</h2>

          <h3>Installation</h3>
          <p>
            Comprehensive step-by-step guides for installing and configuring both Panel and Plyorde across different environments.
          </p>
          <ul>
            <li><strong>Panel Installation:</strong> Set up the web control panel</li>
            <li><strong>Plyorde Installation:</strong> Deploy the daemon service</li>
            <li><strong>Environment Guides:</strong> Platform-specific instructions</li>
          </ul>

          <h3>API Reference</h3>
          <p>
            Complete API documentation for developers integrating with PlyWP. Includes endpoint specifications, authentication, and code examples.
          </p>
          <ul>
            <li><strong>Overview:</strong> API basics and getting started</li>
            <li><strong>Authentication:</strong> Token-based and header authentication</li>
            <li><strong>Endpoints:</strong> Full endpoint reference with parameters</li>
            <li><strong>Examples:</strong> Real-world usage examples</li>
          </ul>

          <h3>Guides</h3>
          <p>
            In-depth guides covering architecture, deployment, security, and best practices.
          </p>
          <ul>
            <li><strong>Architecture:</strong> How Panel and Plyorde work together</li>
            <li><strong>Deployment:</strong> Production deployment strategies</li>
            <li><strong>Security:</strong> Security best practices and configuration</li>
          </ul>

          <h2>Quick Links</h2>
          <ul>
            <li><a href="https://github.com/plywp" target="_blank" rel="noopener noreferrer">PlyWP Organization on GitHub</a></li>
            <li><a href="https://github.com/plywp/panel" target="_blank" rel="noopener noreferrer">Panel Repository</a></li>
            <li><a href="https://github.com/plywp/plyorde" target="_blank" rel="noopener noreferrer">Plyorde Repository</a></li>
          </ul>

          <h2>Need Help?</h2>
          <p>
            If you have questions or need support, please visit the GitHub repositories where you can:
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
