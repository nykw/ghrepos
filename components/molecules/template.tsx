import { FC } from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

type Props = {
  pageName: string;
};

/** サイト名 */
export const siteName = 'GitHub Search';

const Template: FC<Props> = ({ pageName, children }) => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <title>{pageName}</title>
      <link rel="icon" href="/person.svg" />
    </Head>
    <Header siteName={siteName} />
    <main className="flex-grow">
      <div className="p-5">{children}</div>
    </main>
    <Footer />
  </div>
);

export default Template;
