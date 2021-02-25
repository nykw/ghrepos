import Link from 'next/link';
import Footer from '../components/molecules/footer';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Head>
        <title>GitHub Search</title>
      </Head>
      <header></header>
      <main>
        <Link href="/search">
          <button>検索</button>
        </Link>
        <button>サインイン</button>
      </main>
      <Footer></Footer>
    </>
  );
}
