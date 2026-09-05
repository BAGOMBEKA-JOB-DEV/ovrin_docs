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
