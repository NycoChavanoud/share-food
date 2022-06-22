import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/currentUserContext";
import Navbar from "./Navbar";
import Script from "next/script";

type layoutProps = {
  pageTitle: string;
  children: React.ReactNode;
};

const LayoutCurrentUser = ({ pageTitle, children }: layoutProps) => {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session?.user?.email) {
      router.push("/login");
    }
  }, [status, session, router]);

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
      <Script>{`UPLOADCARE_PUBLIC_KEY = '${process.env.NEXT_PUBLIC_UPLOADCARE_KEY}'`}</Script>

      <main>{children}</main>
      {!currentUserProfile ? "" : <Navbar />}
    </>
  );
};

export default LayoutCurrentUser;
