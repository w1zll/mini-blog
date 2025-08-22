'use client';

import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
   label: string;
   href: string;
   iconName: keyof typeof LucideIcons;
   isPrivate: boolean;
}

const NavItem = ({ label, href, iconName, isPrivate }: Props) => {
   const pathname = usePathname();

   let isActive = false;
   if (pathname === href) {
      isActive = true;
   }
   const isAuth = true;
   if (isPrivate && !isAuth) return null;

   // Приведение типа к LucideIcon
   const Icon = LucideIcons[iconName] as LucideIcon;

   return (
      <li>
         <Link
            href={href}
            className={`border-b-2  ${
               isActive
                  ? 'text-blue-500 border-b-blue-500'
                  : 'border-b-transparent'
            } flex items-center gap-2 py-2 hover:border-b-blue-500 hover:text-blue-500 transition-colors duration-200`}
         >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
         </Link>
      </li>
   );
};

export default NavItem;
