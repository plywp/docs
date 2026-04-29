# PlyWP Documentation Website

A comprehensive documentation website for the PlyWP WordPress management suite, including landing page, installation guides, and API reference documentation.

## Overview

This documentation site serves as the central hub for developers, hosting operators, and system administrators to learn about, install, and integrate with PlyWP. The site is built with Next.js 16, TypeScript, and Tailwind CSS with a professional dark theme.

## Features

### Landing Page
- **Hero Section** with compelling value proposition
- **Features Overview** highlighting Panel and Plyorde components
- **Benefits Section** demonstrating key advantages
- **Quick Links** to documentation sections
- **Footer** with repository links

### Documentation Structure

#### Installation Section
- **Panel Installation** - Complete setup guide for the web control panel
- **Plyorde Installation** - Comprehensive daemon deployment guide
- **Environment Guides** - Platform-specific instructions for:
  - macOS and Windows (WSL2)
  - Debian/Ubuntu/CentOS servers
  - Docker and Docker Compose
  - Cloud providers (AWS, DigitalOcean, Heroku)
  - Kubernetes

#### API Documentation
- **Overview** - API basics, authentication, response formats, rate limiting
- **Authentication** - Token generation, API key management, security best practices
- **Plyorde Endpoints** - Complete endpoint reference including:
  - Sites management (CRUD operations)
  - Plugin management (list, activate, deactivate, update, delete)
  - User management (create, update, delete WordPress users)
  - Backup operations (create, restore backups)
  - Health and status monitoring
- **Code Examples** - Real-world examples in:
  - JavaScript/Node.js
  - Python
  - Go
  - cURL
  - Bash

#### Guides
- **Architecture** - Understanding PlyWP components and data flows
- **Deployment** - Production deployment strategies and best practices
- **Security** - Security hardening, authentication, encryption, monitoring

### User Interface Features

- **Professional Dark Theme** - Easy on the eyes, modern appearance
- **Responsive Design** - Works perfectly on desktop and mobile
- **Search Functionality** - Cmd+K global search across all documentation
- **Navigation Sidebar** - Collapsible navigation with section grouping
- **Breadcrumbs** - Clear path navigation through documentation
- **Table of Contents** - Auto-generated from page headings
- **Code Highlighting** - Syntax highlighting for all code examples
- **Copy Button** - Easy code copying from examples
- **Mobile-Optimized** - Touch-friendly interface for tablets and phones

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & theme
│   └── docs/
│       ├── layout.tsx           # Documentation layout with sidebar
│       ├── page.tsx             # Documentation index
│       ├── installation/
│       │   ├── page.tsx         # Installation index
│       │   ├── panel.mdx        # Panel installation guide
│       │   ├── plyorde.mdx      # Plyorde installation guide
│       │   └── environments.mdx # Environment-specific guides
│       ├── api/
│       │   ├── page.tsx         # API documentation index
│       │   ├── overview.mdx     # API overview
│       │   ├── authentication.mdx # Authentication guide
│       │   └── plyorde/
│       │       ├── endpoints.mdx # Complete endpoint reference
│       │       └── examples.mdx  # Code examples
│       └── guides/
│           ├── architecture.mdx # Architecture explanation
│           ├── deployment.mdx   # Deployment guide
│           └── security.mdx     # Security best practices
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── Sidebar.tsx              # Documentation sidebar
│   ├── SearchDialog.tsx         # Search component
│   ├── CodeBlock.tsx            # Syntax-highlighted code blocks
│   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   ├── TableOfContents.tsx      # Auto-generated TOC
│   ├── Footer.tsx               # Footer component
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── docs.ts                  # Documentation structure & data
│   ├── search.ts                # Search functionality
│   └── utils.ts                 # Utility functions
├── package.json
└── tailwind.config.ts
```

## Technology Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4.2
- **UI Components**: shadcn/ui
- **MDX**: Content as React components
- **Search**: Fuse.js for client-side full-text search
- **Icons**: Lucide React
- **Syntax Highlighting**: Shiki
- **Hosting**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The site will be available at `http://localhost:3000`

