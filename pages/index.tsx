import Template from '../components/molecules/template';
import Link from 'next/link';

export default function Index() {
  return (
    <Template pageName="GitHub Search">
      <Link href="/search">
        <button>検索</button>
      </Link>
    </Template>
  );
}
