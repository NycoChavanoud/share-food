import type { NextPage } from "next";
import Layout from "../components/Layout";
import PublicHeader from "../components/PublicHeader";
import PublicMain from "../components/PublicMain";
import RegisterBtn from "../components/RegisterBtn";

const Home: NextPage = (props) => {
  return (
    <>
      <Layout pageTitle="Accueil">
        <PublicHeader title="Cook of the day" link="/" />
        <PublicMain />
        <RegisterBtn content="Se connecter " link="/login" />
      </Layout>
    </>
  );
};

export default Home;
