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
  <>
    <Head>
      <title>{pageName}</title>
      <link rel="icon" href="/person.svg" />
    </Head>
    <Header siteName={siteName} />
    <main>{children}</main>
    <Footer />
  </>
);

export default Template;
