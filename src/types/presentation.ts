export interface SideMenuTab {
  display: string;
  active: boolean;
  icon: string;
  to: string;
}

export const sideMenuTabs: SideMenuTab[] = [
  {
    display: 'Home',
    active: false,
    icon: 'mdi-house',
    to: '/home'
  },
  {
    display: 'Authors',
    active: false,
    icon: 'mdi-typewriter',
    to: '/authors'
  },
  {
    display: 'Books',
    active: false,
    icon: 'mdi-book',
    to: '/books'
  },
]
