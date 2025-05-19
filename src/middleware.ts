import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getToken } from 'next-auth/jwt'

// 認証が必要なルート
const PROTECTED_ROUTES = ['/dashboard', '/profile']
// 認証済みならリダイレクトすべきルート
const AUTH_ROUTES = ['/login', '/signup']

// アプリ種別（Supabase or NextAuth）を判定
const getAppMode = (req: NextRequest): 'supabase' | 'nextauth' => {
  const mode = req.headers.get('x-app-mode') || process.env.APP_MODE
  return mode === 'nextauth' ? 'nextauth' : 'supabase'
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname
  const appMode = getAppMode(req)

  let isAuthenticated = false

  // Supabase認証チェック
  if (appMode === 'supabase') {
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()
    isAuthenticated = !!session
  }

  // NextAuth認証チェック
  if (appMode === 'nextauth') {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    isAuthenticated = !!token
  }

  // 静的リソース・APIは除外
  const isPublicAsset =
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.match(/\.(jpg|jpeg|png|gif|svg|css|js)$/)
  const isApi = path.startsWith('/api')
  const shouldCheckAuth = !isPublicAsset && !isApi

  // 保護されたルート → 未認証ならログインへ
  if (shouldCheckAuth && PROTECTED_ROUTES.includes(path) && !isAuthenticated) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(redirectUrl)
  }

  // 認証済みでログイン・サインアップにアクセスした場合 → ダッシュボードにリダイレクト
  if (shouldCheckAuth && AUTH_ROUTES.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',            // トップページ（通過用）
    '/dashboard',
    '/profile',
    '/login',
    '/signup',
    '/((?!_next/static|_next/image|favicon.ico).*)', // 静的除外
  ],
}
