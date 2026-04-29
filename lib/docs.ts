export interface DocItem {
  title: string;
  href: string;
  section: string;
  description?: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

export const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
        section: 'getting-started',
        description: 'Learn about PlyWP and its capabilities',
      },
    ],
  },
  {
    title: 'Installation',
    items: [
      {
        title: 'Panel Installation',
        href: '/docs/installation/panel',
        section: 'installation',
        description: 'Set up the PlyWP control panel',
      },
      {
        title: 'Plyorde Installation',
        href: '/docs/installation/plyorde',
        section: 'installation',
        description: 'Set up the Plyorde daemon',
      },
      {
        title: 'Environment Guides',
        href: '/docs/installation/environments',
        section: 'installation',
        description: 'Platform-specific installation instructions',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Overview',
        href: '/docs/api/overview',
        section: 'api',
        description: 'API documentation overview and authentication',
      },
      {
        title: 'Authentication',
        href: '/docs/api/authentication',
        section: 'api',
        description: 'API authentication and authorization',
      },
      {
        title: 'Plyorde Endpoints',
        href: '/docs/api/plyorde/endpoints',
        section: 'api',
        description: 'Complete Plyorde API reference',
      },
      {
        title: 'Examples',
        href: '/docs/api/plyorde/examples',
        section: 'api',
        description: 'Code examples and use cases',
      },
    ],
  },
  {
    title: 'Guides',
    items: [
      {
        title: 'Architecture',
        href: '/docs/guides/architecture',
        section: 'guides',
        description: 'How PlyWP components work together',
      },
      {
        title: 'Deployment',
        href: '/docs/guides/deployment',
        section: 'guides',
        description: 'Production deployment strategies',
      },
      {
        title: 'Security',
        href: '/docs/guides/security',
        section: 'guides',
        description: 'Security best practices',
      },
    ],
  },
];

export function getAllDocItems(): DocItem[] {
  return docSections.flatMap((section) => section.items);
}

export function getDocItemByHref(href: string): DocItem | undefined {
  return getAllDocItems().find((item) => item.href === href);
}

export function getDocsBySection(section: string): DocItem[] {
  return getAllDocItems().filter((item) => item.section === section);
}
