import Head from "next/head";
import type { NextComponentType } from "next";

type layoutProps = { pageTitle: string; children: NextComponentType };

const Layout = ({ pageTitle, children }: layoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
