import { Breadcrumb } from '@/components/Breadcrumb';
import { TableOfContents } from '@/components/TableOfContents';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Installation - PlyWP Documentation',
  description: 'Step-by-step installation guides for PlyWP Panel and Plyorde daemon.',
};

export default function InstallationPage() {
  return (
    <>
      <Breadcrumb />
      
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="prose">
          <h1>Installation</h1>
          
          <p className="lead">
            Get PlyWP up and running in minutes with our comprehensive installation guides.
          </p>

          <h2>Choose Your Installation Path</h2>
          <p>
            PlyWP consists of two complementary components. Choose the installation guide that matches your setup:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <Link href="/docs/installation/panel">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer h-full">
                <h3 className="font-bold text-lg mb-2">PlyWP Panel</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  The web control panel for managing WordPress sites. Install this if you need a user interface for site management.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  View Guide <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>

            <Link href="/docs/installation/plyorde">
              <Card className="border-border bg-card p-6 hover:border-accent/50 transition-colors cursor-pointer h-full">
                <h3 className="font-bold text-lg mb-2">Plyorde Daemon</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  The system daemon that powers PlyWP functionality. This is the core service that handles operations.
                </p>
                <div className="text-accent font-medium inline-flex items-center gap-2">
                  View Guide <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          </div>

          <h2>Installation Options</h2>
          <p>
            We provide guides for different environments and setups:
          </p>

          <h3>Installation by Component</h3>
          <ul>
            <li><strong>Panel Installation:</strong> Web interface and admin panel</li>
            <li><strong>Plyorde Installation:</strong> System daemon and core services</li>
          </ul>

          <h3>Installation by Environment</h3>
          <p>
            Platform-specific guides for various environments:
          </p>
          <ul>
            <li><strong>Local Development:</strong> Development setup on your machine</li>
            <li><strong>Linux/Debian:</strong> Production deployment on Linux servers</li>
            <li><strong>Docker:</strong> Containerized installation</li>
            <li><strong>Cloud Providers:</strong> Deployment guides for AWS, DigitalOcean, etc.</li>
          </ul>

          <Link href="/docs/installation/environments">
            <div className="text-accent font-medium hover:text-accent/80 inline-flex items-center gap-2 cursor-pointer">
              View Environment Guides <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <h2>System Requirements</h2>
          <p>
            Before you begin, ensure your system meets the following requirements:
          </p>

          <h3>Minimum Requirements</h3>
          <ul>
            <li>Operating System: Linux (Debian, Ubuntu, CentOS, etc.)</li>
            <li>PHP 7.4 or higher (for Panel)</li>
            <li>MySQL 5.7 or MariaDB 10.2 (or compatible)</li>
            <li>Node.js 14+ (for development)</li>
            <li>Go 1.18+ (for building from source)</li>
          </ul>

          <h3>Network Requirements</h3>
          <ul>
            <li>Internet connectivity for package downloads</li>
            <li>Open ports for Panel (default 8080) and Plyorde (default 8081)</li>
            <li>DNS resolution capability</li>
          </ul>

          <h2>Pre-Installation Steps</h2>
          <ol>
            <li>Verify system requirements above</li>
            <li>Update your package manager</li>
            <li>Create a dedicated user/directory for PlyWP</li>
            <li>Configure firewall rules if needed</li>
            <li>Backup any existing data</li>
          </ol>

          <h2>After Installation</h2>
          <p>
            Once installation is complete, you should:
          </p>
          <ol>
            <li>Access the Panel web interface</li>
            <li>Configure authentication and security</li>
            <li>Add your WordPress sites</li>
            <li>Test connectivity and functionality</li>
            <li>Review security best practices in the guides</li>
          </ol>

          <h2>Troubleshooting</h2>
          <p>
            If you encounter issues during installation:
          </p>
          <ol>
            <li>Check the system requirements are met</li>
            <li>Review installation logs for error messages</li>
            <li>Verify network connectivity and firewall settings</li>
            <li>Check our GitHub repositories for known issues</li>
            <li>Open an issue on GitHub if you need help</li>
          </ol>
        </div>

        <TableOfContents />
      </div>
    </>
  );
}
