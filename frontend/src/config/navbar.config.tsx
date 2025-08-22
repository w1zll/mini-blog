export const NAV_ITEMS = [
   {
      label: 'Главная',
      href: '/',
      iconName: 'HomeIcon',
      isPrivate: false,
   },
   {
      label: 'Посты',
      href: '/posts',
      iconName: 'StickyNote',
      isPrivate: false,
   },
   {
      label: 'Мои посты',
      href: '/dashboard',
      iconName: 'LayoutDashboard',
      isPrivate: true,
   },
] as const;
