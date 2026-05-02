import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code2, Zap, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 md:py-48 border-b border-border bg-gradient-to-b from-background via-background to-card/20">
        <div className="container max-w-5xl">
          <div className="ml-0 md:ml-8 lg:ml-12">
            <div className="inline-block mb-6 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
              <span className="text-sm text-accent font-semibold">
                Open Source WordPress Management
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-pretty">
              Complete WordPress Management Suite
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10 max-w-3xl">
              PlyWP is a modern, powerful WordPress management platform built
              for developers and hosting operators. Control, configure, and
              manage WordPress installations at scale with unparalleled
              simplicity and power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/docs">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white gap-2 px-8"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://github.com/plywp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="px-8">
                  View on GitHub
                </Button>
              </a>
            </div>

            <p className="text-sm text-muted-foreground font-medium">
              Free and open source. Creative Commons Attribution 4.0
              International.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 md:py-48 border-b border-border">
        <div className="container max-w-6xl">
          <div className="mb-20 ml-0 md:ml-8 lg:ml-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pretty">
              Powerful Features for Modern Development
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
              Everything you need to manage WordPress installations efficiently
              and securely at any scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 ml-0 md:ml-8 lg:ml-12">
            {/* Panel Feature */}
            <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8">
              <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">PlyWP Panel</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                A comprehensive control panel for managing WordPress sites.
                Monitor performance, manage plugins, handle users, and configure
                settings from a single intuitive interface.
              </p>
              <Link
                href="/docs/installation/panel"
                className="text-accent font-semibold hover:text-accent/80 inline-flex items-center gap-2 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Plyorde Feature */}
            <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8">
              <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Plyorde Daemon</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                A lightweight daemon that powers core functionality. Handle
                background tasks, manage services, and enable real-time
                communication between components with minimal overhead.
              </p>
              <Link
                href="/docs/installation/plyorde"
                className="text-accent font-semibold hover:text-accent/80 inline-flex items-center gap-2 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Security */}
            <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8">
              <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Security First</h3>
              <p className="text-foreground/70 leading-relaxed">
                Built with security in mind. Implement proper authentication,
                authorization, and data protection. 
              </p>
            </Card>

            {/* Developer Experience */}
            <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8">
              <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Developer Friendly</h3>
              <p className="text-foreground/70 leading-relaxed">
                RESTful API, comprehensive documentation, and code examples in
                multiple languages. Build integrations and extensions with ease.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 md:py-48 border-b border-border">
        <div className="container max-w-6xl">
          <div className="mb-20 ml-0 md:ml-8 lg:ml-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pretty">
              Why Choose PlyWP?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
              Built for the real world, who demand
              reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 ml-0 md:ml-8 lg:ml-12">
            {[
              {
                title: "Scalable",
                description:
                  "Manage dozens, hundreds, or thousands of WordPress sites from a single platform",
              },
              {
                title: "Open Source",
                description:
                  "Transparent, community-driven development. MIT licensed. No vendor lock-in.",
              },
              {
                title: "Easy to Deploy",
                description:
                  "Simple installation process. Works on your infrastructure. Full control and privacy.",
              },
              {
                title: "Performance Focused",
                description:
                  "Lightweight daemon. Minimal overhead. Built for speed and efficiency.",
              },
              {
                title: "Fully Documented",
                description:
                  "Comprehensive guides, API reference, and examples. Get started in minutes.",
              },
              {
                title: "Active Community",
                description:
                  "Join developers and hosting operators using PlyWP. Share knowledge and contribute.",
              },
            ].map((benefit, index) => (
              <div key={index} className="space-y-3 pb-2">
                <h3 className="font-bold text-lg text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 border-b border-border">
        <div className="container max-w-5xl">
          <div className="rounded-xl border border-border bg-card/30 backdrop-blur p-12 md:p-16 text-center ml-0 md:ml-8 lg:ml-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pretty">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-3xl mx-auto">
              Follow our comprehensive installation guides and start managing
              WordPress like a pro
            </p>
            <Link href="/docs/installation/panel">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white gap-2 px-8 h-12"
              >
                View Installation Guides
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Documentation Preview Section */}
      <section className="py-32 md:py-48">
        <div className="container max-w-6xl">
          <div className="mb-20 ml-0 md:ml-8 lg:ml-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pretty">
              Comprehensive Documentation
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl">
              Everything you need to know about installing, configuring, and
              using PlyWP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 ml-0 md:ml-8 lg:ml-12">
            {[
              {
                title: "Installation Guides",
                description:
                  "Step-by-step instructions for Panel and Plyorde setup",
                href: "/docs/installation/panel",
              },
              {
                title: "API Reference",
                description: "Complete API documentation with code examples",
                href: "/docs/api/plyorde/endpoints",
              },
            ].map((doc, index) => (
              <Link key={index} href={doc.href}>
                <Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8 h-full cursor-pointer">
                  <h3 className="font-bold text-xl mb-3">{doc.title}</h3>
                  <p className="text-foreground/70 mb-6">{doc.description}</p>
                  <div className="text-accent font-semibold inline-flex items-center gap-2 transition-colors hover:text-accent/80">
                    Read More <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
