# GitHub Search

## 概要

GitHub のユーザー情報を検索できます。

Next.js と Tailwind CSS、Firebase Authentication (以下、 Firebase Auth) に入門したので、その練習のために作成しました。

## 特徴

- **Firebase Auth を用いたログイン機能**

  GitHub OAuth を利用するには Firebase Auth 以外にも候補がありました。
  Firebase Auth の場合は秘密鍵の管理を Firebase コンソール上で行えるため、認証・認可に対する私の理解の甘さもあり、こちらを採用することにしました。

  ~~また、Next.js はルーティングごとに、サーバーから新しい HTML を取得します。~~

  (追記：`<Link>` を用いたルーティングではページ形成に必要なpropsがjson形式でサーバーから送られて来るだけなのでこの表現は誤りです。)

  そのためルーティングの前後でグローバル状態を共有するために、工夫する必要があります。
  今回はログイン状態を管理しながらインタラクティブな UI を実現するために、 Redux の store と Cookie を同期させるようにしました。

- **Tailwind CSS を用いたスタイリング**

  Next.js は React を用いたフレームワークなので、再利用可能なコンポーネントを作成します。
  そのため、スタイリングにもコンポーネント指向を利用できるものとして Tailwind CSS を採用しました。

- **GitHub API を用いたデータ取得**

  Next.js ではサーバーサイドでも fetch API が使えるので、ユーザー情報ページを SSR する際それを利用しました。

## 実装予定または検討中のこと

- **ユーザーごとに管理されたユーザー情報検索履歴**

  Firebase は Firestore という NoSQL 型データベースを提供しています。
  また Firebase Auth ではユーザーをごとにセキュリティルールを設定し、Firestore 上で利用できる機能を制限するといった機能があります。
  これらを用いて、サインイン中のユーザーが自分が過去に検索したユーザー情報の履歴を確認できるようにしようと思っています。
  なお、この情報はアカウント削除時にデータベースから削除するようにする予定です。

- **SSG を使いたい (検討中)**

  Next.js は静的サイトジェネレータなので、ビルド時に生成できるページはプリレンダリングしてしまった方がパフォーマンス的に良いです。
  現在実装されているページも CSR か SSG のどちらがよいかをよく検討できていない部分も多いので、検索履歴機能を実装後にリファクタリングをおこなう予定です。

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
