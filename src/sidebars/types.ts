export interface SidebarItem {
  title: string;
  path: string;
  description?: string;
  children?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export type Sidebar = SidebarSection[];

export function flattenSidebar(sidebar: Sidebar): SidebarItem[] {
  return sidebar.flatMap((section) =>
    section.items.flatMap((item) => [item, ...(item.children ?? [])]),
  );
}

export function findInSidebar(sidebar: Sidebar, route: string): { section?: string; parent?: string } | undefined {
  for (const section of sidebar) {
    for (const item of section.items) {
      if (item.path === route) {
        return { section: section.title };
      }
      for (const child of item.children ?? []) {
        if (child.path === route) {
          return { section: section.title, parent: item.title };
        }
      }
    }
  }
  return undefined;
}
