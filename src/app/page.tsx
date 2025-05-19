'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">認証検証アプリへようこそ</h1>
        <p className="text-xl mb-8">NextJS, TypeScript, Supabase, NextAuthを使った認証アプリです</p>

        <div className="space-x-4">
          {status === 'authenticated' ? (
            <Link href="/dashboard">
              <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                ダッシュボードに移動
              </span>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  ログイン
                </span>
              </Link>
              <Link href="/signup">
                <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  アカウント作成
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}