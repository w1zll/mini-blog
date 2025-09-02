import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Providers from './providers';

const robotoSans = Roboto({
   variable: '--font-roboto-sans',
   subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
   variable: '--font-roboto-mono',
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'Mini blog',
   description: 'Mini blog with posts',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="ru" suppressHydrationWarning>
         <body
            className={`${robotoSans.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col`}
         >
            <Providers>
               <Header />
               <div className="flex-1 container mx-auto">{children}</div>
               <Footer />
            </Providers>
         </body>
      </html>
   );
}
