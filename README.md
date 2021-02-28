# GitHub Search

## 概要

GitHub のユーザー情報を検索できます。

Next.js と Tailwind CSS、Firebase Authentication (以下、 Firebase Auth) に入門したので、その練習のために作成しました。

## 特徴

- **Firebase Auth を用いたログイン機能**

  GitHub OAuth を利用するには Firebase Auth 以外にも候補がありました。
  Firebase Auth の場合は秘密鍵の管理を Firebase コンソール上で管理できるため、こちらを採用することにしました。

  また、Next.js はルーティングごとに、サーバーから新しい HTML を取得します。
  そのためルーティングの前後でグローバル状態を共有するために、工夫する必要があります。
  今回はログイン状態を管理しながらインタラクティブな UI を実現するために、 Redux の store と Cookie を同期させるようにしました。

- **Tailwind CSS を用いたスタイリング**

  Next.js は React を用いたフレームワークなので、再利用可能なコンポーネントを作成します。
  そのため、スタイリングにもコンポーネント指向を利用できるものとして Tailwind CSS を採用しました。

- **GitHub API を用いたデータ取得**

  Next.js ではサーバーサイドでも fetch API が使えるので、ユーザー情報ページを SSR する際それを利用しました。

## デモ

- main

  [https://ghsearch.vercel.app/](https://ghsearch.vercel.app/)

- develop

  [https://ghsearch-git-develop-nykw.vercel.app](https://ghsearch-git-develop-nykw.vercel.app)

## 開発環境

- OS

  MacOS Big Sur 11.2.1

- Node.js

  v14.14.0

- npm パッケージの管理

  yarn
