'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, Shield, Zap } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function GuidesPage() {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Guides', href: '/docs/guides', isActive: true },
        ]}
      />

      <div className="space-y-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Guides</h1>
          <p className="text-lg text-foreground/70 max-w-3xl">
            In-depth guides to help you understand PlyWP architecture, deploy to production, and implement security best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Architecture',
              description: 'Understand how PlyWP components work together, data flow, system design, and core concepts.',
              href: '/docs/guides/architecture',
              icon: BookOpen,
            },
            {
              title: 'Deployment',
              description: 'Production deployment strategies, load balancing, SSL/TLS configuration, and monitoring setup.',
              href: '/docs/guides/deployment',
              icon: Zap,
            },
            {
              title: 'Security',
              description: 'Security best practices, authentication, authorization, compliance, and audit logging.',
              href: '/docs/guides/security',
              icon: Shield,
            },
          ].map((guide, index) => {
            const Icon = guide.icon;
            return (
              <Link key={index} href={guide.href}>
                <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8 h-full cursor-pointer">
                  <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{guide.title}</h3>
                  <p className="text-foreground/70 mb-6">{guide.description}</p>
                  <div className="text-accent font-semibold inline-flex items-center gap-2 transition-colors hover:text-accent/80">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
