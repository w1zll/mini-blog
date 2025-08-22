'use client';

import { NAV_ITEMS } from '@/config/navbar.config';
import NavItem from './NavItem';

const Navbar = () => {
   return (
      <nav>
         <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
               <NavItem key={item.href} {...item} />
            ))}
         </ul>
      </nav>
   );
};

export default Navbar;
