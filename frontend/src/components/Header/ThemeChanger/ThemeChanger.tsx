'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeButton from './ThemeButton';
import { useTheme } from 'next-themes';

interface Props {
   className?: string;
}

const ThemeChanger = ({ className }: Props) => {
   const { theme, systemTheme, setTheme } = useTheme();
   const [isMounted, setIsMounted] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      // Пока не примонтировался — возвращаем кнопку-заглушку,
      // чтобы SSR и клиент совпадали
      return (
         <div className={className}>
            <button
               className="cursor-pointer hover:text-blue-500 duration-200"
               type="button"
            >
               <Sun /> {/* или просто пустая иконка */}
            </button>
         </div>
      );
   }

   const currentTheme = theme === 'system' ? systemTheme : theme;

   return (
      <div className={className}>
         <div className="relative justify-self-start">
            <button
               className={`${
                  isOpen ? 'text-blue-500' : 'hover:text-blue-500'
               } cursor-pointer duration-200`}
               type="button"
               onClick={() => setIsOpen(!isOpen)}
            >
               {currentTheme === 'system' ? (
                  <SunMoon />
               ) : currentTheme === 'dark' ? (
                  <Moon />
               ) : (
                  <Sun />
               )}
            </button>
            <div
               className={`${
                  !isOpen ? 'hidden' : ''
               } bg-[var(--background)] text-[var(--foreground)] flex gap-2 rounded-md border border-neutral-400/40 shadow shadow-neutral-400/40 z-50 absolute top-12 left-1/2 -translate-x-1/2 p-2`}
            >
               <ThemeButton theme="system" onClick={() => setTheme('system')}>
                  <SunMoon />
                  <span>Система</span>
               </ThemeButton>
               <ThemeButton theme="light" onClick={() => setTheme('light')}>
                  <Sun />
                  <span>Светлая</span>
               </ThemeButton>
               <ThemeButton theme="dark" onClick={() => setTheme('dark')}>
                  <Moon />
                  <span>Темная</span>
               </ThemeButton>
            </div>
         </div>
      </div>
   );
};

export default ThemeChanger;
