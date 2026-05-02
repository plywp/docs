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
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        section: "getting-started",
        description: "Learn about PlyWP and its capabilities",
      },
    ],
  },
  {
    title: "Installation",
    items: [
      {
        title: "Panel Installation",
        href: "/docs/installation/panel",
        section: "installation",
        description: "Set up the PlyWP control panel",
      },
      {
        title: "Plyorde Installation",
        href: "/docs/installation/plyorde",
        section: "installation",
        description: "Set up the Plyorde daemon",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "PlyWP Endpoints",
        href: "/docs/api/plyorde/endpoints",
        section: "api",
        description: "Complete Plyorde API reference",
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
