'use client';
import { ReactNode } from 'react';

interface Props {
   children: ReactNode;
   className?: string;
   type?: 'button' | 'submit' | 'reset';
   varriant?: 'primary' | 'secondary';
   disabled?: boolean;
   onClick?: () => void;
}

const Button = ({
   children,
   className = '',
   type = 'button',
   varriant = 'primary',
   disabled = false,
   onClick = () => {},
}: Props) => {
   const handleClick = () => {
      if (disabled) return;
      onClick();
   };

   const varraiantClasses =
      varriant === 'primary'
         ? 'bg-blue-500 text-white hover:bg-blue-600'
         : 'border border-black bg-white text-black hover:bg-neutral-300/40 dark:border-white dark:bg-background-dark dark:text-white dark:hover:bg-neutral-500/40';

   const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

   return (
      <button
         onClick={handleClick}
         className={`${className} ${varraiantClasses} ${disabledClasses}
            hover:cursor-pointer transition-colors duration-200 py-2 px-4 rounded-md`}
         type={type}
      >
         {children}
      </button>
   );
};

export default Button;
