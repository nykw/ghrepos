import {FC} from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  pageName: string;
};

/** サイト名 */
export const siteName = "GitHub Search";

const Template: FC<Props> = ({pageName, children}) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Head>
      <title>{pageName}</title>
      <link rel="icon" href="/person.svg" />
    </Head>
    <Header siteName={siteName} />
    <main className="flex-grow flex flex-col">{children}</main>
    <Footer />
  </div>
);

export default Template;
