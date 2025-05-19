import type { Metadata } from 'next';
import './globals.css';
import { NextAuthProvider } from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: '認証検証アプリ',
  description: 'NextJS, TypeScript, Supabase, NextAuthを使った認証アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <NextAuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}