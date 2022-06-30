import Head from "next/head";
import { useContext } from "react";
import CurrentUserContext from "../contexts/currentUserContext";
import Navbar from "./Navbar";

type layoutProps = { pageTitle: string; children: React.ReactNode };

const Layout = ({ pageTitle, children }: layoutProps) => {
  const { currentUserProfile } = useContext(CurrentUserContext);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          key="viewport"
        />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>

      <main>{children}</main>
      {!currentUserProfile ? "" : <Navbar />}
    </>
  );
};

export default Layout;
