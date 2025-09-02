'use client';

import { LockKeyhole, Mail, ShieldCheck, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../UI/Button';
import Link from 'next/link';

interface Props {
   onClose: () => void;
}

interface FormValues {
   email: string;
   password: string;
   remember: boolean;
   confirmPassword?: string;
}

const AuthModal = ({ onClose }: Props) => {
   const [isMounted, setIsMounted] = useState(false);
   const [mode, setMode] = useState<'login' | 'register'>('login');

   const { register, handleSubmit, formState, watch } = useForm<FormValues>();
   const onSubmit = ({ email, password, remember }: FormValues) => {
      const body = {
         email,
         password,
         remember,
      };

      console.log(body);
   };

   useEffect(() => {
      setIsMounted(true);
      const handleEscape = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            onClose();
         }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
   }, [onClose]);

   if (!isMounted) return null;

   return createPortal(
      <div
         onClick={(e) => {
            e.stopPropagation();
            onClose();
         }}
         className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50"
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className="bg-background-light dark:bg-background-dark w-[500px] max-w-[90%] rounded-lg p-6 flex flex-col gap-4"
         >
            <div className="flex justify-between">
               <span className="text-2xl">Авторизация</span>
               <button
                  onClick={onClose}
                  className="hover:cursor-pointer hover:text-blue-500 transition-colors duration-200"
               >
                  <SquareX size={32} />
               </button>
            </div>

            <div className="flex bg-neutral-300 dark:bg-neutral-950 w-full rounded-lg p-0.5 relative">
               <div
                  className={`w-[calc(50%-4px)] absolute left-0.5 top-0.5 bottom-0.5 bg-background-light dark:bg-neutral-700 rounded-md transition-transform duration-200 ${
                     mode === 'login'
                        ? 'translate-x-0'
                        : 'translate-x-[calc(100%+4px)]'
                  }`}
               ></div>
               <button
                  className="z-2 flex-1 hover:cursor-pointer py-2 px-4 rounded-md transition-colors duration-200 text-foreground-light dark:text-foreground-dark"
                  onClick={() => setMode('login')}
               >
                  Вход
               </button>
               <button
                  className="z-2 flex-1 hover:cursor-pointer py-2 px-4 rounded-md transition-colors duration-200 text-foreground-light dark:text-foreground-dark"
                  onClick={() => setMode('register')}
               >
                  Регистрация
               </button>
            </div>

            <form
               className="flex flex-col gap-4"
               onSubmit={handleSubmit(onSubmit)}
            >
               {/* Email */}
               <div>
                  <label
                     htmlFor="email"
                     className="relative text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-300"
                  >
                     <input
                        {...register('email', { required: 'Email обязателен' })}
                        type="email"
                        id="email"
                        placeholder="Email"
                        className={`w-full rounded-lg relative p-2 pl-10 border-2 border-neutral-300 hover:border-neutral-500 focus:border-neutral-500
                           text-foreground-light placeholder:text-neutral-400 transition-colors duration-200 outline-0 peer
                           dark:border-neutral-500 dark:hover:border-neutral-300 dark:focus:border-neutral-300 dark:text-foreground-dark
                           ${
                              formState.errors.email
                                 ? 'outline-2 outline-red-500/50'
                                 : ''
                           }
                        `}
                     />
                     <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none
                        peer-focus:text-neutral-500 dark:peer-focus:text-neutral-300"
                     >
                        <Mail size={20} />
                     </span>
                  </label>

                  <AnimatePresence>
                     {formState.errors.email && (
                        <motion.span
                           key="email-error"
                           initial={{ opacity: 0, y: -5 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -5 }}
                           transition={{ duration: 0.3 }}
                           className="text-red-500/80 text-sm inline-block"
                        >
                           {formState.errors.email.message}
                        </motion.span>
                     )}
                  </AnimatePresence>
               </div>
               {/* Password */}
               <div>
                  <label
                     htmlFor="password"
                     className="relative text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-300"
                  >
                     <input
                        {...register('password', {
                           required: 'Пароль обязателен',
                           minLength: {
                              value: 6,
                              message:
                                 'Пароль должен содержать не менее 6 символов',
                           },
                        })}
                        type="password"
                        id="password"
                        placeholder="Пароль"
                        className={`w-full rounded-lg relative p-2 pl-10 border-2 border-neutral-300 hover:border-neutral-500 focus:border-neutral-500
                           text-foreground-light placeholder:text-neutral-400 transition-colors duration-200 outline-0 peer
                           dark:border-neutral-500 dark:hover:border-neutral-300 dark:focus:border-neutral-300 dark:text-foreground-dark
                           ${
                              formState.errors.email
                                 ? 'outline-2 outline-red-500/50'
                                 : ''
                           }
                        `}
                     />
                     <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none
                        peer-focus:text-neutral-500 dark:peer-focus:text-neutral-300"
                     >
                        <LockKeyhole size={20} />
                     </span>
                  </label>

                  {/* Анимация ошибок для password */}
                  <AnimatePresence>
                     {formState.errors.password && (
                        <motion.span
                           key="password-error"
                           initial={{ opacity: 0, y: -5 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -5 }}
                           transition={{ duration: 0.3 }}
                           className="text-red-500/80 text-sm min-h-[1.25rem]"
                        >
                           {formState.errors.password.message}
                        </motion.span>
                     )}
                  </AnimatePresence>
               </div>
               {/* Confirm password */}
               {mode === 'register' && (
                  <div>
                     <label
                        htmlFor="confirmPassword"
                        className="relative text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-300"
                     >
                        <input
                           {...register('confirmPassword', {
                              required: 'Повторите пароль',
                              validate: (value) => {
                                 return (
                                    value === watch('password') ||
                                    'Пароли не совпадают'
                                 );
                              },
                           })}
                           type="password"
                           id="confirmPassword"
                           placeholder="Повторите пароль"
                           className={`w-full rounded-lg relative p-2 pl-10 border-2 border-neutral-300 hover:border-neutral-500 focus:border-neutral-500
                           text-foreground-light placeholder:text-neutral-400 transition-colors duration-200 outline-0 peer
                           dark:border-neutral-500 dark:hover:border-neutral-300 dark:focus:border-neutral-300 dark:text-foreground-dark
                           ${
                              formState.errors.email
                                 ? 'outline-2 outline-red-500/50'
                                 : ''
                           }
                        `}
                        />
                        <span
                           className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none
                        peer-focus:text-neutral-500 dark:peer-focus:text-neutral-300"
                        >
                           <ShieldCheck size={20} />
                        </span>
                     </label>

                     {/* Анимация ошибок для confirmPassword */}
                     <AnimatePresence>
                        {formState.errors.confirmPassword && (
                           <motion.span
                              key="confirmPassword-error"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.3 }}
                              className="text-red-500/80 text-sm min-h-[1.25rem]"
                           >
                              {formState.errors.confirmPassword.message}
                           </motion.span>
                        )}
                     </AnimatePresence>
                  </div>
               )}
               {/* Remember me */}
               <div className="flex justify-between gap-2">
                  <label htmlFor="remember" className="cursor-pointer">
                     <input
                        {...register('remember')}
                        type="checkbox"
                        id="remember"
                        className="hidden peer"
                     />
                     <span
                        className="before:content-[''] before:w-6 before:h-6 before:rounded-md before:border-2 before:text-center peer-checked:before:content-['✓']
                           flex items-center gap-2 text-neutral-400 hover:text-neutral-500 peer-checked:text-black peer-checked:hover:text-black
                           dark:text-neutral-500 dark:hover:text-neutral-300 dark:peer-checked:text-white dark:peer-checked:hover:text-white"
                     >
                        Запомнить меня
                     </span>
                  </label>
                  {mode === 'login' && (
                     <Link
                        href="/forgot-password"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => onClose()}
                     >
                        Забыли пароль?
                     </Link>
                  )}
               </div>

               <Button type="submit" className="mt-4">
                  {mode === 'login' ? 'Войти' : 'Регистрация'}
               </Button>
            </form>
         </div>
      </div>,
      document.body
   );
};

export default AuthModal;
