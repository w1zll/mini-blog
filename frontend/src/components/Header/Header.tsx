import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar/Navbar';
import ThemeChanger from './ThemeChanger/ThemeChanger';
import AuthButton from './AuthButton';
import Button from '../UI/Button';

const Header = () => {
   const isAuth = false;
   return (
      <header className="py-4 px-4 shadow shadow-neutral-400/40">
         <div className="container flex items-center gap-4 mx-auto">
            <div className="flex-2 justify-items-start">
               <Link href="/" className="flex items-center gap-4">
                  <Image
                     className="rounded-full"
                     src="/logo.png"
                     alt="Mini blog logo"
                     width={50}
                     height={50}
                     priority={true}
                  />
                  <span className="text-xl font-mono">Mini blog</span>
               </Link>
            </div>
            <Navbar />
            <ThemeChanger className="flex-1" />
            <div className="flex-1 flex gap-2 justify-end">
               {!isAuth ? <AuthButton /> : <Button>Выйти</Button>}
            </div>
         </div>
      </header>
   );
};

export default Header;
