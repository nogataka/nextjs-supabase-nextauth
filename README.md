# NextJS + Supabase + NextAuth 認証アプリケーション

## 関連プロジェクト

このプロジェクトは、NextAuth未使用版のリポジトリを参考にしています：
[nextjs-supabase-regacy-auth](https://github.com/nogataka/nextjs-supabase-regacy-auth)

## 概要

このプロジェクトは、Next.js、TypeScript、Supabase、NextAuthを組み合わせて構築された認証システムを実装したウェブアプリケーションです。ユーザー登録、ログイン、認証後のダッシュボードアクセスなどの機能を提供します。

## 主な機能

- ユーザー登録（サインアップ）
- ユーザーログイン
- 認証保護されたダッシュボード
- ユーザープロファイル管理
- 認証モード切替（Supabase / NextAuth）

## 使用技術

- **フロントエンド**:
  - Next.js 14.1.0（App Router）
  - React 18
  - TypeScript 5
  - Tailwind CSS 3.4.1

- **認証**:
  - NextAuth.js 4.24.5
  - Supabase Auth Helpers（@supabase/auth-helpers-nextjs 0.9.0）
  - Supabase JavaScript Client 2.39.3

## プロジェクト構成

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/  # NextAuth設定
│   ├── dashboard/              # ダッシュボード（要認証）
│   ├── login/                  # ログインページ
│   ├── profile/                # プロファイルページ（要認証）
│   ├── signup/                 # サインアップページ
│   ├── globals.css            # グローバルスタイル
│   ├── layout.tsx             # ルートレイアウト
│   ├── page.tsx               # トップページ
│   └── providers.tsx          # プロバイダーコンポーネント
├── components/
│   └── Navbar.tsx             # ナビゲーションバー
├── middleware.ts              # 認証ミドルウェア
└── types/                     # 型定義
```

## セットアップ方法

### 1. 環境変数の設定

プロジェクトルートに `.env.local.sample` ファイルを参考にして `.env.local` ファイルを作成します。以下の手順に従ってください：

1. `.env.local.sample` をコピーして `.env.local` を作成
```bash
cp .env.local.sample .env.local
```

2. `.env.local` ファイルを編集し、以下の値を適切に設定します：

```
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# アプリモード（'supabase' または 'nextauth'）
APP_MODE=supabase
```

**注意**: 
- `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` は Supabase プロジェクトダッシュボードから取得
- `NEXTAUTH_SECRET` は安全なランダムな文字列（例: `openssl rand -hex 32`）

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
```

### 3. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

アプリケーションは http://localhost:3000 で起動します。

## アプリケーションモード

このアプリケーションは2つの認証モードをサポートしています：

1. **Supabase モード**: Supabase Auth を使用して認証を行います
2. **NextAuth モード**: NextAuthを使用して認証を行います（Supabaseと連携）

モードは `.env.local` ファイルの `APP_MODE` 変数または HTTP ヘッダー `x-app-mode` で切り替えることができます。

## ミドルウェア

アプリケーションには認証ミドルウェアが実装されており、以下の機能を提供します：

- 保護されたルート（/dashboard, /profile）へのアクセス制限
- 認証済みユーザーのログイン/サインアップページへのアクセス制限（ダッシュボードにリダイレクト）
- 認証モードに応じた適切な認証チェック

## ライセンス

[MIT](LICENSE) 