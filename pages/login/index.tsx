import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import PublicHeader from "../../components/PublicHeader";
import RegisterBtn from "../../components/RegisterBtn";
import style from "../../styles/Login.module.css";
import { signIn } from "next-auth/react";
import CurrentUserContext from "../../contexts/currentUserContext";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const Login: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const { currentUserProfile } = useContext(CurrentUserContext);

  const router = useRouter();
  const errorOnSign = router.asPath.includes("login&error=CredentialsSignin");

  useEffect(() => {
    if (currentUserProfile) {
      setFirstname(currentUserProfile.firstname);
      setLastname(currentUserProfile.lastname);
    }
  }, [currentUserProfile]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    signIn("credentials", { username: mail, password: password });
    setMail("");
    setPassword("");
  };

  if (currentUserProfile) {
    return (
      <Layout pageTitle="Bienvenue">
        <PublicHeader title="Bienvenue" link="/" />
        <div className={style.welcomContainer}>
          {!currentUserProfile ? (
            ""
          ) : (
            <>
              <p className={style.connectedStatus}>
                vous etes connecté en tant que{" "}
              </p>
              <h2 className={style.welcomTitle}>
                {" "}
                {firstname} {lastname}
              </h2>
            </>
          )}
        </div>
        <p className={style.welcomtext}>
          Vous pouvez désormais profiter pleinement de l&apos;ensemble de
          l&apos;application.
        </p>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="S’identifier">
      <PublicHeader title="S’identifier" link="/" />

      <form
        onSubmit={handleSubmit}
        className={style.formLogin}
        data-cy="formLogin"
      >
        {errorOnSign ? (
          <p
            className={style.welcomtext}
            data-cy="errorMessage"
            style={{
              fontSize: "0.8em",
              marginBottom: "-5px",
              marginTop: "-10px",
              color: "#9c1309",
              fontWeight: "bold",
            }}
          >
            Échec de connexion - Vos identifiants sont invalides - Merci de
            réessayer{" "}
          </p>
        ) : (
          " "
        )}
        <label htmlFor="email" className={style.labelForm}>
          votre email :
        </label>
        <input
          type="email"
          id="email"
          data-cy="email"
          className={style.inputForm}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <label htmlFor="password" className={style.labelForm}>
          mot de passe :
        </label>
        <input
          type="password"
          id="password"
          data-cy="password"
          className={style.inputForm}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className={style.btnForm}>Valider</button>
      </form>

      <RegisterBtn content="S’inscrire" link="/registration" />
    </Layout>
  );
};

const getCsrfTokenAndSetCookies: GetServerSideProps = async ({
  res,
  query,
}) => {
  // to make it work on Vercel
  let baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  // capturing the callback url if any, which should include the current domain for security ?
  const callbackUrlIsPresent = typeof query?.callbackUrl === "string";
  const callbackUrlIsValid =
    callbackUrlIsPresent && (query?.callbackUrl as string).startsWith(baseUrl);
  const host = (callbackUrlIsValid ? query?.callbackUrl : baseUrl) as string;
  const redirectURL = encodeURIComponent(host);
  // getting both the csrf form token and (next-auth.csrf-token cookie + next-auth.callback-url cookie)
  const csrfUrl = `${baseUrl}/api/auth/csrf?callbackUrl=${redirectURL}`;
  const csrfResponse = await fetch(csrfUrl);
  const { csrfToken } = await csrfResponse.json();
  const { headers } = csrfResponse;
  // placing the cookies
  const [csrfCookie, redirectCookie] =
    headers?.get("set-cookie")?.split(",") || [];
  res.setHeader("set-cookie", [csrfCookie, redirectCookie]);
  // placing form csrf token
  return csrfToken;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfTokenAndSetCookies(context),
    },
  };
};

export default Login;
