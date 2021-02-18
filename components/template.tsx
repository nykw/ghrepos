import { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
};

const Template: FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/person.svg" />
    </Head>

    <header>
      <h1>{title}</h1>
    </header>
    <main>{children}</main>
    <footer></footer>
  </>
);

export default Template;
