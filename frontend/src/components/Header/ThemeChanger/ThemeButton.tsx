'use client';

import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

interface Props {
   theme: 'system' | 'dark' | 'light';
   onClick: () => void;
   children: ReactNode;
}

const ThemeButton = ({ onClick, theme, children }: Props) => {
   const { theme: selectedTheme } = useTheme();
   return (
      <button
         type="button"
         onClick={onClick}
         className={`${
            theme === selectedTheme
               ? 'text-blue-500 bg-neutral-400/15 border-blue-500'
               : 'border-neutral-400/40 hover:bg-neutral-400/10'
         } w-[83px] cursor-pointer px-2 py-4 flex flex-col items-center gap-2 border rounded-sm border-neutral-400/40  transition-colors`}
      >
         {children}
      </button>
   );
};

export default ThemeButton;