## Usage

### Viewing Documentation

1. **Landing Page** (`/`)
   - Overview of PlyWP features and benefits
   - Quick navigation to key sections

2. **Documentation Index** (`/docs`)
   - Main documentation portal
   - Overview of all documentation sections

3. **Installation Guides** (`/docs/installation/*`)
   - Step-by-step installation instructions
   - Environment-specific guides
   - Troubleshooting tips

4. **API Documentation** (`/docs/api/*`)
   - API overview and authentication
   - Complete endpoint reference
   - Code examples in multiple languages

5. **Guides** (`/docs/guides/*`)
   - Architecture explanation
   - Deployment strategies
   - Security best practices

### Search

- Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) to open search
- Click the search icon in the navbar
- Search by title, topic, or content
- Real-time filtering as you type

### Navigation

- Use the **sidebar** to browse documentation sections
- Click **breadcrumbs** at the top to navigate
- Use **Table of Contents** (right side, desktop) to jump to sections
- **Mobile menu** for touch devices

## Customization

### Colors & Theme

Edit `/app/globals.css` to customize the color scheme:

```css
:root {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.5 0.15 263);
  /* ... more colors ... */
}
```

### Typography

Fonts are defined in `tailwind.config.ts`:

```ts
fontFamily: {
  sans: ['Geist', 'sans-serif'],
  mono: ['Geist Mono', 'monospace'],
}
```

### Documentation Structure

Update `/lib/docs.ts` to add or modify documentation sections:

```ts
export const docSections: DocSection[] = [
  {
    title: 'Your Section',
    items: [
      {
        title: 'Your Page',
        href: '/docs/your-path',
        section: 'your-section',
        description: 'Description here'
      }
    ]
  }
];
```

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from GitHub
# or use Vercel CLI
vercel deploy
```

### Docker

```bash
# Build Docker image
docker build -t plywp-docs .

# Run container
docker run -p 3000:3000 plywp-docs
```

### Self-Hosted

```bash
# Build production bundle
pnpm build

# Start server
pnpm start
```

Server will listen on port 3000.

## Performance

- **Fast Build Time**: ~4-5 seconds with Turbopack
- **Optimized Images**: Automatic image optimization
- **Code Splitting**: Lazy loading of pages and components
- **Static Generation**: Pages pre-generated for speed
- **Caching**: Intelligent caching strategies

## SEO

- **Metadata**: Title, description, and OG tags on all pages
- **Sitemap**: Auto-generated sitemap for search engines
- **Open Graph**: Social media sharing optimized
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: Schema.org markup where applicable

## Accessibility

- **WCAG 2.1 AA Compliant**: Accessibility standards met
- **Semantic HTML**: Proper heading hierarchy and structure
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Compatible with assistive technologies
- **Color Contrast**: High contrast for readability
- **Focus States**: Clear focus indicators

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

To contribute to the documentation:

1. **Edit MDX Files**: Modify content in `/app/docs/**/*.mdx`
2. **Add Examples**: Update code examples in documentation
3. **Improve Guides**: Enhance existing guides with more details
4. **Report Issues**: Found an error? Open an issue on GitHub

## License

MIT License - See LICENSE file for details

## Support

- **Issues**: Report issues on GitHub
- **Discussions**: Join GitHub Discussions
- **Documentation**: Read full documentation at `/docs`
- **Examples**: Check code examples in API documentation

## Related Resources

- [PlyWP Organization](https://github.com/plywp)
- [Panel Repository](https://github.com/plywp/panel)
- [Plyorde Repository](https://github.com/plywp/plyorde)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Changelog

### Version 1.0.0 (Initial Release)
- Complete landing page with features and benefits
- Full installation documentation for Panel and Plyorde
- Comprehensive API reference with endpoints and examples
- Architecture, deployment, and security guides
- Professional dark theme
- Global search functionality
- Mobile-responsive design
- Production-ready deployment

---

**Built with Next.js 16 • Tailwind CSS • shadcn/ui**
