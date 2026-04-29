import Fuse from 'fuse.js';
import { getAllDocItems, DocItem } from './docs';

let searchIndex: Fuse<DocItem> | null = null;

export function initializeSearch() {
  if (searchIndex) return;

  const items = getAllDocItems();
  searchIndex = new Fuse(items, {
    keys: ['title', 'description', 'section'],
    threshold: 0.3,
    includeScore: true,
  });
}

export function search(query: string): DocItem[] {
  if (!searchIndex) {
    initializeSearch();
  }

  if (!query.trim()) {
    return [];
  }

  const results = searchIndex!.search(query);
  return results.map((result) => result.item);
}

export interface HeadingItem {
  level: number;
  title: string;
  id: string;
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ level, title, id });
  }

  return headings;
}
