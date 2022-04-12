import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/currentUserContext";

import Navbar from "./navbar";

type layoutProps = { pageTitle: string; children: React.ReactNode };

const Layout = ({ pageTitle, children }: layoutProps) => {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const { data: session, status } = useSession();

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
      {!currentUserProfile ? "" : <Navbar />}
    </>
  );
};

export default Layout;
