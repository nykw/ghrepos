import { FC } from 'react';
import Head from 'next/head';

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

    <header className="h-20 bg-gray-100">
      <h1 className="font-bold font-mono text-4xl box-content object-center">{siteName}</h1>
    </header>
    <main>{children}</main>
    <footer className="h-20 bg-gray-100"></footer>
  </>
);

export default Template;
